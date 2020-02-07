import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import WeatherCard from '../src/components/WeatherCard';

const cityWeatherData = {
  "coord": {"lon": 37.62, "lat": 55.75},
  "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
  "base": "stations",
  "main": {"temp": 283.57, "pressure": 995, "humidity": 87, "temp_min": 282.59, "temp_max": 285.15},
  "visibility": 10000,
  "wind": {"speed": 9, "deg": 230},
  "clouds": {"all": 75},
  "dt": 1572987525,
  "sys": {"type": 1, "id": 9027, "country": "RU", "sunrise": 1573015504, "sunset": 1573047671},
  "timezone": 10800,
  "id": 524901,
  "name": "Moscow",
  "cod": 200
}


describe('Weather Card', () => {

  it('renders correctly when data is loading', () => {
    const cityWeatherLoading = {
      name: 'Moscow',
      isLoading: true
    }

    const tree = shallow(
      <WeatherCard
        cityWeatherData={cityWeatherLoading}
        isFavorite
      />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly when favorite city weather data passed with cod 200', () => {
    const onClick = jest.fn()

    const tree = shallow(
      <WeatherCard
        cityWeatherData={cityWeatherData}
        isFavorite
        onRemoveCityClick={onClick}
      />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly when NON favorite city weather data passed with cod 200', () => {
    const tree = shallow(
      <WeatherCard
        cityWeatherData={cityWeatherData}
        isFavorite={false}
      />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly when  city weather data passed with cod that not equal to 200', () => {
    const badCityWeatherData = {
      name: "Moscow",
      cod: 404
    };

    const tree = shallow(
      <WeatherCard
        cityWeatherData={badCityWeatherData}
        isFavorite
      />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('calls onFetchError when cod is not equal to 200', () => {
    const badData = {
      name: "Moscow",
      cod: 404
    }
    const onFetchError = jest.fn()

    const tree = shallow(
      <WeatherCard
        cityWeatherData={badData}
        isFavorite
        onFetchError={onFetchError}
      />);

    expect(shallowToJson(tree)).toMatchSnapshot();
    expect(onFetchError).toHaveBeenCalled()
  });


  it('returns null when no data passed', () => {
    const badData = {
      name: "Moscow"
    }
    const tree = shallow(
      <WeatherCard
        cityWeatherData={badData}
        isFavorite
      />);
    expect(shallowToJson(tree)).toEqual("");
  });

})
