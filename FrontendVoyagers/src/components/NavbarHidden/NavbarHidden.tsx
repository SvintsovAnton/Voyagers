import { useState } from "react"
import ButtonPrimaryNavbar from "components/Buttons/ButtonPrimaryNavbar/ButtonPrimaryNavbar"
import { NavbarHiddenComponent } from "./styles"
import UserIcon from "assets/user-icon.svg"
import EventsIcon from "assets/events-icon.svg"
import HistoryIcon from "assets/history-icon.svg"
import SettingsIcon from "assets/settings-icon.svg"
import InfoIcon from "assets/info-icon.svg"
import AboutIcon from "assets/about-icon.svg"
export default function NavbarHidden() {
  const [selectedButton, setSelectedButton] = useState(null)
  const handleButtonClick = (index: any) => {
    setSelectedButton(index)
  }
  return (
    <NavbarHiddenComponent>
      <ButtonPrimaryNavbar
        path="/profile"
        src={UserIcon}
        isSelected={selectedButton === 2}
        onClick={() => handleButtonClick(2)}
      />
      <ButtonPrimaryNavbar
        path="/events/myevents"
        src={EventsIcon}
        isSelected={selectedButton === 3}
        onClick={() => handleButtonClick(3)}
      />
      <ButtonPrimaryNavbar
        path="/events/history"
        src={HistoryIcon}
        isSelected={selectedButton === 4}
        onClick={() => handleButtonClick(4)}
      />
      <ButtonPrimaryNavbar
        path="/settings"
        src={SettingsIcon}
        isSelected={selectedButton === 5}
        onClick={() => handleButtonClick(5)}
      />
      <ButtonPrimaryNavbar
        path="/info"
        src={InfoIcon}
        isSelected={selectedButton === 6}
        onClick={() => handleButtonClick(6)}
      />
      <ButtonPrimaryNavbar
        path="/about"
        src={AboutIcon}
        isSelected={selectedButton === 7}
        onClick={() => handleButtonClick(7)}
      />
    </NavbarHiddenComponent>
  )
}
