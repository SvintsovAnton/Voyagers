import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { addHours, isBefore } from "date-fns"
import { useAppDispatch } from "store/hooks"
import { createEvent } from "store/redux/event/eventSlice"
import { useNavigate } from "react-router-dom"
import { FormRightSideTemplate, Button, Input } from "components/index"
import {
  CreateEventPageWrapper,
  CreateEventFormWrapper,
  CreateEventForm,
  CreateEventHeader,
  InputContainer,
  AddressDateTimeContainer,
} from "./styles"
export default function CreateEvent() {
  // const [showModal, setShowModal] = useState(false)
  // const [isNavigating, setIsNavigating] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const schema = Yup.object().shape({
    title: Yup.string().required().min(8),
    addressStart: Yup.string().required().min(3),
    startDateTime: Yup.string(),
    // .required()
    // .test(
    //   "is-future",
    //   "*Start date and time must be in the future and at least 24 hours from now",
    //   value => {
    //     const startDate = new Date(value)
    //     const now = new Date()
    //     const minimumDate = addHours(now, 24)
    //     return isBefore(now, startDate) && isBefore(minimumDate, startDate)
    //   },
    // ),
    addressEnd: Yup.string().required().min(3),
    endDateTime: Yup.string(),
    // .required()
    // .test(
    //   "is-future",
    //   "*End date and time must be after the start date and time",
    //   (value, context) => {
    //     const endDate = new Date(value)
    //     const startDate = new Date(context.parent.startdateandtime)
    //     return isBefore(startDate, endDate)
    //   },
    // ),
    cost: Yup.string().required().max(5),
    maximalNumberOfParticipants: Yup.string().required().max(2),
  })
  const formik = useFormik({
    initialValues: {
      title: "",
      addressStart: "",
      startDateTime: "",
      addressEnd: "",
      endDateTime: "",
      cost: "",
      maximalNumberOfParticipants: "",
    },
    validationSchema: schema,
    onSubmit: async values => {
      if (
        !!values.title &&
        !!values.addressStart &&
        !!values.startDateTime &&
        !!values.addressEnd &&
        !!values.endDateTime &&
        !!values.cost &&
        !!values.maximalNumberOfParticipants
      ) {
        try {
          await dispatch(createEvent(values))
            .unwrap()
            .then(data => {
              navigate(`/events/${data.id}`)
            })
        } catch (error) {
          formik.setErrors({ title: "Signup failed. Please try again." })
        }
      }
    },
  })
  return (
    <CreateEventPageWrapper>
      <CreateEventFormWrapper>
        <CreateEventForm onSubmit={formik.handleSubmit}>
          <CreateEventHeader>Create Event</CreateEventHeader>
          <InputContainer>
            <Input
              id="title"
              name="title"
              label="Title Of Event"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.errors.title}
            />
          </InputContainer>
          <AddressDateTimeContainer>
            <Input
              id="addressStart"
              name="addressStart"
              label="Start address"
              value={formik.values.addressStart}
              onChange={formik.handleChange}
              error={formik.errors.addressStart}
            />
            <Input
              id="startDateTime"
              name="startDateTime"
              label="Start date and time"
              // type="datetime-local"
              value={formik.values.startDateTime}
              onChange={formik.handleChange}
              error={formik.errors.startDateTime}
            />
          </AddressDateTimeContainer>
          <AddressDateTimeContainer>
            <Input
              id="addressEnd"
              name="addressEnd"
              label="End address"
              value={formik.values.addressEnd}
              onChange={formik.handleChange}
              error={formik.errors.addressEnd}
            />
            <Input
              id="endDateTime"
              name="endDateTime"
              label="End date and time"
              // type="datetime-local"
              value={formik.values.endDateTime}
              onChange={formik.handleChange}
              error={formik.errors.endDateTime}
            />
          </AddressDateTimeContainer>
          <InputContainer>
            <Input
              id="cost"
              name="cost"
              label="Participation price"
              type="number"
              value={formik.values.cost}
              onChange={formik.handleChange}
              error={formik.errors.cost}
            />
          </InputContainer>
          <InputContainer>
            <Input
              id="maximalNumberOfParticipants"
              name="maximalNumberOfParticipants"
              label="Max. number of participants"
              type="number"
              value={formik.values.maximalNumberOfParticipants}
              onChange={formik.handleChange}
              error={formik.errors.maximalNumberOfParticipants}
            />
          </InputContainer>
          <Button name="CREATE AN EVENT" type="submit" />
        </CreateEventForm>
        <FormRightSideTemplate
          title=""
          greetingsMessage=""
        ></FormRightSideTemplate>
      </CreateEventFormWrapper>
    </CreateEventPageWrapper>
  )
}
