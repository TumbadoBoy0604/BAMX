if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mysql = require('mysql')

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    async (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]); // returns the first row found or undefined if no user is found
                }
            });
        });
    },
    async (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]); // returns the first row found or undefined if no user is found
                }
            });
        });
    }
);


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//////////////////////////////////////////////////////
// CREACION DE BASE DE DATOS /////////////////////////
//////////////////////////////////////////////////////
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port:3300
})

const dashboard = mysql.createConnection({ 
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'SpotifySongs',
  port:3300
})

db.connect((error)=>{
  if(error){
    console.log(error)
  }else{
    console.log("Conectado a Mysql..")
  }
})
/////////////////////////////////////////////////////


// DEFINIMOS LAS RUTAS (./Routes/pages.js)///////////
app.use('/', require('./routes/pages'))
app.use('/register', require('./routes/pages'))
app.use('/login', require('./routes/pages'))


app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))
app.get('/data', (req, res) => {
    const query = 'SELECT released_month FROM popular_spotify_songs_2'; // Asegúrate de que este sea el nombre correcto de tu tabla
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        const data = results.map(row => row.released_month);
        res.json(data);
    });
});


app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
        // Insertar el nuevo usuario en la base de datos
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [newUser.name, newUser.email, newUser.password],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.redirect('/register');
                } else {
                    res.redirect('/login');
                }
            });
    } catch {
        res.redirect('/register');
    }
});

app.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
app.get('/api/dashboard', checkAuthenticated, (req, res) => {
    const queryTop10 = 'SELECT * FROM popular_spotify_songs_2 ORDER BY streams DESC LIMIT 10';
    const queryBottom10 = 'SELECT * FROM popular_spotify_songs_2 ORDER BY streams ASC LIMIT 10';

    dashboard.query(queryTop10, (err, topResults) => {
        if (err) throw err;
        dashboard.query(queryBottom10, (err, bottomResults) => {
            if (err) throw err;

            // Combina los resultados
            const combinedResults = topResults.concat(bottomResults);
            res.json(combinedResults); // Devuelve los resultados como JSON
        });
    });
});

app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

app.listen(3000)

app.use(express.static('public'))
app.use(express.static('./'))


