import BarChart from './BarChart';

export function countEventsByDaysOfTheWeek(data) {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const counts = Array(7).fill(0); // One cell per day of the week, starting Sun

    data.forEach(o => {
        const d = new Date(o.created_at);
        const i = d.getDay();
        counts[i]++;
    });

    return counts.reduce((memo, n, i) => ({ ...memo, [days[i]]: n }), {});
}

function EventsByDayOfWeekChart({ data }) {
    const counts = countEventsByDaysOfTheWeek(data);
    const options = {
        title: { text: 'Events by Day of the Week' },
        series: [
            {
                name: 'Counts',
                data: Object.keys(counts).map(k => [k, counts[k]])
            }
        ]
    };

    return (
        <BarChart options={options} />
    );
}

export default EventsByDayOfWeekChart;
