import { useState } from "react"
import { ButtonPrimaryNavbar } from "components/index"
import { NavbarHiddenComponent } from "./styles"
import {
  ProfileIcon,
  MyEventsIcon,
  HistoryIcon,
  SettingsIcon,
  InfoIcon,
  AboutIcon,
} from "assets/index"
export default function NavbarHidden() {
  const [selectedButton, setSelectedButton] = useState(null)
  const handleButtonClick = (index: any) => {
    setSelectedButton(index)
  }
  return (
    <NavbarHiddenComponent>
      <ButtonPrimaryNavbar
        path="/profile"
        src={ProfileIcon}
        isSelected={selectedButton === 2}
        onClick={() => handleButtonClick(2)}
      />
      <ButtonPrimaryNavbar
        path="/events/myevents"
        src={MyEventsIcon}
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
