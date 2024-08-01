import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const SetNewPasswordPageWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tertiaryGrey};
`

export const SetNewPasswordFormWrapper = styled.div`
  display: flex;
  overflow: auto;
  min-width: 60vw;
  height: 70vh;
  border-radius: 50px;
  background-color: ${colors.primaryGrey};
`

export const SetNewPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 500px;
  padding: 0px 80px;
  border-right: 7px solid white;
`

export const SetNewPasswordHeader = styled.h1`
  padding-top: 50px;
  font-family: "Montserrat";
  color: ${colors.secondaryGrey};
`

export const ButtonContainer = styled.div`
  margin-top: 30px;
`
