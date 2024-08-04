import { Link } from "react-router-dom"
import User from "components/User/User"
import Navbar from "components/Navbar/Navbar"
import PhotoIcon from "assets/test.png"
import {
  SidebarWrapper,
  Logo,
  ButtonCloseSidebar,
} from "./styles"
import SidebarProps from "./types"
export default function Sidebar({ isOpen, onCloseSidebar }: SidebarProps) {
  return (
    <SidebarWrapper isOpen={isOpen}>
      <Link to={"/events/active"} style={{ textDecoration: "none" }}>
        <Logo>Voyagers</Logo>
      </Link>
      <User username="Guest" imagePath={PhotoIcon} />
      <Navbar />
        <ButtonCloseSidebar onClick={onCloseSidebar}></ButtonCloseSidebar>
    </SidebarWrapper>
  )
}
