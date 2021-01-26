
import TapestryCell from './TapestryCell';

function Tapestry({ cells }) {
    return (
        <>
            <div className="tapestry-legend">
                <TapestryCell showCount={false} label="0" count="0" />
                <TapestryCell showCount={false} label="1 to 9 contributions" count="1" />
                <TapestryCell showCount={false} label="10 to 19 contributions" count="10" />
                <TapestryCell showCount={false} label="20 to 29 contributions" count="20" />
                <TapestryCell showCount={false} label="30 to 39 contributions" count="30" />
            </div>
            <div className="tapestry-window">
                <div className="tapestry">
                    {cells.map(cell => <TapestryCell key={cell.date} {...cell} />)}
                </div>
            </div>
        </>
    );
}

export default Tapestry;
