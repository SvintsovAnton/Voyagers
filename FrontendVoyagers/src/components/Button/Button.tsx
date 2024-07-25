import { ButtonComponent } from "./styles"

import { ButtonProps } from "./types"

export default function Button({
  name,
  type = "button",
  onClick = () => {},
}: ButtonProps) {
  return (
    <ButtonComponent type={type} onClick={onClick}>
      {name}
    </ButtonComponent>
  )
}
