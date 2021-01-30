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
                            error={errors.accessToken && 'Please enter access token'}
                            register={register({ required: true })}
                        />
                    </div>
                )}
            </div>

            <FormTextField
                id="username"
                label="Your username"
                error={errors.username && 'Please enter username'}
                register={register({ required: true, minLength: 1 })}
            />

            <input className="btn" type="submit" value="Go!" />
        </form>
    );
}

export default Form;
