import { Link } from "react-router-dom"
import { RightSide, Title, Greetings } from "./styles"
export default function FormRightSideTemplate() {
  return (
    <RightSide>
      <Link to={"/events/active"} style={{ textDecoration: "none" }}>
        <Title>Voyagers</Title>
      </Link>
      <Greetings>Welcome to VOYAGERS!</Greetings>
    </RightSide>
  )
}
