
import { calculateMonthLabels } from '../utils';
import TapestryCell from './TapestryCell';
import TapestryLabel from './TapestryLabel';

const THRESHOLDS = [
    { value: 0, label: 'Bland: 0' },
    { value: 1, label: 'Mild: 1 to 9 contributions' },
    { value: 10, label: 'Medium: 10 to 19 contributions' },
    { value: 20, label: 'Hot: 20 to 29 contributions' },
    { value: 30, label: 'Extra hot: 30 to 39 contributions' },
    { value: 40, label: 'Are you sure this is edible?: 40 to 49 contributions' },
    { value: 50, label: 'Actual fire: 50+ contributions' }
];

function Tapestry({ cells, startDate }) {
    const numWeeks = Math.ceil(cells.length / 7);
    const monthLabels = calculateMonthLabels(startDate, numWeeks);

    return (
        <>
            <div className="tapestry-window">
                <div className="tapestry-labels">
                    {monthLabels.map((label, i) => (
                        <TapestryLabel
                            key={`${label.year}${label.month}`}
                            {...label}
                        />
                    ))}
                </div>
                <div className="tapestry">
                    {cells.map(cell => (
                        <TapestryCell
                            key={cell.label}
                            thresholds={THRESHOLDS}
                            {...cell}
                        />
                    ))}
                </div>
            </div>
            <div className="tapestry-legend">
                {THRESHOLDS.map(o => (
                    <TapestryCell
                        key={`legend-${o.value}`}
                        count={o.value}
                        label={o.label}
                        showCount={false}
                        thresholds={THRESHOLDS}
                    />
                ))}
            </div>
        </>
    );
}

export default Tapestry;
