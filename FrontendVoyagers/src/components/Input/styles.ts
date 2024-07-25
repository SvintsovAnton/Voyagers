import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const InputLabel = styled.label`
  font-size: 16px;
  font-family: "Montserrat";
  margin-left: 4px;
  color: white;
`

export const InputComponent = styled.input`
  width: 100%;
  padding: 8px;
  outline: none;
  border-radius: 14px;
  font-size: 16px;
  border: 2px solid ${colors.secondaryGrey};
  background-color: transparent;
  font-family: "Montserrat";
  color: white;
  &:hover {
    border-color: ${colors.tertiaryGrey};
  }
`

export const IconContainer = styled.img`
  display: flex;
  flex-direction: row-reverse;
  margin: 28px 0px 0px 407px;
  width: 10%;
  height: 30px;
  position: absolute;
  cursor: pointer;
`

export const ErrorContainer = styled.div`
  font-size: 12px;
  color: red;
  height: 6px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 4px;
  width: 100%;
  position: relative;
`
