import { useUser } from "../Login/session"
import { DashboardAdmin } from "./DashboardAdmin"
import { DashboardUser } from "./DashboardUser"

export const Dashboard = () => {
  const {user} = useUser()

  if(user.role == "admin"){
    return <DashboardAdmin/>
  }else{
    return <DashboardUser/>
  }
}