import { NavLink, Outlet } from "react-router-dom"
import './ManangerLayout.css'

const ManagerLayout = () => {
 return (
  <>
   <div className="manager-container">
    <aside className="manager-sidebar">
     <h2 className="manager-logo">Manager Panel</h2>
     <nav>
      <ul>
       <li>
        <NavLink to="screening/manager" className={({ isActive }) => isActive ? "active" : ""}>
         Screening Manager
        </NavLink>
       </li>
       <li>
        <NavLink to="screen/manager" className={({ isActive }) => isActive ? "active" : ""}>
         Screen Manager
        </NavLink>
       </li>
      </ul>
     </nav>
    </aside>

    {/* Main content */}
    <main className="manager-content">
     <Outlet />
    </main>
   </div>
  </>
 )
}

export default ManagerLayout;