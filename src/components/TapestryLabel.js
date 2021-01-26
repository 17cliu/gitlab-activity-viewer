
const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function TapestryLabel({ year, month, size }) {
    const className = `tapestry-label tapestry-label--${size}`;
    const monthName = MONTHS[month];
    const label = `${monthName} ${year}`;

    return (
        <div title={label} data-month={month} data-year={year} className={className}>
            {!month && <>{year}<br/></>}
            {monthName}
        </div>
    );
}

export default TapestryLabel;
