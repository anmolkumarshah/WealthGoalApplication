import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvisorCard from "./AdvisorCard";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function AdvisorInfo() {
  useNonAuthRedirect();
  const store = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      store.user == null ||
      store.token == null ||
      store?.token?.authorities !== "ROLE_ADVISOR"
    ) {
      navigate("/login");
    }
  }, []);
  return (
    <div className=" w-100 md:w-1/4 h-1/3 md:h-screen p-2 flex-col w-100">
      <AdvisorCard
        personalData={{
          name: store?.user?.name,
          phone: store?.user?.phone,
        }}
        loginData={{
          id: store?.user?.id,
          email: store?.user?.email,
          userType: store?.user?.userType,
        }}
      />
    </div>
  );
}

export default AdvisorInfo;
