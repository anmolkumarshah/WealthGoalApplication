import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Info() {
  const store = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      store.user == null ||
      store.token == null ||
      store.authorities === "ROLE_ADVISOR"
    ) {
      navigate("/login");
    }
  }, []);
  return (
    <div className=" w-100 md:w-100 h-1/3 md:h-screen p-3">
      <UserCard
        personalData={store?.user?.personalDetail}
        loginData={{
          id: store?.user?.id,
          email: store?.user?.email,
          userType: store?.user?.userType,
        }}
        incomeData={store?.user?.incomeDetail}
      />
    </div>
  );
}

export default Info;
