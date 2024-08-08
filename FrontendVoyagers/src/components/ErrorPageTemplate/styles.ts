import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const ErrorPageTemplateWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ErrorPageTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  min-width: 50vw;
  height: 20vh;
  gap: 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, ${colors.secondaryBlue}, ${colors.primaryRed});
`

export const ErrorType = styled.h1`
  font-family: "Montserrat";
  font-size: 56px;
  letter-spacing: 2px;
  color: ${colors.primaryRed};
`

export const Description = styled.p`
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 20px;
  color: ${colors.secondaryGrey};
`