import { useFormik } from "formik"
import * as Yup from "yup"

import { useAppDispatch } from "store/hooks"
import { usersLoginSliceActions } from "store/redux/usersLogin/usersLoginSlice"

import FormRightSideTemplate from "components/FormRightSideTemplate/FormRightSideTemplate"
import Button from "components/Buttons/Button/Button"
import Input from "components/Inputs/Input/Input"

import {
  LoginPageWrapper,
  LoginFormWrapper,
  LoginForm,
  LoginHeader,
  DontHaveAnAccount,
  Signup,
  ForgotPassword,
} from "./styles"
import { login } from "store/redux/auth/authSlice"

export default function Login() {
  const schema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  })

  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (!!values.email && !!values.password) {
        dispatch(login(values))
      }
    },
  })

  return (
    <LoginPageWrapper>
      <LoginFormWrapper>
        <LoginForm onSubmit={formik.handleSubmit}>
          <LoginHeader>Log in</LoginHeader>
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
          <Input
            id="password"
            name="password"
            label="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <ForgotPassword href="/auth/login/changepassword">
            forgot password?
          </ForgotPassword>
          <Button name="LOG IN" type="submit" />
        </LoginForm>
        <FormRightSideTemplate path="/auth/login"></FormRightSideTemplate>
      </LoginFormWrapper>
    </LoginPageWrapper>
  )
}
