import { useState } from "react"

import Sidebar from "components/Sidebar/Sidebar"
import SidebarHidden from "components/SidebarHidden/SidebarHidden"

import { PageWrapper } from "./styles"

export default function MainPageTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  function handleCloseSidebar() {
    setSidebarOpen(isOpen => !isOpen)
  }
  return (
    <PageWrapper>
      {sidebarOpen ? (
        <Sidebar onCloseSidebar={handleCloseSidebar} />
      ) : (
        <SidebarHidden
          onCloseSidebar={handleCloseSidebar}
        />
      )}
    </PageWrapper>
  )
}
