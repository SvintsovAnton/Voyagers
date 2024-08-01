import styled from "@emotion/styled"

export const UserComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
  gap: 5px;
  padding: 5px 20px;
  border-radius: 15px;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  }
  &:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
    transform: translateY(1px);
  }
`

export const UserImage = styled.img`
  height: 110px;
  border-radius: 50%;
`

export const Username = styled.h2`
  font-size: 32px;
  font-weight: 600;
  font-family: "Montserrat";
`
