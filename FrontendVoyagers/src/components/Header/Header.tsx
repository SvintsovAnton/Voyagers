import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "store/hooks"
import { logout } from "store/redux/auth/authSlice"
import { useAppSelector } from "store/hooks"
import { selectUser } from "store/redux/auth/authSlice"
import { Title, Greetings } from "components/FormRightSideTemplate/styles"
import { InputSearch, Button, ButtonPrimaryNavbar } from "components/index"
import {
  HeaderBarContainer,
  SearchBarContainer,
  GreeetingsContainer,
  ButtonsContainer,
  ButtonContainer,
} from "./styles"
import { SearchIcon, LocationIcon, CreateEventIcon } from "assets/index"
export default function Header() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDispatch = () => {
    dispatch(logout())
    navigate("/events/active")
  }
  const [selectedButton, setSelectedButton] = useState(null)
  const handleButtonClick = (index: any) => {
    setSelectedButton(index)
  }
  return (
    <HeaderBarContainer>
      <SearchBarContainer>
        <InputSearch
          id="Searchevents"
          name="Searchevents"
          placeholder="Search events"
          src={SearchIcon}
          alt="search"
          value=""
          onChange={() => {}}
          inputComponentStyle={{
            borderTopLeftRadius: 14,
            borderBottomLeftRadius: 14,
          }}
        />
        <InputSearch
          id="Cityorzipcode"
          name="Cityorzipcode"
          placeholder="City or zip code"
          src={LocationIcon}
          alt="location"
          value=""
          onChange={() => {}}
          inputComponentStyle={{
            borderTopRightRadius: 14,
            borderBottomRightRadius: 14,
          }}
        />
      </SearchBarContainer>
      {!user && (
        <GreeetingsContainer>
          <Greetings
            style={{ fontFamily: "Pacifico", fontSize: 56, letterSpacing: 5 }}
          >
            Welcome to
          </Greetings>
          <Title style={{ fontSize: 56 }}>Voyagers</Title>
        </GreeetingsContainer>
      )}
      <ButtonsContainer>
        {!user && (
          <Link
            to={"/auth/login"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ButtonContainer style={{ backgroundColor: "white" }}>
              LOG IN
            </ButtonContainer>
          </Link>
        )}
        {!user && (
          <Link
            to={"/users/register"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ButtonContainer>SIGN IN</ButtonContainer>
          </Link>
        )}
        {user && (
          <ButtonPrimaryNavbar
            path="/events"
            src={CreateEventIcon}
            isSelected={selectedButton === 8}
            onClick={() => handleButtonClick(8)}
            buttonComponentStyle={{ padding: 4, gap: 0 }}
          />
        )}
        {user && <Button name={"LOG OUT"} onClick={handleDispatch} />}
      </ButtonsContainer>
    </HeaderBarContainer>
  )
}
