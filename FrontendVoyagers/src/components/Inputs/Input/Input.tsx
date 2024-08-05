import { useState } from "react"
import {
  InputContainer,
  InputLabel,
  InputComponent,
  IconContainer,
  ErrorContainer,
} from "./styles"
import InputProps from "./types"
import { EyeIcon, EyeOffIcon } from "assets/index"
export default function Input({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }
  return (
    <InputContainer>
      {label && <InputLabel>{label}</InputLabel>}
      <InputComponent
        id={id}
        name={name}
        type={isPasswordVisible ? "text" : type} // Используем 'text' если пароль видим
        value={value}
        onChange={onChange}
        error={!!error}
      />
      {type === "password" && (
        <IconContainer
          onClick={togglePasswordVisibility}
          src={isPasswordVisible ? EyeIcon : EyeOffIcon}
          alt={isPasswordVisible ? "Hide password" : "Show password"}
        />
      )}
      {error && <ErrorContainer>{error}</ErrorContainer>}
    </InputContainer>
  )
}
