import ButtonPrimaryNavbar from "components/Buttons/ButtonPrimaryNavbar/ButtonPrimaryNavbar"
import NavbarHidden from "components/NavbarHidden/NavbarHidden"
import { ButtonCloseSidebar } from "components/Sidebar/styles"
import { SidebarHiddenWrapper } from "./styles"
import SidebarHiddenProps from "./types"
import HomeIcon from "assets/home-icon.svg"
export default function SidebarHidden({
  isOpen,
  onCloseSidebar,
}: SidebarHiddenProps) {
  return (
    <SidebarHiddenWrapper isOpen={isOpen}>
      <ButtonPrimaryNavbar
        path="/events/active"
        src={HomeIcon}
        isSelected={false}
      ></ButtonPrimaryNavbar>
      <NavbarHidden />
      <ButtonCloseSidebar onClick={onCloseSidebar}></ButtonCloseSidebar>
    </SidebarHiddenWrapper>
  )
}
