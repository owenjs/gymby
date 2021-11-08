import { Routes, Route } from "react-router-dom";
import Landing from "/@/components/Landing";
import NotFound from "/@/pages/404";

const Pages = () => (
  <div className="c-main-wrapper">
    <Routes>
      <Route exact path="/" element={<Landing />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default Pages;
