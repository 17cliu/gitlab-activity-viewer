import { useState } from 'react';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

function App() {
    const [config, setConfig] = useState(null);

    let contents;

    if (config && config.username) {
        contents = <>
            <Dashboard {...config} />
            <button
                className="btn"
                onClick={() => setConfig({ ...config, username: null })}>
                    &lt; Try another user
            </button>
        </>;
    } else {
        contents = <Form onSubmit={setConfig} />;
    }

    return (
        <div>
            <h1>How spicy is your GitLab activity? 🔥</h1>
            {contents}
        </div>
    );
}

export default App;
