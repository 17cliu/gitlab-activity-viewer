import { useState } from 'react';

function Form({ onSubmit }) {
    const [host, setHost] = useState('');
    const [userId, setUserId] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        // TODO: validate
        onSubmit({ host, userId, accessToken });
    };

    return (
        <form className="form">
            <div className="form-row">
                <label htmlFor="host">
                    Your GitLab domain
                    ("gitlab.com", or "git.mycompany.com"
                    if you're on a self-hosted instance of GitLab)
                </label>
                <input type="text"
                    className="text-input"
                    id="host"
                    placeholder="git.transmissionmedia.ca"
                    value={host}
                    onChange={e => setHost(e.target.value)}
                />
            </div>

            <div className="form-row">
                <label htmlFor="userId">
                    Your numerical user ID
                    (find this at User Settings &gt; Edit Profile)
                </label>
                <input
                    type="text"
                    className="text-input"
                    id="userId"
                    placeholder="4"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                />
            </div>

            <div className="form-row">
                <label htmlFor="accessToken">
                    Your access token
                    (generate one with `read_user` scope at User Settings &gt; Access Tokens)
                </label>
                <input
                    type="text"
                    className="text-input"
                    id="accessToken"
                    placeholder="YOUR_API_KEY"
                    value={accessToken}
                    onChange={e => setAccessToken(e.target.value)}
                />
            </div>

            <button className="btn" onClick={handleSubmit}>Go!</button>
        </form>
    );
}

export default Form;
