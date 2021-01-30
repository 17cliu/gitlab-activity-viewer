function FormTextField({
    id,
    label,
    name,
    placeholder = '',
    error,
    register
}) {
    return (
        <div className="form-row">
            <label htmlFor={id}>
                {label}
            </label>
            <input type="text"
                className={`text-input ${error && 'is-invalid'}`}
                id={id}
                name={name || id}
                placeholder={placeholder}
                aria-invalid={error ? 'true' : 'false'}
                ref={register}
            />
            {error && <div role="alert" className="invalid-message">{error}</div>}
        </div>
    );
}

export default FormTextField;
