import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchEventById } from "store/redux/event/api"
import { CreateEventDto } from "store/redux/event/types"
import {
  EventCardWrapper,
  EventCardContainer,
  TitleAndImageContainer,
  EventImage,
  DetailsCardWrapper,
  DetailsCardContainer,
  DetailsTitle,
  DetailsInfo,
  MapContainer,
  CommentsContainersWrapper,
  CommetsContainer,
  DetailsImage,
} from "./styles"
import { ErrorPageTemplate, Header, Map } from "components"
import { Title } from "pages/Profile/styles"
import {
  CreateEventBackground,
  DrivingCarImg,
  EuroIcon,
  LocationIcon,
  ParticipantsIcon,
  TimeIcon,
} from "assets"

export default function EventCard() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<CreateEventDto | null>(null)

  useEffect(() => {
    async function getEvent() {
      if (!id) return
      try {
        const eventData = await fetchEventById(id)
        setEvent(eventData)
      } catch (error) {
        console.error("Failed to fetch event:", error)
      }
    }
    getEvent()
  }, [id])

  if (!event) {
    return (
      <ErrorPageTemplate
        errorType={"Loading..."}
        description={"wait a second..."}
      ></ErrorPageTemplate>
    )
  }

  return (
    <EventCardWrapper>
      <Header />
      <EventCardContainer>
        <TitleAndImageContainer>
          <Title>{event.title}</Title>
          <EventImage src={DrivingCarImg} alt={event.title} />
          <DetailsTitle>
            <DetailsImage src={LocationIcon} />
            Description :
          </DetailsTitle>
          <DetailsInfo>
            {" - "}Join us for a thrilling trip to the mountains, where you'll enjoy
            stunning views, invigorating hikes, and exciting outdoor activities.
            Connect with nature, bond with friends, and create unforgettable
            memories amidst breathtaking scenery.
          </DetailsInfo>
        </TitleAndImageContainer>
        <DetailsCardWrapper>
          <DetailsCardContainer>
            <DetailsTitle>
              <DetailsImage src={LocationIcon} />
              Start Address:
            </DetailsTitle>
            <DetailsInfo>{event.addressStart}</DetailsInfo>
            <DetailsTitle>
              <DetailsImage src={LocationIcon} />
              End Address:
            </DetailsTitle>
            <DetailsInfo>{event.addressEnd}</DetailsInfo>
          </DetailsCardContainer>
          <DetailsCardContainer>
            <DetailsTitle>
              <DetailsImage src={TimeIcon} />
              From:
            </DetailsTitle>
            <DetailsInfo>{event.startDateTime}</DetailsInfo>
            <DetailsTitle>
              <DetailsImage src={TimeIcon} />
              To:
            </DetailsTitle>
            <DetailsInfo>{event.endDateTime}</DetailsInfo>
          </DetailsCardContainer>
          <MapContainer>
            <Map />
          </MapContainer>
          <DetailsCardContainer>
            <DetailsTitle>
              <DetailsImage src={EuroIcon} />
              Participation Price:
            </DetailsTitle>
            <DetailsInfo>{event.cost || "Free"} euro</DetailsInfo>
            <DetailsTitle>
              <DetailsImage src={ParticipantsIcon} />
              Max Participants:
            </DetailsTitle>
            <DetailsInfo>
              {event.maximalNumberOfParticipants || "Not specified"}
            </DetailsInfo>
          </DetailsCardContainer>
        </DetailsCardWrapper>
      </EventCardContainer>
      <DetailsTitle>Comments:</DetailsTitle>
      <CommentsContainersWrapper>
        <CommetsContainer>
          <DetailsTitle>Ben</DetailsTitle>
          <DetailsInfo>The trip was AWESOME!</DetailsInfo>
        </CommetsContainer>
        <CommetsContainer>
          <DetailsTitle>Sara</DetailsTitle>
          <DetailsInfo>I like it.</DetailsInfo>
        </CommetsContainer>
        <CommetsContainer>
          <DetailsTitle>Louis</DetailsTitle>
          <DetailsInfo>Commend it</DetailsInfo>
        </CommetsContainer>
        <CommetsContainer>
          <DetailsTitle>Clara</DetailsTitle>
          <DetailsInfo>
            I was there last week, my friends and I really liked it
          </DetailsInfo>
        </CommetsContainer>
      </CommentsContainersWrapper>
    </EventCardWrapper>
  )
}
