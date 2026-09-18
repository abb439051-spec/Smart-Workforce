import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Smart Workforce" className="h-14 w-14 rounded-2xl object-cover" />
              <h2 className="text-3xl font-bold text-blue-400">Smart Workforce</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-400">
              AI-powered workforce intelligence for smarter operations, better visibility,
              and healthier planning across teams.
            </p>

            <div className="mt-6 flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600">
                <FaLinkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600">
                <FaGithub size={18} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600">
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-slate-400">
              <li><ScrollLink to="home" smooth duration={500} offset={-80} className="cursor-pointer hover:text-blue-400">Home</ScrollLink></li>
              <li><ScrollLink to="features" smooth duration={500} offset={-80} className="cursor-pointer hover:text-blue-400">Features</ScrollLink></li>
              <li><ScrollLink to="solutions" smooth duration={500} offset={-80} className="cursor-pointer hover:text-blue-400">Solutions</ScrollLink></li>
              <li><ScrollLink to="industries" smooth duration={500} offset={-80} className="cursor-pointer hover:text-blue-400">Industries</ScrollLink></li>
              {/* <li><ScrollLink to="pricing" smooth duration={500} offset={-80} className="cursor-pointer hover:text-blue-400">Pricing</ScrollLink></li> */}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Company</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="mailto:your.email@://example.com" className="cursor-pointer hover:text-blue-400">Book Demo</a></li>
              <li><RouterLink to="/login" className="hover:text-blue-400">Login</RouterLink></li>
              <li><RouterLink to="/register" className="hover:text-blue-400">Create Workspace</RouterLink></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Contact</h3>
            <div className="space-y-4 text-slate-400">
              <a href="mailto: abb439051@gmail.com" className="hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3">
                  <MdEmail size={18} /> <span>support@smartworkforce.ai</span>
                </div>
              </a>

              {/* <div className="flex items-center gap-3"><FaPhoneAlt size={18} /> +91 905XX XXXXX</div> */}
              <div className="flex items-start gap-3"><IoLocationSharp size={18} className="mt-1" /> Punjab, India</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-6 md:flex-row">
          <p className="text-sm text-slate-500">© 2026 Smart Workforce. All Rights Reserved.</p>

          <div className="mt-4 flex gap-6 text-sm md:mt-0">
            <RouterLink to="/privacy-policy" className="text-slate-400 hover:text-blue-400">Privacy Policy</RouterLink>
            <RouterLink to="/terms-of-service" className="text-slate-400 hover:text-blue-400">Terms of Service</RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;