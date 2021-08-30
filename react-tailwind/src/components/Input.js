const Input = ({ label, name, type, value, setData, containerClassName = "", msgErrorInput, autoComplete = "", placeholder = "" }) => {
    return (
        <div className={containerClassName}>
            <label htmlFor={name} >
                 {label} {/*<span className="form-input-label-error">{msgErrorInput}</span> */}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required
                // className={"mt-1 form-input  form-input-border-" + (msgErrorInput ? "-error" : "-normal")}
                className="mt-1 form-input  form-input-border-normal"
                placeholder={placeholder}
                value={value}
                onChange={setData}
            />
        </div>
    )
}

export default Input
