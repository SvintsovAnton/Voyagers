import { Button, Header, User } from "components"
import { SettingsWrapper, UserContainer, ButtonsContainer } from "./styles"
import { UserTestImg } from "assets/index"
export default function Settings() {
  return (
    <SettingsWrapper>
      <Header></Header>
      <UserContainer>
        <User username={"Guest"} imagePath={UserTestImg} />
      </UserContainer>
      <ButtonsContainer>
        <Button name={"CHANGE PHOTO"} />
        <Button name={"CHANGE PERSONAL DATA"} />
        <Button name={"CHANGE PASSWORD"} />
      </ButtonsContainer>
    </SettingsWrapper>
  )
}
