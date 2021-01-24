
function TapestryCell({ date, count }) {
    let level;

    if (count > 29) {
        level = 4;
    } else if (count > 19) {
        level = 3;
    } else if (count > 9) {
        level = 2;
    } else if (count > 0) {
        level = 1;
    } else {
        level = 0;
    }

    const className = `tapestry-cell tapestry-cell--${level}`;

    return (
        <div data-date={date} data-count={count} className={className}>
            {count || ''}
        </div>
    );
}

export default TapestryCell;
