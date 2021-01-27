const THRESHOLDS = [50, 40, 30, 20, 10, 1, 0];
const NUM_THRESHOLDS = THRESHOLDS.length;

function TapestryCell({
    label,
    count,
    showCount = true
}) {
    let level = 0;

    for (let i = 0; i < NUM_THRESHOLDS; i++) {
        if (count >= THRESHOLDS[i]) {
            level = NUM_THRESHOLDS - 1 - i;
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
