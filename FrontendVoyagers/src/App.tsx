import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { profile, selectIsAuthenticated } from "store/redux/auth/authSlice"
import { useEffect, useState } from "react"
import { selectUser } from "store/redux/auth/authSlice"
import { Sidebar, SidebarHidden } from "components/index"
import {
  Home,
  Profile,
  MyEvents,
  History,
  Settings,
  Info,
  About,
  CreateEvent,
  Signup,
  Login,
  ChangePassword,
  SetNewPassword,
  PageNotFound,
} from "pages/index"
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
        <Route path="/events" element={<CreateEvent />} />
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
