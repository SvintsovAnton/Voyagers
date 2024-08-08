import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const EventCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`

export const EventCardContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 85%;
  gap: 50px;
  margin-bottom: 40px;
`

export const TitleAndImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
`

export const EventImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
`

export const DetailsCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 750px;
  border-radius: 40px 0px 40px 0px;
  background-color: ${colors.primaryWhite};
  padding: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`

export const DetailsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 5px;
`

export const DetailsImage = styled.img`
  width: 25px;
  height: 25px;
`

export const DetailsTitle = styled.p`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
  gap: 5px;
  letter-spacing: 0.5px;
`

export const DetailsInfo = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
`

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.primaryRed};
  border-radius: 15px;
  margin-bottom: 20px;
`

export const CommentsContainersWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 100%;
  gap: 20px;
  margin-top: 20px;
  border: 3px solid black;
  border-radius: 15px;
`

export const CommetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 10px;
  width: 30%;
  height: 160px;
  gap: 20px;
  margin: 20px;
  border: 2px solid black;
`
