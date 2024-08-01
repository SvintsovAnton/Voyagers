import { useState } from "react"

import {
  InputLabel,
  InputComponent,
  IconContainer,
  ErrorContainer,
  InputContainer,
} from "./styles"

import InputProps from "./types"

import EyeIcon from "assets/eye-icon.svg"
import EyeOffIcon from "assets/eye-off-icon.svg"

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
