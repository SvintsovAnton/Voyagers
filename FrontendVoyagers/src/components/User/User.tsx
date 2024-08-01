import { UserComponent, UserImage, Username } from "./styles"
import UserProps from "./types"

export default function User({ username, imagePath }: UserProps) {
  return (
    <UserComponent>
      <UserImage src={imagePath} alt="user-logo"></UserImage>
      <Username>{username}</Username>
    </UserComponent>
  )
}
