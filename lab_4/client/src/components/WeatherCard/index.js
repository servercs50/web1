import React from 'react';

import {Grid, Paper, Fab, Hidden} from "@material-ui/core";
import Typography from '@material-ui/core/Typography/index';
import CloseIcon from '@material-ui/icons/Close';

import LoadingSpinner from '../LoadingSpinner';

import './style.sass';


export default function WeatherCard(props) {
  const data = props.cityWeatherData;;

  if (data && data.isLoading) {
    return (<LoadingSpinner/>);
  }

  if (data && data.cod && data.cod != 200) {
    if ('onFetchError' in props) props.onFetchError()
    return (
      <div>
        <p>К сожалению, не получилось получить данные о погоде...</p>
        <p>{data.message}</p>
      </div>
    )
  }

  if (data && data.cod == 200) {
    const K = 273.15; // для перевода Кельвин в Цельсия
    const temperatureCelsius = Math.round(data.main.temp - K);

    return (
      <Grid container direction={props.isFavorite ? "column" : "row"} spacing={4}
            className={`WeatherCard ${props.isFavorite ? "isFavorite" : ""}`}>

        <Grid container item xs={12} md={props.isFavorite ? 12 : 6}
              direction={props.isFavorite ? "row" : "column"} alignItems={"center"} className={"weather-main"}>
          <Grid container item sm={props.isFavorite ? 4 : false} justify={"space-between"}>
            <Typography variant="h5" component="h2">
              <b>{data.name}</b>
            </Typography>
            <Hidden smUp>
              {props.isFavorite &&
              <Fab color="primary" size={"small"}
                   onClick={props.onRemoveCityClick.bind(this, props.cityWeatherData.name)}>
                <CloseIcon/>
              </Fab>
              }
            </Hidden>
          </Grid>
          <Grid item container sm={props.isFavorite ? 7 : false} alignItems={"center"}
                justify={"space-evenly"} className={"weather-temperature"}>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt=""/>
            <Typography variant={props.isFavorite ? "h3" : "h1"} component="h2">
              {temperatureCelsius}°C
            </Typography>
          </Grid>
          <Hidden only="xs">
            <Grid container item sm={1} justify={"flex-end"}>
              {props.isFavorite &&
              <Fab color="primary" size={"small"}
                   onClick={props.onRemoveCityClick.bind(this, props.cityWeatherData.cityName)}>
                <CloseIcon/>
              </Fab>
              }
            </Grid>
          </Hidden>
        </Grid>

        <Grid item xs={12} md={props.isFavorite ? 12 : 6} className={"weather-items"}>
          <Paper elevation={1} className={"weather-item"}>
            <span><b>Ветер</b></span>
            <span>{data.wind.speed} м/с</span>
          </Paper>

          <Paper elevation={1} className={"weather-item"}>
            <span><b>Облачность</b></span>
            <span>{data.weather[0].description}</span>
          </Paper>

          <Paper elevation={1} className={"weather-item"}>
            <span><b>Давление</b></span>
            <span>{data.main.pressure} hpa</span>
          </Paper>

          <Paper elevation={1} className={"weather-item"}>
            <span><b>Влажность</b></span>
            <span>{data.main.humidity} %</span>
          </Paper>

          <Paper elevation={1} className={"weather-item"}>
            <span><b>Координаты</b></span>
            <span>[{data.coord.lon}, {data.coord.lat}]</span>
          </Paper>
        </Grid>
      </Grid>
    )
  }

  return null;
}
