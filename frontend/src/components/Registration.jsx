import { Box, Tabs } from "@radix-ui/themes";
import React from "react";
import PersonalDetail from "./PersonalDetail";
import LoginDetail from "./LoginDetail";
import IncomeDetail from "./IncomeDetail";
import { Link } from "react-router-dom";

export default function Registration() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:block h-1/5 md:h-screen md:w-1/2 lg:w-1/3 xl:w-1/3 justify-center">
        <img
          src="https://i.pinimg.com/564x/45/55/3d/45553da462098b9ac2a719705695cc6b.jpg"
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex w-full flex-col justify-start items-center">
        <div className="flex justify-center w-full">
          <Tabs.Root defaultValue="personal">
            <Tabs.List>
              <Tabs.Trigger value="personal">
                <div className="lg:text-xl sm:text-sm font-semibold p-1 md:p-5 capitalize">
                  personal Details
                </div>
              </Tabs.Trigger>
              <Tabs.Trigger value="login">
                <div className="lg:text-xl sm:text-sm  font-semibold p-1 md:p-5 capitalize">
                  Login Details
                </div>
              </Tabs.Trigger>

              <Tabs.Trigger value="income">
                <div className="lg:text-xl sm:text-sm  font-semibold p-1 md:p-5 capitalize">
                  Income Details
                </div>
              </Tabs.Trigger>
            </Tabs.List>

            <Box>
              <Tabs.Content value="login">
                <LoginDetail />
              </Tabs.Content>

              <Tabs.Content value="personal">
                <PersonalDetail />
              </Tabs.Content>

              <Tabs.Content value="income">
                <IncomeDetail />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </div>
        <div className="flex justify-end py-2 text-gray-500">
          <Link to={"/login"}>already have an account!</Link>
        </div>
      </div>
    </div>
  );
}
