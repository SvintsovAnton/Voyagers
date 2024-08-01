import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const ChangePasswordPageWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tertiaryGrey};
`

export const ChangePasswordFormWrapper = styled.div`
  display: flex;
  overflow: auto;
  min-width: 60vw;
  height: 70vh;
  border-radius: 50px;
  background-color: ${colors.primaryGrey};
`

export const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 500px;
  padding: 0px 80px;
  border-right: 7px solid white;
`

export const ChangePasswordHeader = styled.h1`
  padding-top: 50px;
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
`

export const DontHaveAnAccount = styled.p`
  padding-bottom: 20px;
  font-weight: 800;
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
`

export const Signup = styled.a`
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
`

export const ButtonContainer = styled.div`
  margin-top: 30px;
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-family: "Montserrat";
`
