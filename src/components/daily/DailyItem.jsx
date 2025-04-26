import React from 'react';
import { icons } from '../../assets/image';
import s from './daily.module.scss';
import getTime from '../../utils/getTime';
import { useSelector } from 'react-redux';

const DailyItem = ({ day, index }) => {
  const weather = useSelector((state) => state.weather.weather);
  const timezone = weather?.current?.timezone || 18000;

  const translateWeatherDescription = (description) => {
    const translations = {
      'clear sky': 'Ясное небо',
      'few clouds': 'Малооблачно',
      'scattered clouds': 'Рассеянные облака',
      'broken clouds': 'Облачно с прояснениями',
      'overcast clouds': 'Пасмурно',
      'light rain': 'Небольшой дождь',
      'moderate rain': 'Умеренный дождь',
      'heavy intensity rain': 'Сильный дождь',
      'very heavy rain': 'Очень сильный дождь',
      'extreme rain': 'Экстремальный дождь',
      'freezing rain': 'Ледяной дождь',
      'light intensity shower rain': 'Небольшой ливень',
      'shower rain': 'Ливень',
      'heavy intensity shower rain': 'Сильный ливень',
      'ragged shower rain': 'Неровный ливень',
      'light snow': 'Небольшой снег',
      'snow': 'Снег',
      'heavy snow': 'Сильный снег',
      'sleet': 'Мокрый снег',
      'light shower sleet': 'Небольшой мокрый снег',
      'shower sleet': 'Мокрый снег с ливнем',
      'light rain and snow': 'Небольшой дождь со снегом',
      'rain and snow': 'Дождь со снегом',
      'light shower snow': 'Небольшой снег с ливнем',
      'shower snow': 'Снег с ливнем',
      'heavy shower snow': 'Сильный снег с ливнем',
      'mist': 'Туман',
      'smoke': 'Дымка',
      'haze': 'Мгла',
      'sand/ dust whirls': 'Песчаные/пыльные вихри',
      'fog': 'Густой туман',
      'sand': 'Песок',
      'dust': 'Пыль',
      'volcanic ash': 'Вулканический пепел',
      'squalls': 'Шквалы',
      'tornado': 'Торнадо',
      'thunderstorm with light rain': 'Гроза с небольшим дождем',
      'thunderstorm with rain': 'Гроза с дождем',
      'thunderstorm with heavy rain': 'Гроза с сильным дождем',
      'light thunderstorm': 'Небольшая гроза',
      'thunderstorm': 'Гроза',
      'heavy thunderstorm': 'Сильная гроза',
      'ragged thunderstorm': 'Неровная гроза',
      'thunderstorm with light drizzle': 'Гроза с небольшим моросящим дождем',
      'thunderstorm with drizzle': 'Гроза с моросящим дождем',
      'thunderstorm with heavy drizzle': 'Гроза с сильным моросящим дождем',
    };

    const key = description.toLowerCase();
    return translations[key] || description;
  };

  let desc = day.weather[0].description;
  desc = translateWeatherDescription(desc);
  desc = desc[0].toUpperCase() + desc.substring(1);

  const baseIconCode = day.weather[0].icon;

  const dayIconCode = baseIconCode.endsWith('n') ? baseIconCode.replace('n', 'd') : baseIconCode;
  const nightIconCode = baseIconCode.endsWith('d') ? baseIconCode.replace('d', 'n') : baseIconCode;

  const dayIconImg = icons[dayIconCode] || icons['01d'];
  const nightIconImg = icons[nightIconCode] || icons['01n'];

  return (
    <div className={s.daily__item}>
      <h3 className={s.daily__title}>
        {index === 0
          ? 'Сегодня'
          : index === 1
          ? 'Завтра'
          : getTime(day.dt, 'weekday', timezone)}
      </h3>
      <p className={s.daily__date}>
        {getTime(day.dt, 'day', timezone)} {getTime(day.dt, undefined, timezone)}
      </p>
      <p className={s.daily__desc}>{desc}</p>

      <div className={s.daily__weather}>
        <p className={s.daily__label}>День</p>
        <img src={dayIconImg} alt="Day weather" className={s.daily__img} />
        <p className={s.daily__temp}>{Math.round(day.temp.day)}°</p>
      </div>

      <div className={s.daily__weather}>
        <p className={s.daily__label}>Ночь</p>
        <img src={nightIconImg} alt="Night weather" className={s.daily__img} />
        <p className={s.daily__night}>{Math.round(day.temp.night)}°</p>
      </div>
    </div>
  );
};

export default DailyItem;