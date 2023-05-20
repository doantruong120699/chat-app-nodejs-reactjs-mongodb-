import moment from 'moment';

export function isExpire(timestamp: number | Date) {
    return moment().isBefore(moment(timestamp));
}
