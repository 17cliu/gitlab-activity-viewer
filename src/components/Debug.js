
function Debug({ data }) {
    return (
        <pre className="debug">
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}

export default Debug;
