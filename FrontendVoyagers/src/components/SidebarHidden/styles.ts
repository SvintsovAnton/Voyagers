import styled from "@emotion/styled"

export const SidebarHiddenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  border-radius: 0px 50px 50px 0px;
  z-index: 10000;
  position: relative;
  &:hidden {
    width: 70px;
  }
`
