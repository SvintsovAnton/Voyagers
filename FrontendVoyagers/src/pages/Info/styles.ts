import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: all 0.2 ease;
  justify-content: center;
  align-items: center;
`

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 75vw;
  height: 100vh;
  border: 1px solid black;
  border-radius: 50px;
  gap: 10px;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  transition: all 0.2 ease;
  font-size: 25px;
  font-family: "Montserrat";
  text-align: center;
  letter-spacing: 2px;
`

export const Title = styled.h2`
  font-size: 40px;
  font-family: "Pacifico";
  letter-spacing: 1px;
`
