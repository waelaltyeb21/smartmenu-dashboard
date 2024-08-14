import { Outlet } from "react-router";
import DashboardNavBar from "../Components/DashboardNavBar/DashboardNavBar";

const Dashboard = () => {
  return (
    <section>
      {/* <DashboardNavBar /> */}
      <div className="">
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
