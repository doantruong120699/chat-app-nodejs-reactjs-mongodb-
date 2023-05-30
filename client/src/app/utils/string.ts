import * as moment from 'moment';

export function transformTime(value: string = ''): string {
  let m: moment.Moment = moment.utc(value);
  let now = moment();
  let ms = now.diff(m);
  const duration = moment.duration(ms);
  if (duration.asSeconds() < 60) {
    return `${parseInt(duration.asSeconds().toString())}s ago`;
  }
  if (duration.asMinutes() < 60) {
    return `${parseInt(duration.asMinutes().toString())}m ago`;
  }
  if (duration.asHours() < 24) {
    return `${parseInt(duration.asHours().toString())}h ago`;
  }
  return m.format('DD/M/YYYY HH:mm ');
}
