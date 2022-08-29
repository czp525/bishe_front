import App from "../App";
import Login from "../pages/Login/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup/index";
import Personal from "../pages/Personal/index";
import Courses from "../pages/Courses/Courses";
import Forum from "../pages/Forum/Forum";
import Training from "../pages/Training/Training";
import Managerlogin from "../pages/Managerlogin/index";
import Manage from "../pages/Manage/index";
import Articlemanage from "../pages/Articlemanage/index";
import Videomanage from "../pages/Videomanage/index";
import Trainingmanage from "../pages/Trainingmanage/Trainingmanage";
import Newarticle from "../pages/Newarticle/index";
import Newvideo from "../pages/Newvideo/index";
import Editarticle from "../pages/Editarticle/index";
import Editvideo from "../pages/Editvideo/index";

// import Forgetpassword from "../pages/Forgetpassword/Forgetpassword";

const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/personal" element={<Personal />}></Route>
      <Route path="/courses" element={<Courses />}></Route>
      <Route path="/forum" element={<Forum />}></Route>
      <Route path="/training" element={<Training />}></Route>
      <Route path="/managerlogin" element={<Managerlogin />}></Route>
      <Route path="/manage" element={<Manage />}>
        <Route path="/manage/articlemanage" element={<Articlemanage />}></Route>
        <Route path="/manage/videomanage" element={<Videomanage />}></Route>
        <Route
          path="/manage/trainingmanage"
          element={<Trainingmanage />}
        ></Route>
      </Route>
      {/* <Route path="/forgetpassword" element={<Forgetpassword />}></Route> */}
      <Route path="/newarticle" element={<Newarticle />}></Route>
      <Route path="/newvideo" element={<Newvideo />}></Route>
      <Route path="/editarticle" element={<Editarticle />}></Route>
      <Route path="/editvideo" element={<Editvideo />}></Route>
    </Routes>
  </Router>
);

export default BaseRouter;
