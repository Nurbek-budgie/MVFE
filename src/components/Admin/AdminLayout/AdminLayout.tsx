import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
 return (
  <div className="admin-container">
   {/* Sidebar */}
   <aside className="admin-sidebar">
    <h2 className="admin-logo">Admin Panel</h2>
    <nav>
     <ul>
      <li>
       <NavLink to="theater" className={({ isActive }) => isActive ? "active" : ""}>
        Theater
       </NavLink>
      </li>
      <li>
       <NavLink to="movies" className={({ isActive }) => isActive ? "active" : ""}>
        Movies
       </NavLink>
      </li>
      <li>
       <NavLink to="screening/manager" className={({ isActive }) => isActive ? "active" : ""}>
        Screening Manger
       </NavLink>
      </li>
      <li>
       <NavLink to="screen/manager" className={({ isActive }) => isActive ? "active" : ""}>
        Screen Manger
       </NavLink>
      </li>
      <li>
       <NavLink to="users" className={({ isActive }) => isActive ? "active" : ""}>
        Users
       </NavLink>
      </li>
     </ul>
    </nav>
   </aside>

   {/* Main content */}
   <main className="admin-content">
    <Outlet />
   </main>
  </div>
 );
};

export default AdminLayout;
