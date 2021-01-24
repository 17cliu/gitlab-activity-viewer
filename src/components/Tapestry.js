
import TapestryCell from './TapestryCell';

function Tapestry({ cells }) {
    return (
        <div className="tapestry">
            {cells.map(cell => <TapestryCell key={cell.date} {...cell} />)}
        </div>
    );
}

export default Tapestry;
