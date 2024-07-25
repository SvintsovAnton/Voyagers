import { useState } from "react"
// import { useEffect } from "react"

import { useFormik } from "formik"

import { useAppDispatch } from "store/hooks"
import { usersRegisterSliceActions } from "store/redux/usersRegister/usersRegisterSlice"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import InputCheckbox from "components/InputCheckbox/InputCheckbox"

import {
  SignupPageWrapper,
  SignupFormWrapper,
  SignupForm,
  SignupHeader,
  AlreadyHaveAnAccount,
  Login,
  FirstLastNameContainer,
  TelAndGenderContainer,
  Agreement,
  TermsOfUse,
  PrivacyPolicy,
  ButtonContainer,
  RightSide,
  Title,
  Greetings,
} from "./styles"

export default function Signup() {
  // useEffect(() => {fetch("/api/users/register")}, [])
  const dispatch = useAppDispatch()
  const [selectedGender, setSelectedGender] = useState("")
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      phone: "",
      photo: "",
      gender: { id: selectedGender },
    },
    onSubmit: values => {
      if (
        !!values.firstName &&
        !!values.lastName &&
        !!values.dateOfBirth &&
        !!values.email &&
        !!values.password &&
        !!values.phone &&
        // !!values.photo &&
        !!values.gender
      ) {
        dispatch(usersRegisterSliceActions.addUser(values))
      }
    },
  })

  const handleGenderChange = (id: string) => {
    setSelectedGender(id)
    formik.setFieldValue("gender", { id })
  }

  return (
    <SignupPageWrapper>
      <SignupFormWrapper>
        <SignupForm onSubmit={formik.handleSubmit}>
          <SignupHeader>Sign up</SignupHeader>
          <AlreadyHaveAnAccount>
            Already have an account? <Login href="/auth/login">Login</Login>
          </AlreadyHaveAnAccount>
          {/* <Input
              id="photo"
              name="photo"
              label="photo"
              value={formik.values.photo}
              onChange={formik.handleChange}
            /> */}
          <Input
            id="email"
            name="email"
            label="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FirstLastNameContainer>
            <Input
              id="firstName"
              name="firstName"
              label="firstname"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <Input
              id="lastName"
              name="lastName"
              label="lastname"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </FirstLastNameContainer>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            label="date of birth"
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
          />
          <TelAndGenderContainer>
            <Input
              id="phone"
              name="phone"
              label="tel."
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            <InputCheckbox
              id="genderMan"
              name="gender"
              label="M"
              checked={selectedGender === "1"}
              onChange={() => handleGenderChange("1")}
            />
            <InputCheckbox
              id="genderWoman"
              name="gender"
              label="W"
              checked={selectedGender === "2"}
              onChange={() => handleGenderChange("2")}
            />
            <InputCheckbox
              id="genderOther"
              name="gender"
              label="Other"
              checked={selectedGender === "3"}
              onChange={() => handleGenderChange("3")}
            />
          </TelAndGenderContainer>
          <Input
            id="password"
            name="password"
            label="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Agreement>
            *by creating an account I agree to the{" "}
            <TermsOfUse href="/info/termsofuse">terms of use</TermsOfUse> and{" "}
            <PrivacyPolicy href="/info/privacypolicy">privacy policy</PrivacyPolicy>
            <InputCheckbox
              id="termsofuseandprivacypolicy"
              name="termsofuseandprivacypolicy"
              onChange={formik.handleChange}
            />
          </Agreement>
          <ButtonContainer>
            <Button name="CREATE AN ACCOUNT" type="submit" />
          </ButtonContainer>
        </SignupForm>
        <RightSide>
          <h2>
            <Title href="/users/register">Voyagers</Title>
          </h2>
          <Greetings>Welcome to VOYAGERS!</Greetings>
        </RightSide>
      </SignupFormWrapper>
    </SignupPageWrapper>
  )
}
