import { ButtonPrimaryNavbar, NavbarHidden } from "components/index"
import { ButtonCloseSidebar } from "components/Sidebar/styles"
import { SidebarHiddenWrapper } from "./styles"
import SidebarHiddenProps from "./types"
import { HomeIcon } from "assets/index"
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
      />
      <NavbarHidden />
      <ButtonCloseSidebar onClick={onCloseSidebar} />
    </SidebarHiddenWrapper>
  )
}
