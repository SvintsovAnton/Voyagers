import { BrowserRouter, Routes, Route } from "react-router-dom"

import Signup from "pages/Signup/Signup"
import Login from "pages/Login/Login"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events/active" element="Home" />
        <Route path="/users/register" element={<Signup />} />
        <Route path="/info/termsofuse" element="Terms Of Use" />
        <Route path="/info/privacypolicy" element="Privacy Policy" />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/login/changepassword" element="Change Password" />
        <Route path="/auth/login/newpassword" element="Set New Password" />
        <Route path="*" element="Page Not Found" />
      </Routes>
    </BrowserRouter>
  )
}
