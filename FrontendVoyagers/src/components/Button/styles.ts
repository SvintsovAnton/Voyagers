import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const ButtonComponent = styled.button`
  width: 100%;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: ${colors.secondaryBlue};
  color: white;
  font-size: 14px;
  font-family: "Montserrat";
  font-weight: 600;
  padding: 0px 30px;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.tertiaryBlue};
    color: white;
  }
`
