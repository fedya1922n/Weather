
import React, { useState } from 'react';
import s from './daily.module.scss';
import DailyItem from './DailyItem';
import { useSelector } from 'react-redux';

const Daily = ({ setSelectedDay }) => {
  const weather = useSelector((state) => state.weather.weather);
  const daily = weather?.daily || [];
  const [show, setShow] = useState(true);

  return (
    <div className={s.daily}>
      <nav className={s.daily__nav}>
        <button
          className={`${s.daily__btn} ${show ? s.active : ''}`}
          onClick={() => setShow(true)}
        >
          На неделю
        </button>
        <button
          className={`${s.daily__btn} ${!show ? s.active : ''}`}
          onClick={() => setShow(false)}
        >
          Отменить
        </button>
      </nav>
      <div className={`${s.daily__content} ${!show ? s.active : ''}`}>
        {daily.length > 0 ? (
          daily
            .map((elem, index) => {
              return <DailyItem day={elem} index={index} key={elem.dt} />;
            })
            .slice(0, 7)
        ) : (
          <p>Нет данных о погоде на неделю</p>
        )}
      </div>
    </div>
  );
};

export default Daily;