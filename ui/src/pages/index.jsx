import { Routes, Route } from "react-router-dom";
import Layout from "/@/pages/Layout";
import Landing from "/@/components/Landing";
import Login from "/@/pages/Login";
import Auth from "/@/pages/Auth";
import Dashboard from "/@/pages/Dashboard";
import NotFound from "/@/pages/404";

const Pages = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Auth />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Pages;
