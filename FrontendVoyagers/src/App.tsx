import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "pages/Home/Home"
import Signup from "pages/Signup/Signup"
import Login from "pages/Login/Login"
import ChangePassword from "pages/ChangePassword/ChangePassword"
import SetNewPasswword from "pages/SetNewPassword/SetNewPassword"
import PageNotFound from "pages/PageNotFound/PageNotFound"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { profile, selectIsAuthenticated } from "store/redux/auth/authSlice"
import { useEffect } from "react"

export default function App() {

  const isAuthorized = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(profile())
  }, [dispatch, isAuthorized])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events/active" element={<Home />} />
        <Route path="/profile" element="Profile" />
        <Route path="/events/active/loggedin" element="My events"/>
        <Route path="/events?archive=true" element="History" />
        <Route path="/settings/loggedin" element="Settings" />
        <Route path="/info" element="Info" />
        <Route path="/about" element="Cohort 33E Co, Germany, Berlin" />
        <Route path="/users/register" element={<Signup />} />
        <Route path="/info/termsofuse" element="Terms Of Use" />
        <Route path="/info/privacypolicy" element="Privacy Policy" />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/login/changepassword" element={<ChangePassword />} />
        <Route path="/auth/login/setnewpassword" element={<SetNewPasswword />} />
        <Route path="/" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
