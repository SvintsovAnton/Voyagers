import { Link } from "react-router-dom"
import { RightSide, Title, Greetings } from "./styles"
import { FormRightSideTemplateProps } from "./types"
export default function FormRightSideTemplate({title = "Voyagers",
  greetingsMessage = "Welcome back to VOYAGERS!",
}: FormRightSideTemplateProps) {
  return (
    <RightSide>
      <Link to={"/events/active"} style={{ textDecoration: "none" }}>
        <Title>{title}</Title>
      </Link>
      <Greetings>{greetingsMessage}</Greetings>
    </RightSide>
  )
}
