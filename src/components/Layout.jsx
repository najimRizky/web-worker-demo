import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <header>
        <div style={{ display: "flex", justifyContent: "center", columnGap: "1rem" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </header>
      <Outlet />
    </div >
  )
}

export default Layout