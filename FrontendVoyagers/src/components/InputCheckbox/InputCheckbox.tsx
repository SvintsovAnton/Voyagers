import {
  InputCheckboxComponent,
  InputCheckboxContainer,
  InputCheckboxLabel,
} from "./styles"
import { InputCheckboxProps } from "./types"

export default function InputCheckbox({
  id,
  name,
  type = "checkbox",
  label,
  checked,
  onChange,
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
    />
    </InputCheckboxContainer>
  )
}
