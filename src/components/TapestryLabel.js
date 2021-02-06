const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function TapestryLabel({ year, month, numWeeksInMonth }) {
    const className = `tapestry-label tapestry-label--${numWeeksInMonth}`;
    const monthName = MONTHS[month];
    const label = `${monthName} ${year}`;

    return (
        <div title={label} data-month={month} data-year={year} className={className}>
            {!month && <span className="tapestry-label-year">{year}</span>}
            <span className="tapestry-label-month">{monthName}</span>
        </div>
    );
}

export default TapestryLabel;
