import { ErrorPageTemplate } from "components/index"
export default function PageNotFound() {
  return (
    <ErrorPageTemplate errorType="ERROR 404" description="Page Not Found" />
  )
}
