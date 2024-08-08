import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  transition: all 0.2 ease;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  transition: all 0.2 ease;
  font-size: 25px;
  font-family: "Montserrat";
  text-align: center;
  gap: 30px;
`

export const Title = styled.h2`
  font-size: clamp(1rem, 2vw, 2.5rem);
  letter-spacing: 1px;
  font-family: "Montserrat";
`
