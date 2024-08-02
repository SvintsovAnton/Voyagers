export default interface InputSearchProps {
    id: string
    name: string
    type?: string
    placeholder: string
    src: string
    alt: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}