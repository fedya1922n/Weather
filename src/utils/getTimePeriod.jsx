import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import getTime from "./getTime.js";

const getTimePeriod = (dt, timezone) => {
  const utcTime = new Date(dt * 1000).getTime();
  const localTime = new Date(utcTime + timezone * 1000);
  const hour = localTime.getHours();

  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 16) return 'noon';
  if (hour >= 16 && hour < 20) return 'evening';
  return 'night';
};

const TimePeriodComponent = ({ dt }) => {
  const weather = useSelector((state) => state.weather.weather);
  const timezone = weather?.current?.timezone || 0;

  const period = getTimePeriod(dt, timezone);

  useEffect(() => {
    document.body.className = period;

    return () => {
      document.body.className = '';
    };
  }, [period]);

  return (
    <div>
      <p>Текущее время суток: {period}</p>
    </div>
  );
};

export { getTimePeriod };
export default TimePeriodComponent;