import InputSearch from "components/Inputs/InputSearch/InputSearch"

import { HeaderBar, SearchBarContainer, ButtonsContainer } from "./styles"

import SearchIcon from "assets/search-icon.svg"
import LocationIcon from "assets/location-icon.svg"
import Button from "components/Buttons/Button/Button"
import { Link } from "react-router-dom"
import { useAppDispatch } from "store/hooks"
import { logout } from "store/redux/auth/authSlice"

export default function Searchbar() {
  const dispatch = useAppDispatch()

  const handleDispatch = () => {
    dispatch(logout())
  }

  return (
    <HeaderBar>
      <SearchBarContainer>
        <InputSearch
          id="Searchevents"
          name="Searchevents"
          placeholder="Search events"
          src={SearchIcon}
          alt="search"
          value=""
          onChange={() => {}}
        />
        <InputSearch
          id="Cityorzipcode"
          name="Cityorzipcode"
          placeholder="City or zip code"
          src={LocationIcon}
          alt="location"
          value=""
          onChange={() => {}}
        />
      </SearchBarContainer>
      <ButtonsContainer>
        <Link to={"/auth/login"} style={{ textDecoration: "none" }}>
          LOG IN
        </Link>
        <Link to={"/users/register"} style={{ textDecoration: "none" }}>
          SIGN IN
        </Link>
        <Button name={"LOG OUT"} onClick={handleDispatch}></Button>
      </ButtonsContainer>
    </HeaderBar>
  )
}
