import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const InputCheckboxContainer = styled.div`
  display: inline-flex;
  transition: all 0.1s ease;
`

export const InputCheckboxLabel = styled.label`
  font-weight: 800;
  font-family: "Montserrat";
  margin: 4px 0px 10px 0px;
  color: ${colors.secondaryGrey};
`

export const InputCheckboxComponent = styled.input`
  width: 20px;
  height: 20px;
`

export const ErrorContainer = styled.div`
  font-size: 12px;
  font-family: "Montserrat";
  font-weight: 600;
  color: ${colors.secondaryRed};
  transition: all 0.2s ease;
  width: 65px;
  height: 16px;
  margin-left: 15px;
`
