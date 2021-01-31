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
        <div className={className}
            data-label={label}
            data-count={count}
            title={label}
        >
            {showCount && count ? count : ''}
        </div>
    );
}

export default TapestryCell;
