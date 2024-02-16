import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useNonAuthRedirect() {
  const store = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (store?.user === null || store?.token == null) {
      toast.warning("Session Expired!, Please Login Again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    }
  }, [store, navigate]);
}

export default useNonAuthRedirect;
