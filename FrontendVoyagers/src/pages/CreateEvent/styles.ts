import styled from "@emotion/styled"
import { CreateEventBackground } from "assets"

export const CreateEventPageWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const CreateEventFormWrapper = styled.div`
  display: flex;
  overflow: auto;
  min-width: 70vw;
  height: 90vh;
  border-radius: 50px;
  background-image: url(${CreateEventBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background: reverse;
`

export const CreateEventForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 500px;
  padding: 0px 80px;
  border-right: 7px solid white;
  gap: 20px;
`

export const CreateEventHeader = styled.h1`
  padding: 30px 0px;
  font-size: 40px;
  font-family: "Montserrat";
  color: white;
`
export const InputContainer = styled.div`
  display: flex;
  width: 100%;
`

export const AddressDateTimeContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-family: "Montserrat";
`
