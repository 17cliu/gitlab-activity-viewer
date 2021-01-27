
import TapestryCell from './TapestryCell';
import TapestryLabel from './TapestryLabel';

function Tapestry({ cells, startDate }) {
    const numWeeks = Math.ceil(cells.length / 7);
    const weeks = [...Array(numWeeks).keys()];

    const monthLabels = [];
    let currentLabel = null;

    weeks.forEach(n => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + n * 7);
        const month = date.getMonth();

        if (currentLabel && currentLabel.month === month) {
            currentLabel.size++;
        } else {
            currentLabel = { year: date.getFullYear(), month, size: 1 };
            monthLabels.push(currentLabel);
        }
    });

    return (
        <>
            <div className="tapestry-window">
                <div className="tapestry-labels">
                    {monthLabels.map((label, i) => <TapestryLabel
                        key={`${label.year}${label.month}`}
                        {...label}
                    />)}
                </div>
                <div className="tapestry">
                    {cells.map(cell => <TapestryCell key={cell.date} {...cell} />)}
                </div>
            </div>
            <div className="tapestry-legend">
                <TapestryCell showCount={false} label="Bland: 0" count="0" />
                <TapestryCell showCount={false} label="Mild: 1 to 9 contributions" count="1" />
                <TapestryCell showCount={false} label="Medium: 10 to 19 contributions" count="10" />
                <TapestryCell showCount={false} label="Hot: 20 to 29 contributions" count="20" />
                <TapestryCell showCount={false}
                    label="Extra hot: 30 to 39 contributions" count="30" />
                <TapestryCell showCount={false}
                    label="Are you sure this is edible?: 40 to 49 contributions" count="40" />
                <TapestryCell showCount={false}
                    label="Actual fire: 50+ contributions" count="50" />
            </div>
        </>
    );
}

export default Tapestry;
