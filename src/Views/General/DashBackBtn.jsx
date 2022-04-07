import { useNavigate } from "react-router-dom"

function DashBackBtn() {

  const navigate = useNavigate()

  return (
    <button className="dash-back-btn" onClick={()=>navigate('/dash')}>Dashboard</button>
  )
}

export default DashBackBtn