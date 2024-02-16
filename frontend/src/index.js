import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Provider } from "react-redux";
import store from "./utils/store";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/common/Header";
import Registration from "./components/Registration";
import UserDashBoard from "./components/EndUser/UserDashBoard";
import AdvisorDashBoard from "./components/Advisor/AdvisorDashBoard";
import UserGoal from "./components/Advisor/UserGoal";
import AllGoalUpdates from "./components/EndUser/AllGoalUpdates";
import GoalJourney from "./components/goal/GoalJourney";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PredefinedList from "./components/EndUser/external/PredefinedList";
import Footer from "./components/common/Footer";
import LandingPage from "./components/landingPage/LandingPage";
import File from "./components/report/File";
import NotFoundPage from "./components/common/NotFoundPage";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </>
  );
}

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
      { path: "report", element: <File /> },
      {
        path: "user",
        children: [
          { path: "dashboard", element: <UserDashBoard /> },
          { path: "plan-notification", element: <AllGoalUpdates /> },
          {
            path: "goal-journey",
            element: <GoalJourney />,
          },
          {
            path: "goal-list",
            element: <PredefinedList />,
          },
        ],
      },
      {
        path: "advisor",
        children: [
          { path: "dashboard", element: <AdvisorDashBoard /> },
          { path: "goal/:id", element: <UserGoal /> },
        ],
      },

      {
        path: "expense",
        element: <UserDashBoard />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
