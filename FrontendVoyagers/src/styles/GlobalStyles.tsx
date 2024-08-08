import { Global, css } from "@emotion/react"
import { colors } from "./colors"

const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${colors.primaryBlue};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  li {
    margin: 0;
    padding: 0;
  }

  #root {
    display: flex;
    flex: 1;
    height: 100%;
    
  }
`

export default function GlobalStyles() {
  return <Global styles={globalStyles} />
}
