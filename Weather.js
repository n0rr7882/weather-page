import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import WEATHER_SET from './weather-set';

export default function Weather({ data }) {
  const selected = WEATHER_SET[Math.floor(data.weather[0].id / 100).toString()];
  return (
    <LinearGradient colors={selected.background} style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.upper}>
        <MaterialCommunityIcons color="white" size={108} name={selected.icon} />
        <Text style={styles.temperature}>{Math.round((data.main.temp - 273.15) * 10) / 10}°C</Text>
        <Text style={styles.city}>{data.name}</Text>
      </View>
      <View style={styles.lower}>
        <Text style={styles.title}>{data.weather[0].main}</Text>
        <Text style={styles.subtitle}>{data.weather[0].description}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperature: {
    color: 'white',
    fontSize: 40,
  },
  city: {
    color: 'white',
    fontSize: 20,
  },
  lower: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
  },
});
