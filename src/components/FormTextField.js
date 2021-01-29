function FormTextField({
    id,
    label,
    name,
    placeholder = '',
    value,
    onChange,
    error
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
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-message">{error}</div>}
        </div>
    );
}

export default FormTextField;
