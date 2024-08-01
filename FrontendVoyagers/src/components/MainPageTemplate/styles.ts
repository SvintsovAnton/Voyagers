import styled from "@emotion/styled"
import { colors } from "styles/colors"

export const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: ${colors.primaryBlue};
`

// export const LeftBox = styled.div`
//   transition: width 0.2s ease;
//   width: ${props => (props.sidebarOpen ? '15%' : '5%')};
// `;

// export const RightBox = styled.div`
//   transition: width 0.2s ease;
//   width: ${props => (props.sidebarOpen ? '85%' : '95%')};
// `;