import { Link } from "react-router-dom"
import { User, Navbar } from "components/index"
import { SidebarWrapper, Logo, ButtonCloseSidebar } from "./styles"
import SidebarProps from "./types"
import { UserTestImg } from "assets/index"
export default function Sidebar({ isOpen, onCloseSidebar }: SidebarProps) {
  return (
    <SidebarWrapper isOpen={isOpen}>
      <Link to={"/events/active"} style={{ textDecoration: "none" }}>
        <Logo>Voyagers</Logo>
      </Link>
      <User username="Guest" imagePath={UserTestImg} />
      <Navbar />
      <ButtonCloseSidebar onClick={onCloseSidebar}/>
    </SidebarWrapper>
  )
}
