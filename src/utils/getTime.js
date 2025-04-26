
export default function getTime(dt, type, timezone = 0) {
    const milsec = dt * 1000;
    const utcDate = new Date(milsec); 
    const localDate = new Date(milsec + timezone * 1000);
  
    const result =
      type === 'hours'
        ? localDate.getUTCHours()
        : type === 'min'
        ? localDate.getUTCMinutes()
        : type === 'weekday'
        ? localDate.toLocaleString('ru-RU', { weekday: 'short', timeZone: 'UTC' })
        : type === 'day'
        ? localDate.toLocaleString('ru-RU', { day: 'numeric', timeZone: 'UTC' })
        : localDate.toLocaleString('ru-RU', { month: 'short', timeZone: 'UTC' });
  
    return result;
  }