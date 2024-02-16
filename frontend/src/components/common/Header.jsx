import React from "react";
import { Link } from "react-router-dom";
import logo from "../../asset/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/slice/authSlice";
import { toast } from "react-toastify";

function Header() {
  const store = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const userType = store?.user?.userType;

  const handleLogout = () => {
    toast.warning("You Got Logged Out", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(removeUser());
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl  text-white">
          <div className="flex  items-center">
            <img src={logo} alt="Wealth App Logo" className="w-8 h-8 mr-2" />

            <div className="text-xs md:text-lg">Wealth Goal App</div>
          </div>
        </Link>
        {store?.user != null ? (
          <nav className="space-x-4">
            <Link
              to={`${
                userType != "ADVISOR" ? "/user/dashboard" : "/advisor/dashboard"
              }`}
              className="hover:underline text-xs md:text-lg"
            >
              Dashboard
            </Link>

            {userType != "ADVISOR" ? (
              <Link
                to="/user/goal-journey"
                className="hover:underline text-xs md:text-lg"
              >
                Goal Journey
              </Link>
            ) : null}

            <Link
              onClick={handleLogout}
              to={"/"}
              className="hover:underline text-xs md:text-lg"
            >
              Logout
            </Link>
          </nav>
        ) : (
          <nav className="space-x-4">
            <Link to={"/login"} className="hover:underline text-xs md:text-lg">
              Login
            </Link>
            <Link
              to={"/registration"}
              className="hover:underline text-xs md:text-lg"
            >
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
