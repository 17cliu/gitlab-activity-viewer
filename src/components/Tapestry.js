
import TapestryCell from './TapestryCell';

function Tapestry({ cells }) {
    return (
        <div className="tapestry-wrapper">
            <div className="tapestry">
                {cells.map(cell => <TapestryCell key={cell.date} {...cell} />)}
            </div>
        </div>
    );
}

export default Tapestry;
