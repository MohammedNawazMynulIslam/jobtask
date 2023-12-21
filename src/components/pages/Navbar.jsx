import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().then((result) => {
      console.log(result);
    });
  };

  return (
    <div className="">
      <h1>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            {/* dropdown */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link to="/">
                  <button>Home</button>
                </Link>
                {!user && (
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                )}
                {user && (
                  <>
                    <Link to="/dashboard">
                      <button>Dashboard</button>
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                )}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">Set Priority</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">
                  <a>Home</a>
                </Link>
              </li>
              {!user && (
                <li>
                  <Link to="/login">
                    <a>Login</a>
                  </Link>
                </li>
              )}
              {user && (
                <>
                  <li>
                    <Link to="/dashboard">
                      <a>Dashboard</a>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </h1>
    </div>
  );
};

export default Navbar;
