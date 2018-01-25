import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { LinearGradient } from 'expo';
import Weather from './Weather';

const API_KEY = 'f0fb0aff11fb2355e58d1fee7cd57c43';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
    };
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
  }

  componentDidMount() {
    this.getWeatherInfo();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.weatherData ? (
          <Weather data={this.state.weatherData} />
        ) : (
            <LinearGradient colors={['#F7BB97', '#DD5E89']} style={styles.container}>
              <StatusBar hidden={true} />
              <View style={styles.upper}>
                <Text style={styles.temperature}>Weather page</Text>
              </View>
              <View style={styles.lower}>
                <Text style={styles.title}>Please wait...</Text>
                <Text style={styles.subtitle}>날씨 정보를 가져오는 중입니다.</Text>
              </View>
            </LinearGradient>
          )}
        <Button onPress={this.getWeatherInfo} title="Reload" />
      </View>
    );
  }

  getWeatherInfo() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ weatherData: data });
        })
        .catch(err => {
          console.error(err);
        })
    });
  }
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
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 100,
    color: 'white',
  },
});
