function InputField({
  type,
  placeholder,
  name,
  register,
  additionalClass,
  validationMessage,
  errors,
  validate,
  disabled,
  required,
  minLength,
  maxLength,
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        autoComplete="on"
        placeholder={placeholder}
        className={`w-full py-[1em] px-[1.2em] rounded-[5px] bg-[#333] text-[15px] text-[#f2f2f2] outline-none shadow-none border-0 border-b-2 border-solid border-transparent transition-all duration-200 ease-out
                    ${errors?.[name] && 'Input--error border-b-2 border-solid border-yellow-500'}
                    ${additionalClass && additionalClass}
                `}
        disabled={disabled}
        {...register(name, { required, validate, minLength, maxLength })}
      />
      {errors?.[name] && (
        <p className="InputField__label mt-[0.4em] text-[13px] text-yellow-500">
          {validationMessage}
        </p>
      )}
    </>
  );
}

export default InputField;
