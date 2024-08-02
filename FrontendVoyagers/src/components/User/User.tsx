import { UserComponent, UserImage, Username } from "./styles"
import UserProps from "./types"

export default function User({
  username,
  imagePath,
  imageStyle,
  usernameStyle,
}: UserProps) {
  return (
    <UserComponent>
      <UserImage src={imagePath} alt="user-logo" style={imageStyle}></UserImage>
      <Username style={usernameStyle}>{username}</Username>
    </UserComponent>
  )
}
