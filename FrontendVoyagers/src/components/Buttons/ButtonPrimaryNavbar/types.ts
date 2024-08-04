type ButtonTypes = "button" | "submit" | "reset"

export default interface ButtonPrimaryNavbarProps {
  name?: string
  type?: ButtonTypes
  path: string
  src: string
  isSelected: boolean
  onClick?: () => void
  buttonComponentStyle?: React.CSSProperties | undefined
}
