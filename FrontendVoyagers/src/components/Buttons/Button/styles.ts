import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const ButtonComponent = styled.button`
  width: fit-content;
  min-height: 48px;
  outline: none;
  border: none;
  border-radius: 14px;
  background-color: ${colors.secondaryBlue};
  color: white;
  font-size: 16px;
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
