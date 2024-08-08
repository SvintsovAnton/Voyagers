import styled from "@emotion/styled"

export const SidebarHiddenWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 30px;
  background-color: white;
  border-radius: 0px 80px 80px 0px;
  z-index: 10001;
  transition: all 0.3s ease;
  transform: ${props => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  }
`
