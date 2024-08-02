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
      <ButtonPrimaryNavbar path="/profile" src={UserIcon} ></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar path="/events/active/loggedin" src={EventsIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar path="/events?archive=true" src={HistoryIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar path="/settings/loggedin" src={SettingsIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar path="/info" src={InfoIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar path="/about" src={AboutIcon}></ButtonPrimaryNavbar>
    </NavbarHiddenComponent>
  )
}
