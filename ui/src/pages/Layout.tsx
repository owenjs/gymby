import { Outlet } from "react-router-dom";

const Wrapper = (): JSX.Element => (
  <div className="c-main-wrapper">
    <Outlet />
  </div>
);

export default Wrapper;
