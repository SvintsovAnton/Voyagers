import ButtonPrimaryNavbar from "components/Buttons/ButtonPrimaryNavbar/ButtonPrimaryNavbar"
import { NavbarHiddenComponent } from "./styles"

import UserIcon from "assets/user-icon.svg"
import EventsIcon from "assets/events-icon.svg"
import HistoryIcon from "assets/history-icon.svg"
import SettingsIcon from "assets/settings-icon.svg"
import InfoIcon from "assets/info-icon.svg"
import AboutIcon from "assets/about-icon.svg"

export default function NavbarHidden() {
  return (
    <NavbarHiddenComponent>
      <ButtonPrimaryNavbar src={UserIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar src={EventsIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar src={HistoryIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar src={SettingsIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar src={InfoIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar src={AboutIcon}></ButtonPrimaryNavbar>
    </NavbarHiddenComponent>
  )
}
