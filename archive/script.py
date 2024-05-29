import pandas as pd
import json

# Cargar la base de datos
file_path = '~/UNIVERSIDAD/Ing_De_Software/BAMX/archive/Popular_Spotify_Songs.csv'
spotify_data = pd.read_csv(file_path)

# Top 10 canciones con más streams
# Convertir la columna 'streams' a numérica, ignorando errores
spotify_data['streams'] = pd.to_numeric(spotify_data['streams'], errors='coerce')

# Eliminar filas con valores NaN en 'streams' resultantes de la conversión
spotify_data = spotify_data.dropna(subset=['streams'])

# Asegurarse de que 'streams' es de tipo float
spotify_data['streams'] = spotify_data['streams'].astype(float)

# Obtener las 10 canciones con más streams
top_10_mas_streams = spotify_data.nlargest(10, 'streams')[['track_name', 'artist(s)_name', 'streams']]

# Mostrar el resultado
print(top_10_mas_streams)
