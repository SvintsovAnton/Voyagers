import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const HeaderBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  margin: 15px;
`

export const SearchBarContainer = styled.div`
  display: flex;
  height: 10vh;
  width: 35vw;
  margin-left: 80px;
`

export const GreeetingsContainer = styled.div`
display: flex;
align-items: center;
width: fit-content;
height: fit-content;
gap: 40px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 30px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-height: 48px;
  outline: none;
  border: none;
  border-radius: 14px;
  background-color: ${colors.secondaryBlue};
  font-family: "Montserrat";
  font-weight: 800;
  padding: 0px 30px;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    background-color: ${colors.tertiaryBlue};
  }
  &:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
  }
`
