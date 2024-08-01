import styled from "@emotion/styled"

import { colors } from "styles/colors"

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
  width: 65px;
  height: 16px;
  margin-left: 15px;
`

export const InputCheckboxContainer = styled.div`
  display: inline-flex;
`
