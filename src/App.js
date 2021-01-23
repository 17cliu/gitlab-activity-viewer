import { useEffect, useState } from 'react';
import Action from './components/Action';
import Debug from './components/Debug';
import fetchData from './api';

function App() {
    const [result, setResult] = useState([]);
    useEffect(() => {
        fetchData().then(setResult);
    }, []);

    return (
        <div className="App">
            <ol className="activity-list">
                {result.map(o => <Action key={o.id} {...o} />)}
            </ol>
            <Debug data={result} />
        </div>
    );
}

export default App;
