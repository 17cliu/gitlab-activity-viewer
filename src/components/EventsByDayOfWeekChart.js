import BarChart from './BarChart';

const LABELS = {
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
};

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
        chart: {
            width: 500,
            height: 200,
            type: 'column',
        },
        yAxis: {
            labels: {
                enabled: false
            }
        },
        series: [
            {
                name: 'Counts',
                data: Object.keys(counts).map(k => [LABELS[k], counts[k]])
            }
        ]
    };

    return (
        <BarChart options={options} />
    );
}

export default EventsByDayOfWeekChart;
