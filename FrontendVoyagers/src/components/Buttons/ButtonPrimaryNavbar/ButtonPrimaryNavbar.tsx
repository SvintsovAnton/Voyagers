import { Link } from "react-router-dom"
import {
  ButtonPrimaryComponent,
  ButtonPrimaryImg,
  ButtonPrimaryTitle,
} from "./styles"
import ButtonPrimaryNavbarProps from "./types"
export default function ButtonPrimaryNavbar({
  name,
  type = "button",
  path,
  src,
  isSelected,
  onClick,
  buttonComponentStyle
}: ButtonPrimaryNavbarProps) {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <ButtonPrimaryComponent type={type} isSelected={isSelected} onClick={onClick} style={buttonComponentStyle}>
        <ButtonPrimaryImg src={src} alt={name} />
        <ButtonPrimaryTitle>{name}</ButtonPrimaryTitle>
      </ButtonPrimaryComponent>
    </Link>
  )
}
