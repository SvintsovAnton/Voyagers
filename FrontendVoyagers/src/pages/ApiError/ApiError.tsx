import { ErrorPageTemplate } from "components/index"
export default function ApiError() {
  return (
    <ErrorPageTemplate
      errorType="API ERROR"
      description="Something went wrong with API data"
    />
  )
}
