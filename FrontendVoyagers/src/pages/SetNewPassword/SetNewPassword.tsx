import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppDispatch } from "store/hooks"

import FormRightSideTemplate from "components/FormRightSideTemplate/FormRightSideTemplate"
import Button from "components/Buttons/Button/Button"
import Input from "components/Inputs/Input/Input"

import {
  SetNewPasswordPageWrapper,
  SetNewPasswordFormWrapper,
  SetNewPasswordForm,
  SetNewPasswordHeader,
  ButtonContainer,
} from "./styles"

export default function SetNewPassword() {
  const schema = Yup.object().shape({
    password: Yup.string().required("password is required"),
  })

  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (!!values.password) {
        // dispatch(usersSetNewPasswordSliceActions.authUser(values))
      }
    },
  })

  return (
    <SetNewPasswordPageWrapper>
      <SetNewPasswordFormWrapper>
        <SetNewPasswordForm onSubmit={formik.handleSubmit}>
          <SetNewPasswordHeader>Change Password</SetNewPasswordHeader>
          <Input
            id="password"
            name="password"
            label="new password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Input
            id="password"
            name="password"
            label="confirm new password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <ButtonContainer>
            <Button name="CHANGE PASSWORD" type="submit" />
          </ButtonContainer>
        </SetNewPasswordForm>
        <FormRightSideTemplate path="/auth/login/setnewpassword"></FormRightSideTemplate>
      </SetNewPasswordFormWrapper>
    </SetNewPasswordPageWrapper>
  )
}
