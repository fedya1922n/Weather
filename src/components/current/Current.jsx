import React, { useState, useEffect } from 'react';
import s from './current.module.scss';
import { icons, images } from '../../assets/image';
import { useSelector } from 'react-redux';
import getWind from '../../utils/getWind';
import getTime from '../../utils/getTime';

const Current = ({ selectedDay }) => {
  const weather = useSelector((state) => state.weather.weather);
  const errorFromRedux = useSelector((state) => state.weather.error);
  const current = weather?.current;
  const name = current?.name;
  const sys = current?.sys;

  const timezoneOffset = current?.timezone || 0; 

  const [currentTime, setCurrentTime] = useState(() => {
    if (!current) return new Date();
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;
    return new Date(utcTime + timezoneOffset * 1000);
  });

  useEffect(() => {
    if (!current) return;
    const timeInterval = setInterval(() => {
      const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;
      setCurrentTime(new Date(utcTime + timezoneOffset * 1000));
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [current, timezoneOffset]);

  if (errorFromRedux) {
    return <div className={s.error}>Ошибка загрузки погоды: {errorFromRedux}</div>;
  }

  if (!current || !name || !sys) {
    return <div className={s.loading}>Загрузка...</div>;
  }

  const sunrise = sys.sunrise ? new Date(sys.sunrise * 1000) : new Date(currentTime.setHours(6, 0, 0));
  const sunset = sys.sunset ? new Date(sys.sunset * 1000) : new Date(currentTime.setHours(18, 0, 0));
  const isNight = currentTime < sunrise || currentTime > sunset;
  let iconCode = current.weather[0].icon;
  if (isNight && iconCode.endsWith('d')) {
    iconCode = iconCode.replace('d', 'n');
  } else if (!isNight && iconCode.endsWith('n')) {
    iconCode = iconCode.replace('n', 'd');
  }
  const iconImg = icons[iconCode] || (isNight ? icons['01n'] : icons['01d']);

  const weatherDescription = () => {
    const hours = currentTime.getHours();
    if (hours >= 18) {
      return 'Отличный вечер для прогулки';
    }
    if (current.weather[0].main === 'Clear') {
      return 'Отличная погода для прогулки';
    }
    if (current.weather[0].main === 'Rain') {
      return 'Не забудьте зонт';
    }
    if (current.weather[0].main === 'Clouds') {
      return 'Погода облачная, но без дождя';
    }
    return 'Погода непредсказуема, будьте готовы ко всему';
  };

  return (
    <div className={s.current}>
      <div className={s.current__info}>
        <p className={s.current__country}>{sys.country}</p>
        <p className={s.current__city}>{name}</p>
        <p className={s.current__deg}>{Math.round(current.main.temp)}°</p>
        <p className={s.current__day}>Сегодня</p>
        <p className={s.current__time}>
          Время: {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
        <img src={iconImg} alt="" className={s.current__img} />
        <p className={s.current__description}>{weatherDescription()}</p>
      </div>
      <div className={s.current__content}>
        <div className={s.current__card}>
          <div className={s.current__icon}>
            <img src={images.temp} alt="" />
          </div>
          <p className={s.current__name}>Температура</p>
          <p className={s.current__desc}>
            {Math.round(current.main.temp)}° - ощущается как {Math.round(current.main.feels_like)}°
          </p>
        </div>
        <div className={s.current__card}>
          <div className={s.current__icon}>
            <img src={images.pressure} alt="" />
          </div>
          <p className={s.current__name}>Давление</p>
          <p className={s.current__desc}>{current.main.pressure} мм ртутного столба</p>
        </div>
        <div className={s.current__card}>
          <div className={s.current__icon}>
            <img src={images.precipitation} alt="" />
          </div>
          <p className={s.current__name}>Осадки</p>
          <p className={s.current__desc}>
            {current.rain
              ? 'Возможен дождь'
              : current.snow
              ? 'Возможен снег'
              : 'Без осадков'}
          </p>
        </div>
        <div className={s.current__card}>
          <div className={s.current__icon}>
            <img src={images.wind} alt="" />
          </div>
          <p className={s.current__name}>Ветер</p>
          <p className={s.current__desc}>
            {current.wind.speed} м/с {getWind(current.wind.deg)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Current;