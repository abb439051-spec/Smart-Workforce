import { Link as RouterLink } from "react-router-dom";
import { Button } from "antd";
import { Link } from "react-scroll";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-auto">

        {/* Logo */}
        <Link to="/" className="cursor-pointer flex items-center gap-3 text-blue-600">
          <img src={logo} alt="Smart Workforce" className="h-12 w-12 rounded-xl object-cover" />
          <span className="flex flex-col items-start">
            <span className="text-xl font-bold">Smart Workforce</span>
          
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              AI-Powered Workforce Intelligence
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="cursor-pointer hidden md:flex items-center gap-8">
          <Link to="home" smooth duration={500} offset={-80}>Home</Link>
          <Link to="features" smooth duration={500} offset={-80}>Features</Link>
          <Link to="solutions" smooth duration={500} offset={-80}>Solutions</Link>
          <Link to="ai" smooth duration={500} offset={-80}>AI</Link>
          <Link to="industries" smooth duration={500} offset={-80}>Industries</Link>
          {/* <Link to="pricing" smooth duration={500} offset={-80}>Pricing</Link> */}
          <Link to="contact" smooth duration={500} offset={-80}>Contact</Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <RouterLink to="/login">Login</RouterLink>

          <RouterLink to="/register">
            <Button type="primary">Get Started</Button>
          </RouterLink>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;