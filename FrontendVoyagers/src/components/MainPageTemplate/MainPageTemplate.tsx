import { useState } from "react"

import Sidebar from "components/Sidebar/Sidebar"
import SidebarHidden from "components/SidebarHidden/SidebarHidden"
import Searchbar from "components/Searchbar/Searchbar"

import { PageWrapper } from "./styles"
import { useAppSelector } from "store/hooks"
import { selectUser } from "store/redux/auth/authSlice"

export default function MainPageTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const user = useAppSelector(selectUser)

  function handleCloseSidebar() {
    setSidebarOpen(isOpen => !isOpen)
  }
  return (
    <PageWrapper>
      {user &&
        (sidebarOpen ? (
          <Sidebar onCloseSidebar={handleCloseSidebar} />
        ) : (
          <SidebarHidden onCloseSidebar={handleCloseSidebar} />
        ))}
      <Searchbar />
    </PageWrapper>
  )
}
