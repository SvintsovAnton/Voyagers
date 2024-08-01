import { Link } from "react-router-dom"

import { RightSide, Title, Greetings } from "./styles"

import FormRightSideTemplateProps from "./types"

const FormRightSideTemplate: React.FC<FormRightSideTemplateProps> = ({
  path,
}) => {
  return (
    <RightSide>
      <Link to={path} style={{ textDecoration: "none" }}>
        <Title>Voyagers</Title>
      </Link>
      <Greetings>Welcome to VOYAGERS!</Greetings>
    </RightSide>
  )
}

export default FormRightSideTemplate
