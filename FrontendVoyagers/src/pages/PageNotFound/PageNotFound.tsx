import ErrorPageTemplate from "components/ErrorPageTemplate/ErrorPageTemplate"
export default function PageNotFound() {
  return (
    <ErrorPageTemplate errorType="ERROR 404" description="Page Not Found" />
  )
}
