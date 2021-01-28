import { useState } from 'react';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

function App() {
    const [config, setConfig] = useState(null);

    return (
        <div>
            <h1>How spicy is your GitLab activity? 🔥</h1>

            {!config && <Form onSubmit={setConfig} />}
            {config && <Dashboard {...config} />}
        </div>
    );
}

export default App;
