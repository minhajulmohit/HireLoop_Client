import { SiteNavbar } from "@/components/layout/site-navbar"
import type { ReactNode } from "react"

const browseJobsLayoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SiteNavbar />
      {children}
    </>
  )
}

export default browseJobsLayoutPage
