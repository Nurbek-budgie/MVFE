import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import bgImg from './assets/anime-style-clouds.jpg';

const PublicLayout = () => {
 return (
  <div
   className="public-layout"
   style={{ backgroundImage: `url(${bgImg})`, minHeight: "100vh", backgroundSize: "cover" }}
  >
   <Header />
   <Outlet />
  </div>
 )
}

export default PublicLayout;