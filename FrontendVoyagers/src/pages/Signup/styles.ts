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
  height: 85vh;
  border-radius: 50px;
  background-color: ${colors.primaryGrey};
  /* background: url() no-repeat center center;
  background-size: cover; */
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
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
`

export const AlreadyHaveAnAccount = styled.p`
  padding-bottom: 20px;
  font-weight: 800;
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
`

export const Login = styled.a`
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
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
  font-weight: 800;
  font-family: "Montserrat";
  margin: 20px;
  font-size: 14px;
  color: ${colors.secondaryGrey};
`

export const TermsOfUse = styled.a`
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
`

export const PrivacyPolicy = styled.a`
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
`
