import {
  InputCheckboxLabel,
  InputCheckboxComponent,
  ErrorContainer,
  InputCheckboxContainer,
} from "./styles"
import InputCheckboxProps from "./types"

export default function InputCheckbox({
  id,
  name,
  type = "checkbox",
  label,
  checked,
  onChange,
  error,
}: InputCheckboxProps) {
  return (
    <InputCheckboxContainer>
      <InputCheckboxLabel htmlFor={id}>{label}</InputCheckboxLabel>
      <InputCheckboxComponent 
      id={id}
      name={name}
      type={type}
      checked={checked}
      onChange={onChange}
      // error={!!error}
    />
    {error && <ErrorContainer>{error}</ErrorContainer>}
    </InputCheckboxContainer>
  )
}
