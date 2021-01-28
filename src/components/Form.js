import { useState } from 'react';

const DEFAULT_HOST = 'gitlab.com';

function Form({ onSubmit }) {
    const [customHost, setCustomHost] = useState('');
    const [isCustomHost, setIsCustomHost] = useState(false);
    const [userId, setUserId] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: validate

        const options = {
            host: isCustomHost ? customHost : DEFAULT_HOST,
            accessToken: isCustomHost ? accessToken : '',
            userId,
        };

        onSubmit(options);
    };

    const handleRadioChange = e => {
        setIsCustomHost(e.target.value !== DEFAULT_HOST);
    };

    return (
        <form className="form">
            <div className="form-row">
                <fieldset className="fieldset">
                    <legend htmlFor="host">
                        My profile is on...
                    </legend>
                    <label className="radio-label">
                        <input type="radio"
                            className="radio-input"
                            name="hostType"
                            value={DEFAULT_HOST}
                            checked={!isCustomHost}
                            onChange={handleRadioChange}
                        />
                        GitLab.com
                    </label>

                    <label className="radio-label">
                        <input type="radio"
                            className="radio-input"
                            name="hostType"
                            value="custom"
                            checked={isCustomHost}
                            onChange={handleRadioChange}
                        />
                        A self-hosted instance of GitLab...
                    </label>
                </fieldset>

                {isCustomHost && (
                    <div className="nested-fields">

                        <div className="form-row">
                            <label htmlFor="customHost">
                            URL of your GitLab instance (e.g. gitlab.mycompany.com)
                            </label>
                            <input type="text"
                                className="text-input"
                                id="customHost"
                                name="customHost"
                                placeholder="git.mycompany.com"
                                value={customHost}
                                onChange={e => setCustomHost(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="accessToken">
                            Your access token
                            (generate one with `read_user` scope at
                            User Settings &gt; Access Tokens)
                            </label>
                            <input
                                type="text"
                                className="text-input"
                                id="accessToken"
                                name="accessToken"
                                placeholder="YOUR_API_KEY"
                                value={accessToken}
                                onChange={e => setAccessToken(e.target.value)}
                            />
                        </div>
                    </div>
                )}
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
                    name="userId"
                    placeholder="4"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                />
            </div>

            <div className="form-row">
            </div>

            <button className="btn" onClick={handleSubmit}>Go!</button>
        </form>
    );
}

export default Form;
