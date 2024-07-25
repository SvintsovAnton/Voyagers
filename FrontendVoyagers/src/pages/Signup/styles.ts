import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const SignupPageWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tertiaryGrey};
`

export const SignupFormWrapper = styled.div`
  display: flex;
  overflow: auto;
  min-width: 60vw;
  height: 70vh;
  border-radius: 50px;
  background-color: ${colors.primaryGrey};
`

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 500px;
  padding: 0px 80px;
  border-right: 7px solid white;
`

export const SignupHeader = styled.h1`
  padding-top: 30px;
  font-weight: 800;
  color: white;
  font-family: "Montserrat";
`

export const AlreadyHaveAnAccount = styled.p`
  color: white;
  font-family: "Montserrat";
  padding-bottom: 15px;
`

export const Login = styled.a`
  color: white;
  font-family: "Montserrat";
`

export const FirstLastNameContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`

export const TelAndGenderContainer = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  gap: 24px;
`

export const Agreement = styled.p`
  color: white;
  font-family: "Montserrat";
  margin: 20px;
  font-size: 14px;
`

export const TermsOfUse = styled.a`
  color: white;
  font-family: "Montserrat";
`

export const PrivacyPolicy = styled.a`
  color: white;
  font-family: "Montserrat";
`

export const ButtonContainer = styled.div`
  display: flex;
  width: fit-content;
  min-height: 48px;
  border-radius: 10px;
  &:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(1px);
  }
`

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`

export const Title = styled.a`
  display: flex;
  font-size: 80px;
  text-decoration: none;
  font-family: "Pacifico";
  letter-spacing: 4px;
  color: ${colors.secondaryBlue};
`

export const Greetings = styled.p`
  color: white;
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 20px;
`
