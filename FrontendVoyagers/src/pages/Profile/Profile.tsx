import { Header, User } from "components/index"
import { ProfileWrapper, InfoContainer, Title } from "./styles"
import { UserContainer } from "pages/Settings/styles"
import { UserTestImg } from "assets"
export default function Profile() {
  return (
    <ProfileWrapper>
      <Header></Header>
      <UserContainer>
        <User username={"Guest"} imagePath={UserTestImg} />
      </UserContainer>
      <InfoContainer>
        <Title>👤 Ben Ben</Title>
        <Title>📧 benAdmin@example.com</Title>
        <Title>📞 +123456789</Title>
        <Title>📅 1995-01-01</Title>
        <Title>⚧️ Male</Title>
      </InfoContainer>
    </ProfileWrapper>
  )
}
