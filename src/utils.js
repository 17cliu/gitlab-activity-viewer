export function floorDateToClosestSunday(date) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - newDate.getDay());
    return newDate;
}

export function formatIsoDate(date) {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export function formatLongDate(date) {
    return new Intl.DateTimeFormat('en-CA', { dateStyle: 'full' }).format(date);
}

export function generateDateStampsInRange(oldest, newest) {
    const newestDate = new Date(newest);
    const oldestDate = new Date(oldest);
    const dates = [];

    // https://github.com/eslint/eslint/issues/6984
    // eslint-disable-next-line no-unmodified-loop-condition
    while (newestDate > oldestDate) {
        dates.push(formatIsoDate(newestDate));
        newestDate.setDate(newestDate.getDate() - 1);
    }

    return dates;
}
