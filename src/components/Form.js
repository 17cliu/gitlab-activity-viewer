import { useForm } from 'react-hook-form';
import FormTextField from './FormTextField';

const DEFAULT_HOST = 'gitlab.com';

function Form({ onSubmit }) {
    const { register, watch, errors, handleSubmit } = useForm();

    const handleFormSubmit = data => {
        const options = {
            host: data.isCustomHost === 'true' ? data.customHost : DEFAULT_HOST,
            accessToken: data.isCustomHost ? data.accessToken : '',
            username: data.username
        };

        onSubmit(options);
    };

    // Watch value of this form field, and see if the value is "true".
    const showCustomHostOptions = watch('isCustomHost') === 'true';

    // TODO: Validation error management here is getting a lil unwieldy

    // Provide nuanced access token validation errors
    let accessTokenError;

    if (errors.accessToken?.type === 'required') {
        accessTokenError = 'Please enter access token';
    } else if (errors.accessToken?.type === 'pattern') {
        accessTokenError = 'Access token must contain only letters and numbers';
    }

    // Provide nuanced username validation errors
    let usernameError;

    if (errors.username?.type === 'required') {
        usernameError = 'Please enter username';
    } else if (errors.username?.type === 'minLength') {
        usernameError = 'Username must be at least two letters long';
    } else if (errors.username?.type === 'pattern') {
        usernameError = 'Username must contain only letters, numbers, ' +
            'dash (-), underscore (_), and periods (.)';
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
            <div className="form-row">
                <fieldset className="fieldset">
                    <legend htmlFor="host">
                        My profile is on...
                    </legend>
                    <label className="radio-label">
                        <input type="radio"
                            className="radio-input"
                            name="isCustomHost"
                            value="false"
                            ref={register}
                            defaultChecked
                        />
                        GitLab.com
                    </label>

                    <label className="radio-label">
                        <input type="radio"
                            className="radio-input"
                            name="isCustomHost"
                            value="true"
                            ref={register}
                        />
                        A self-hosted instance of GitLab...
                    </label>
                </fieldset>

                {showCustomHostOptions && (
                    <div className="nested-fields">
                        <FormTextField
                            id="customHost"
                            label="URL of your GitLab instance (e.g. gitlab.mycompany.com)"
                            placeholder="git.mycompany.com"
                            error={errors.customHost && 'Please enter domain'}
                            register={register({ required: true })}
                        />
                        <FormTextField
                            id="accessToken"
                            label="Your access token
                                (generate one with `read_api` scope at
                                User Settings &gt; Access Tokens)"
                            placeholder="YOUR_API_KEY"
                            error={accessTokenError}
                            register={register({
                                required: true,
                                pattern: /^[a-z0-9]+$/i,
                            })}
                        />
                    </div>
                )}
            </div>

            <FormTextField
                id="username"
                label="Your username"
                error={usernameError}
                register={register({
                    required: true,
                    // Approximation of GitLab username rules:
                    // - Only allow letters, numbers, dash, underscore, period
                    // - Must be at least two characters long
                    // https://gitlab.com/gitlab-org/gitlab/-/blob/
                    // 91895122e1085ef027146334cedb875d1e4f2693/lib/gitlab/path_regex.rb#L135
                    pattern: /^[a-z0-9-_.]{2,}$/i,
                    // The regex above covers this, but including this rule makes
                    // it easier to add a separate validation message for length.
                    minLength: 2,
                })}
            />

            <input className="btn" type="submit" value="Go!" />
        </form>
    );
}

export default Form;
