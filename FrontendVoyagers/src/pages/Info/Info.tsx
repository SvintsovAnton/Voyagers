import { Header } from "components"
import {
  InfoWrapper,
  MainContainer,
  DescriptionContainer,
  Title,
} from "./styles"
export default function Info() {
  return (
    <InfoWrapper>
      <Header></Header>
      <MainContainer>
        <DescriptionContainer>
          <Title>Welcome to Voyagers! 🌍</Title>
          Welcome to an application designed to bring people together from
          around the world to create exciting events that we can realize
          together!
        </DescriptionContainer>
        <DescriptionContainer>
          <Title>Why Use Voyagers? 👫</Title>
          Have you ever wanted to go somewhere but didn't know where to go or
          had no one to go with? Or maybe you knew where to go but had no one
          nearby to join you. With our app, you can always find companions for
          any event.
        </DescriptionContainer>
        <DescriptionContainer>
          <Title>How It Works 📅</Title>
          Simply register your event or join existing ones and enjoy the journey
          and new friendships.
        </DescriptionContainer>
        <Title>Happy Travels and New Encounters! 🎉</Title>
      </MainContainer>
    </InfoWrapper>
  )
}
