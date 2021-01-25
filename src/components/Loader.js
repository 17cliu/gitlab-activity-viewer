
function Loader({ current, total }) {
    const pct = current / total * 100;
    return (
        <div>
            <p>Loaded {current} of {total} events</p>
            <progress max={total} value={current}>{pct}%</progress>
        </div>
    );
}

export default Loader;
