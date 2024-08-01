export default interface InputProps {
  id: string
  name: string
  label?: string
  type?: string
  value: string | readonly string[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: undefined | string
}
