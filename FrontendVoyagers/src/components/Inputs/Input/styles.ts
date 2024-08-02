import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 4px;
  width: 100%;
  position: relative;
`

export const InputLabel = styled.p`
  font-size: 18px;
  font-family: "Montserrat";
  font-weight: 800;
  margin-left: 4px;
  color: ${colors.secondaryGrey};
`

export const InputComponent = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 8px;
  outline: none;
  border-radius: 14px;
  font-size: 16px;
  border: 2px solid
    ${props => (props.error ? colors.secondaryRed : "transparent")};
  background-color: white;
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.2s ease;
  &:hover {
    border-color: grey;
  }
`

export const IconContainer = styled.img`
  display: flex;
  flex-direction: row-reverse;
  left: 90%;
  top: 55%;
  width: 10%;
  height: 20px;
  position: absolute;
  cursor: pointer;
`

export const ErrorContainer = styled.div`
  font-size: 12px;
  font-family: "Montserrat";
  font-weight: 600;
  color: ${colors.secondaryRed};
  height: 6px;
  margin-left: 15px;
`
