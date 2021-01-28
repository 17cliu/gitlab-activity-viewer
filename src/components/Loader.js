
function Loader({ current, total }) {
    const pct = current / total * 100;
    return (
        <div className="loader">
            <label for="loader">Loaded {current} of {total} events</label>
            <progress id="loader" max={total} value={current}>{pct}%</progress>
        </div>
    );
}

export default Loader;
