type ButtonTypes = "button" | "submit" | "reset"

export default interface ButtonPrimaryNavbarProps {
  name?: string
  type?: ButtonTypes
  path: string
  src: string
}
