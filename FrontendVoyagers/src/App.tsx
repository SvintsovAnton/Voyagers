import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { profile, selectIsAuthenticated } from "store/redux/auth/authSlice"
import { useEffect, useState } from "react"
import { selectUser } from "store/redux/auth/authSlice"
import Sidebar from "components/Sidebar/Sidebar"
import SidebarHidden from "components/SidebarHidden/SidebarHidden"
import Home from "pages/Home/Home"
import Profile from "pages/Profile/Profile"
import MyEvents from "pages/MyEvents/MyEvents"
import History from "pages/History/History"
import Settings from "pages/Settings/Settings"
import Info from "pages/Info/Info"
import About from "pages/About/About"
import Signup from "pages/Signup/Signup"
import Login from "pages/Login/Login"
import ChangePassword from "pages/ChangePassword/ChangePassword"
import SetNewPassword from "pages/SetNewPassword/SetNewPassword"
import PageNotFound from "pages/PageNotFound/PageNotFound"
export default function App() {
  const isAuthorized = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(profile())
  }, [dispatch, isAuthorized])

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const user = useAppSelector(selectUser)
  function handleCloseSidebar() {
    setSidebarOpen(isOpen => !isOpen)
  }
  return (
    <BrowserRouter>
      {user &&
        (sidebarOpen ? (
          <Sidebar isOpen={sidebarOpen} onCloseSidebar={handleCloseSidebar} />
        ) : (
          <SidebarHidden
            isOpen={!sidebarOpen}
            onCloseSidebar={handleCloseSidebar}
          />
        ))}
      <Routes>
        <Route path="/" element={<Navigate to="/events/active" />} />
        <Route path="/events/active" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events/myevents" element={<MyEvents />} />
        <Route path="/events/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/info" element={<Info />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element="CREATE EVENT" />
        <Route path="/users/register" element={<Signup />} />
        <Route path="/info/termsofuse" element="Terms Of Use" />
        <Route path="/info/privacypolicy" element="Privacy Policy" />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/login/changepassword" element={<ChangePassword />} />
        <Route path="/auth/login/setnewpassword" element={<SetNewPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
