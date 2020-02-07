import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {FavoriteCities} from '../src/components/FavoriteCitiesContainer';

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


describe('Favorite Cities Container', () => {

  it('looks for cities in localstorage', () => {

    const fetchCityProp = jest.fn()
    fetchCityProp.mockReturnValueOnce(cityWeatherData)
    const removeCityProp = jest.fn()

    const tree = shallow(
      <FavoriteCities
        cities={[{name: 'Moscow'}, {name: 'London'}]}
        fetchCity={fetchCityProp}
        removeCity={removeCityProp}
      />
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
    expect(fetchCityProp).toHaveBeenCalledTimes(2)
    expect(fetchCityProp).toHaveBeenCalledWith('Moscow', true)
    expect(fetchCityProp).toHaveBeenCalledWith('London', true)
  });

})
