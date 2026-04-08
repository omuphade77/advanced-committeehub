import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Committee from "./components/Committee/Committee";
import AddRoleFromUser from "./components/Home/AddRoleFromUser/AddRoleFromUser";
import Announcement from "./components/Home/announcements/announcement";
import ConnectWithUs from "./components/Home/connectwithus/ConnectWithUs";
import GetAnnouncements from "./components/Home/getannouncements/GetAnnouncements";
import GetEvent from "./components/Home/getevent/GetEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/add-role" element={<AddRoleFromUser />} />       
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/connectwithus" element={<ConnectWithUs />} />
        <Route path="/getannouncements" element={<GetAnnouncements />} />
        <Route path="/getevent" element={<GetEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
