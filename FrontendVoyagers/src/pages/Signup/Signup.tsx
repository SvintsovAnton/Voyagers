import { useState } from "react"
// import { useEffect } from "react"

import { useFormik } from "formik"
import * as Yup from "yup"
import { differenceInYears } from "date-fns"

import { useAppDispatch } from "store/hooks"
import { usersRegisterSliceActions } from "store/redux/usersRegister/usersRegisterSlice"

import FormRightSideTemplate from "components/FormRightSideTemplate/FormRightSideTemplate"
import Button from "components/Buttons/Button/Button"
import Input from "components/Inputs/Input/Input"
import InputCheckbox from "components/Inputs/InputCheckbox/InputCheckbox"

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
} from "./styles"

export default function Signup() {
  const schema = Yup.object().shape({
    firstName: Yup.string().trim().required("*first name is required").min(3),
    lastName: Yup.string().trim().required("*last name is required").min(3),
    dateOfBirth: Yup.date()
      .required("*date of birth is required")
      .test(
        "is-18",
        "*You must be at least 18 years old",
        value => differenceInYears(new Date(), new Date(value)) >= 18,
      ),
    email: Yup.string()
      .trim()
      .email("*enter a valid email")
      .required("*email is required")
      .min(8)
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "*enter a valid email",
      ),
    password: Yup.string()
      .trim()
      .required("*password is required")
      .min(8)
      .matches(/[a-zA-Z]/, "*password must contain at least one letter")
      .matches(/\d/, "*password must contain at least one number")
      .matches(/[A-Z]/, "*password must contain at least one uppercase letter"),
    gender: Yup.object()
      .shape({
        id: Yup.string().required("*any of gender is required"),
      })
      .required(),
    termsofuseandprivacypolicy: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms"),
  })

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
      termsofuseandprivacypolicy: false,
    },
    validationSchema: schema,
    onSubmit: values => {
      if (
        !!values.firstName &&
        !!values.lastName &&
        !!values.dateOfBirth &&
        !!values.email &&
        !!values.password &&
        !!values.gender &&
        !!values.termsofuseandprivacypolicy
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
          <Input
            id="email"
            name="email"
            label="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <FirstLastNameContainer>
            <Input
              id="firstName"
              name="firstName"
              label="firstname"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.errors.firstName}
            />
            <Input
              id="lastName"
              name="lastName"
              label="lastname"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.errors.lastName}
            />
          </FirstLastNameContainer>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            label="date of birth"
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            error={formik.errors.dateOfBirth}
          />
          <TelAndGenderContainer>
            <Input
              id="phone"
              name="phone"
              label="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.errors.phone}
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
              error={formik.errors.gender?.id}
            />
          </TelAndGenderContainer>
          <Input
            id="password"
            name="password"
            label="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Agreement>
            *by creating an account I agree to the{" "}
            <TermsOfUse href="/info/termsofuse">terms of use</TermsOfUse> and{" "}
            <PrivacyPolicy href="/info/privacypolicy">
              privacy policy
            </PrivacyPolicy>
            <InputCheckbox
              id="termsofuseandprivacypolicy"
              name="termsofuseandprivacypolicy"
              onChange={formik.handleChange}
            />
          </Agreement>
          <Button name="CREATE AN ACCOUNT" type="submit" />
        </SignupForm>
        <FormRightSideTemplate path={"/users/register"} />
      </SignupFormWrapper>
    </SignupPageWrapper>
  )
}
