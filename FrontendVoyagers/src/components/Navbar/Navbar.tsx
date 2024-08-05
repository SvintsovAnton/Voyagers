import { useState } from "react"
import { ButtonPrimaryNavbar } from "components/index"
import { NavbarComponent } from "./styles"
import {
  ProfileIcon,
  MyEventsIcon,
  HistoryIcon,
  SettingsIcon,
  InfoIcon,
  AboutIcon,
} from "assets/index"
export default function Navbar() {
  const [selectedButton, setSelectedButton] = useState(null)
  const handleButtonClick = (index: any) => {
    setSelectedButton(index)
  }
  return (
    <NavbarComponent>
      <ButtonPrimaryNavbar
        name="Profile"
        path="/profile"
        src={ProfileIcon}
        isSelected={selectedButton === 2}
        onClick={() => handleButtonClick(2)}
      />
      <ButtonPrimaryNavbar
        name="My Events"
        path="/events/myevents"
        src={MyEventsIcon}
        isSelected={selectedButton === 3}
        onClick={() => handleButtonClick(3)}
      />
      <ButtonPrimaryNavbar
        name="History"
        path="/events/history"
        src={HistoryIcon}
        isSelected={selectedButton === 4}
        onClick={() => handleButtonClick(4)}
      />
      <ButtonPrimaryNavbar
        name="Settings"
        path="/settings"
        src={SettingsIcon}
        isSelected={selectedButton === 5}
        onClick={() => handleButtonClick(5)}
      />
      <ButtonPrimaryNavbar
        name="Info"
        path="/info"
        src={InfoIcon}
        isSelected={selectedButton === 6}
        onClick={() => handleButtonClick(6)}
      />
      <ButtonPrimaryNavbar
        name="About"
        path="/about"
        src={AboutIcon}
        isSelected={selectedButton === 7}
        onClick={() => handleButtonClick(7)}
      />
    </NavbarComponent>
  )
}
