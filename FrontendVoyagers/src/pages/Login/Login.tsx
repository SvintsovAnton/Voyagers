import { useFormik } from "formik"
import { useAppDispatch } from "store/hooks"
import { usersLoginSliceActions } from "store/redux/usersLogin/usersLoginSlice"

import Button from "components/Button/Button"
import Input from "components/Input/Input"

import {
  LoginPageWrapper,
  LoginFormWrapper,
  LoginForm,
  LoginHeader,
  DontHaveAnAccount,
  Signup,
  ForgotPassword,
  ButtonContainer,
  RightSide,
  Title,
  Greetings,
} from "./styles"

export default function Login() {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      if (!!values.email && !!values.password) {
        dispatch(usersLoginSliceActions.authUser(values))
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
          />
          <Input
            id="password"
            name="password"
            label="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <ForgotPassword href="/auth/login/changepassword">forgot password?</ForgotPassword>
          <ButtonContainer><Button name="LOG IN" type="submit"/></ButtonContainer>
        </LoginForm>
        <RightSide>
          <h2>
            <Title href="/auth/login">Voyagers</Title>
          </h2>
          <Greetings>Welcome to VOYAGERS!</Greetings>
        </RightSide>
      </LoginFormWrapper>
    </LoginPageWrapper>
  )
}
