import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: white;
  border-radius: 0px 50px 50px 0px;
  z-index: 10000;
  transition: all 0.2s ease-in;
  position: relative;
`

export const Logo = styled.h1`
  display: flex;
  font-size: 52px;
  font-family: "Pacifico";
  font-weight: 500;
  letter-spacing: 3px;
  color: ${colors.secondaryBlue};
  padding: 5px 20px;
  border-radius: 15px;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  }
  &:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
    transform: translateY(1px);
  }
`

export const ButtonCloseSidebar = styled.button`
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: ${colors.secondaryBlue};
  transition: all 0.2s ease;
  position: absolute;
  left: 100%;
  height: 60px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.tertiaryBlue};
  }
  &:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
  }
`
