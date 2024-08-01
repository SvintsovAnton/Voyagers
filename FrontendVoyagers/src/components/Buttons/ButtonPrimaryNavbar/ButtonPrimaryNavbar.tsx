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
  path = "/",
  src,
}: ButtonPrimaryNavbarProps) {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <ButtonPrimaryComponent type={type}>
        <ButtonPrimaryImg src={src} alt={name} />
        <ButtonPrimaryTitle>{name}</ButtonPrimaryTitle>
      </ButtonPrimaryComponent>
    </Link>
  )
}
