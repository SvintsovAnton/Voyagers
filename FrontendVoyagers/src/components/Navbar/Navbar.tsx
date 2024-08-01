import ButtonPrimaryNavbar from "components/Buttons/ButtonPrimaryNavbar/ButtonPrimaryNavbar"

import UserIcon from "assets/user-icon.svg"
import EventsIcon from "assets/events-icon.svg"
import HistoryIcon from "assets/history-icon.svg"
import SettingsIcon from "assets/settings-icon.svg"
import InfoIcon from "assets/info-icon.svg"
import AboutIcon from "assets/about-icon.svg"

import { NavbarComponent } from "./styles"

export default function Navbar() {
  return (
    <NavbarComponent>
      <ButtonPrimaryNavbar name="Profile" path="/profile" src={UserIcon} ></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar name="My Events" path="/events/active/loggedin" src={EventsIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar name="History" path="/events?archive=true" src={HistoryIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar name="Settings" path="/settings/loggedin" src={SettingsIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar name="Info" path="/info" src={InfoIcon}></ButtonPrimaryNavbar>
      <ButtonPrimaryNavbar name="About" path="/about" src={AboutIcon}></ButtonPrimaryNavbar>
    </NavbarComponent>
  )
}
