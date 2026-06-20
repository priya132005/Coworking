import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 bg-white border-t">
      <div className="max-w-screen-xl px-6 py-10 mx-auto">

        {/* TOP */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

          {/* LOGO */}
          <div>
            <Link to="/">
              <img
                src="https://thumbs.dreamstime.com/b/vector-logo-coworking-place-to-work-workspace-195704921.jpg"
                className="h-16 mb-3"
                alt="Logo"
              />
            </Link>
            <p className="text-sm text-gray-500">
              Smart coworking spaces for modern teams.
            </p>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Resources</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
              <li><Link to="/about" className="hover:text-pink-600">About</Link></li>
            </ul>
          </div>

          {/* FOLLOW */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Follow Us</h3>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-pink-600">Github</a></li>
              <li><a href="#" className="hover:text-pink-600">Discord</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Legal</h3>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-pink-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-600">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <hr className="my-8 border-gray-200" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between text-sm text-gray-500 md:flex-row">
          <span>© 2023 Priya. All Rights Reserved.</span>

          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="#" className="hover:text-pink-600">Facebook</a>
            <a href="#" className="hover:text-pink-600">Twitter</a>
            <a href="#" className="hover:text-pink-600">Github</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
