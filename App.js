import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import api from './src/services/api';

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await api.get();
      const moviesWithimdbRating = response.data.map((movie) => ({
        ...movie,
        imdbRating: parseFloat(movie.imdbRating === 'N/A' ? 0 : movie.imdbRating), // Transforma 'N/A' em 0
      }));
      setMovies(moviesWithimdbRating);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Netflix</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {movies.map((movie) => (
          <View key={movie.imdbID} style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: String(movie.Poster).replace('http://', 'https://') }}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text style={styles.title}>{movie.Title}</Text>
              <Text style={styles.year}>Ano: {movie.Year}</Text>
              <Text style={styles.genre}>{movie.Genre}</Text>
              <Text style={styles.director}>Dirigido por: {movie.Director}</Text>
              <Text style={styles.actors}>Elenco: {movie.Actors}</Text>
              <Text style={styles.plot}>{movie.Plot}</Text>
              <Text style={styles.language}>Idioma: {movie.Language}</Text>
              <Text style={[styles.imdbRating, { backgroundColor: movie.imdbRating >= 8 ? 'green' : 'red' }]}>
                Nota: {movie.imdbRating}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E50914', // Vermelho do logo da Netflix
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  year: {
    color: '#999',
    fontSize: 14,
    marginBottom: 3,
  },
  genre: {
    color: '#999',
    fontSize: 14,
    marginBottom: 3,
  },
  director: {
    color: '#999',
    fontSize: 14,
    marginBottom: 3,
  },
  actors: {
    color: '#999',
    fontSize: 14,
    marginBottom: 3,
  },
  plot: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 3,
  },
  language: {
    color: '#999',
    fontSize: 14,
    marginBottom: 3,
  },
  imdbRating: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
