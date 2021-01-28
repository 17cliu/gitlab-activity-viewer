
/**
 * Returns array of objects that are month labels for a calendar.
 *
 * @param {Date} startDate - Start date for this calendar; must be a Sunday
 * @param {number} numWeeks - Number of weeks displayed in this calendar
 * @returns {object[]} - Monthly labels, with the following properties:
 *  - {number} year - The year, e.g. `2021`
 *  - {number} month - The zero-indexed month, e.g. `0` for January
 *  - {number} numWeeksInMonth - The number of weeks occurring in this month
 */
export function calculateMonthLabels(startDate, numWeeks) {
    const weeks = [...Array(numWeeks).keys()];

    const monthLabels = [];
    let currentLabel = null;

    weeks.forEach(n => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + n * 7);
        const month = date.getMonth();

        if (currentLabel && currentLabel.month === month) {
            currentLabel.numWeeksInMonth++;
        } else {
            currentLabel = {
                year: date.getFullYear(),
                month,
                numWeeksInMonth: 1
            };
            monthLabels.push(currentLabel);
        }
    });

    return monthLabels;
}

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
