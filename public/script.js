document.addEventListener("DOMContentLoaded", function() {
    // Procesar los datos para la gráfica
    const labels = parsedData.map(row => row.track_name); // Puedes cambiar esto a otra columna si lo deseas
    const popularity = parsedData.map(row => parseInt(row.streams));

    // Crear la gráfica usando Chart.js
    var ctx = document.getElementById('popularityChart').getContext('2d');
    var popularityChart = new Chart(ctx, {
        type: 'bar', // Puedes cambiar a 'line', 'pie', etc.
        data: {
            labels: labels,
            datasets: [{
                label: 'Streams',
                data: popularity,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Manejar el evento de clic en el botón para mostrar/ocultar la tabla
    document.getElementById('toggleTable').addEventListener('click', function() {
        var tableContainer = document.getElementById('tableContainer');
        if (tableContainer.style.display === 'none' || tableContainer.style.display === '') {
            tableContainer.style.display = 'block';
        } else {
            tableContainer.style.display = 'none';
        }
    });
});
