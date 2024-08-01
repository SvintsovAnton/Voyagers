type ButtonTypes = "button" | "submit" | "reset" | undefined

export default interface ButtonProps {
  name: string
  type?: ButtonTypes
  onClick?: () => void
}
