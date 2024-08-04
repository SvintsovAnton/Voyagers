import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppDispatch } from "store/hooks"
import FormRightSideTemplate from "components/FormRightSideTemplate/FormRightSideTemplate"
import Button from "components/Buttons/Button/Button"
import Input from "components/Inputs/Input/Input"
import {
  ChangePasswordPageWrapper,
  ChangePasswordFormWrapper,
  ChangePasswordForm,
  ChangePasswordHeader,
  DontHaveAnAccount,
  Signup,
  ButtonContainer,
  ModalOverlay,
  ModalContent,
} from "./styles"
import { Greetings } from "components/FormRightSideTemplate/styles"
export default function ChangePassword() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const schema = Yup.object().shape({
    email: Yup.string().required("email is required"),
  })
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (!!values.email) {
        // dispatch(usersChangePasswordSliceActions.authUser(values))
        setIsModalOpen(true)
      }
    },
  })
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <ChangePasswordPageWrapper>
      <ChangePasswordFormWrapper>
        <ChangePasswordForm onSubmit={formik.handleSubmit}>
          <ChangePasswordHeader>Change Password</ChangePasswordHeader>
          <DontHaveAnAccount>
            Don't have an account?{" "}
            <Signup href="/users/register">Signup</Signup>
          </DontHaveAnAccount>
          <Input
            id="email"
            name="email"
            label="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <ButtonContainer>
            <Button name="SEND ME A CODE" type="submit" />
          </ButtonContainer>
        </ChangePasswordForm>
        <FormRightSideTemplate />
      </ChangePasswordFormWrapper>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <Greetings>
              A confirmation has been sent to your email address.
            </Greetings>
            <ButtonContainer>
              <Button name="Close" onClick={closeModal} />
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </ChangePasswordPageWrapper>
  )
}
