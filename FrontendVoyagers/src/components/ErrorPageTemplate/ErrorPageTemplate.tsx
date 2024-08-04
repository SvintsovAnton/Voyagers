import {
  ErrorPageTemplateWrapper,
  ErrorPageTemplateContainer,
  ErrorType,
  Description,
} from "./styles";
import ErrorPageTemplateProps from "./types";
const ErrorPageTemplate: React.FC<ErrorPageTemplateProps> = ({ errorType, description }) => {
  return (
    <ErrorPageTemplateWrapper>
      <ErrorPageTemplateContainer>
        <ErrorType>{errorType}</ErrorType>
        <Description>{description}</Description>
      </ErrorPageTemplateContainer>
    </ErrorPageTemplateWrapper>
  );
};
export default ErrorPageTemplate;