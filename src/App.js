// import { useEffect, useState } from 'react';
// import Dashboard from './components/Dashboard';

function App() {
    return (
        <div>
            <h1>How spicy is your GitLab activity? 🔥</h1>

            <form className="form">
                <div className="form-row">
                    <label for="host">
                        Your GitLab domain
                        ("gitlab.com", or "git.mycompany.com"
                        if you're on a self-hosted instance of GitLab)
                    </label>
                    <input type="text"
                        className="text-input"
                        id="host"
                        placeholder="git.transmissionmedia.ca"
                    />
                </div>

                <div className="form-row">
                    <label for="userId">
                        Your numerical user ID
                        (find this at User Settings &gt; Edit Profile)
                    </label>
                    <input
                        type="text"
                        className="text-input"
                        id="userId"
                        placeholder="4"
                    />
                </div>

                <div className="form-row">
                    <label for="accessToken">
                        Your access token
                        (generate one with `read_user` scope at User Settings &gt; Access Tokens)
                    </label>
                    <input
                        type="text"
                        className="text-input"
                        id="accessToken"
                        placeholder="YOUR_API_KEY"
                    />
                </div>

                <input type="button" className="btn" value="Go!" />
            </form>

            {/* <Dashboard /> */}
        </div>
    );
}

export default App;
