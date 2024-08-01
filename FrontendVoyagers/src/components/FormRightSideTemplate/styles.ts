import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`

export const Title = styled.h2`
  display: flex;
  font-size: 85px;
  font-family: "Pacifico";
  letter-spacing: 5px;
  color: ${colors.secondaryBlue};
`

export const Greetings = styled.p`
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 20px;
  color: ${colors.secondaryGrey};
`