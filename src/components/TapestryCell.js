function TapestryCell({
    count,
    label,
    showCount = true,
    thresholds,
}) {
    const numThresholds = thresholds.length;
    let level = 0;

    for (let i = numThresholds - 1; i >= 0; i--) {
        if (count >= thresholds[i].value) {
            level = i;
            break;
        }
    }

    const className = `tapestry-cell tapestry-cell--${level}`;

    return (
        <div title={label} data-label={label} data-count={count} className={className}>
            {showCount && count ? count : ''}
        </div>
    );
}

export default TapestryCell;
