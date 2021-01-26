
function TapestryCell({
    label,
    count,
    showCount = true
}) {
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
        <div title={label} data-label={label} data-count={count} className={className}>
            {showCount && count ? count : ''}
        </div>
    );
}

export default TapestryCell;
