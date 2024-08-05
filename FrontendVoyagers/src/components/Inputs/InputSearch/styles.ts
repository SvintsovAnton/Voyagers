import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const InputSearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const InputSearchComponent = styled.input`
  outline: none;
  padding-left: 40px;
  width: 100%;
  height: 60px;
  border: 1px solid ${colors.tertiaryGrey};
  font-size: 20px;
  font-family: "Montserrat";
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.1),
    0 6px 20px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease;
  &:hover {
    border-color: grey;
  }
  &:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
    transform: translateY(1px);
  }
`

export const IconContainer = styled.img`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  height: fit-content;
  width: 24px;
  z-index: 10000;
`
