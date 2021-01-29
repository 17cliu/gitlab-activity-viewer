import { useState } from 'react';
import FormTextField from './FormTextField';

const DEFAULT_HOST = 'gitlab.com';

function Form({ onSubmit }) {
    const [customHost, setCustomHost] = useState('');
    const [isCustomHost, setIsCustomHost] = useState(false);
    const [username, setUsername] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = e => {
        e.preventDefault();

        // TODO: should try to clear errors on form dirty

        const newValidationErrors = {};

        if (isCustomHost) {
            if (!customHost) {
                newValidationErrors.customHost = 'Please enter domain';
            }

            if (!accessToken) {
                newValidationErrors.accessToken = 'Please enter access token';
            }
        }

        if (!username) {
            newValidationErrors.username = 'Please enter username';
        }

        setValidationErrors(newValidationErrors);

        if (Object.keys(newValidationErrors).length <= 0) {
            const options = {
                host: isCustomHost ? customHost : DEFAULT_HOST,
                accessToken: isCustomHost ? accessToken : '',
                username,
            };

            onSubmit(options);
        }
    };

    const handleRadioChange = e => {
        setIsCustomHost(e.target.value !== DEFAULT_HOST);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
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
                        <FormTextField
                            id="customHost"
                            label="URL of your GitLab instance (e.g. gitlab.mycompany.com)"
                            placeholder="git.mycompany.com"
                            value={customHost}
                            onChange={e => setCustomHost(e.target.value)}
                            error={validationErrors.customHost}
                        />
                        <FormTextField
                            id="accessToken"
                            label="Your access token
                                (generate one with `read_api` scope at
                                User Settings &gt; Access Tokens)"
                            placeholder="YOUR_API_KEY"
                            value={accessToken}
                            onChange={e => setAccessToken(e.target.value)}
                            error={validationErrors.accessToken}
                        />
                    </div>
                )}
            </div>

            <FormTextField
                id="username"
                label="Your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                error={validationErrors.username}
            />

            <input className="btn" type="submit" value="Go!" />
        </form>
    );
}

export default Form;
