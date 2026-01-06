import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const Navbar = () => {

  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="navbar bg-base-100 max-w-7xl mx-auto px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Candidates</a>
            </li>
            <li>
              <a>Import Excel</a>
            </li>
            <li>
              <a>Users</a>
            </li>
            <li>
              <a>Reports</a>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link
          to={"/"}
          className="btn hover:bg-transparent btn-ghost text-xl bg-transparent font-bold text-primary -ml-4"
        >
          CandidateSys
        </Link>
      </div>

      {/* Navbar Center (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Candidates</a>
          </li>

          <li>
            <details>
              <summary>Manage</summary>
              <ul className="p-2 bg-base-100 w-44 z-[1]">
                <li>
                  <NavLink to={"/import-file"}>Import Excel</NavLink>
                </li>
                <li>
                  <a>Users</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <a>Reports</a>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <span className="hidden sm:block text-sm">{role}</span>
            <button className="btn btn-secondary btn-sm text-white">
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/register"}
              className="btn btn-secondary btn-sm text-white"
            >
              Registation
            </Link>
            <Link to={"/login"} className="btn btn-error btn-sm text-white">
              LogIn
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
