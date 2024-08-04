import {
  InputSearchComponent,
  IconContainer,
  InputSearchContainer,
} from "./styles"
import InputSearchProps from "./types"
export default function InputSearch({
  id,
  name,
  type = "search",
  placeholder,
  src,
  alt,
  value,
  onChange,
  inputComponentStyle,
}: InputSearchProps) {
  return (
    <InputSearchContainer>
      <IconContainer src={src} alt={alt} />
      <InputSearchComponent
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={inputComponentStyle}
      />
    </InputSearchContainer>
  )
}
