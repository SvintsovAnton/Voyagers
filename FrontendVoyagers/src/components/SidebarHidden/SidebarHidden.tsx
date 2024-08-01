import ButtonPrimaryNavbar from "components/Buttons/ButtonPrimaryNavbar/ButtonPrimaryNavbar"
import User from "components/User/User"
import NavbarHidden from "components/NavbarHidden/NavbarHidden"
import { ButtonCloseSidebar } from "components/Sidebar/styles"

import { SidebarHiddenWrapper } from "./styles"
import SidebarHiddenProps from "./types"

import PhotoIcon from "assets/test.png"
import HomeIcon from "assets/home-icon.svg"

export default function SidebarHidden({ onCloseSidebar }: SidebarHiddenProps) {
  return (
    <SidebarHiddenWrapper>
      <ButtonPrimaryNavbar
        name=""
        path="/events/active"
        src={HomeIcon}
      ></ButtonPrimaryNavbar>
      <User username="Guest" imagePath={PhotoIcon} />
      <NavbarHidden />
      <ButtonCloseSidebar onClick={onCloseSidebar}></ButtonCloseSidebar>
    </SidebarHiddenWrapper>
  )
}
