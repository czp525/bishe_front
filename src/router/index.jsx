import App from "../App";
import Login from "../pages/Login/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup/index";
import Personal from "../pages/Personal/index";
import Courses from "../pages/Courses/index";
import Forum from "../pages/Forum/index";
import Training from "../pages/Training/index";
import Managerlogin from "../pages/Managerlogin/index";
import Manage from "../pages/Manage/index";
import Articlemanage from "../pages/Articlemanage/index";
import Videomanage from "../pages/Videomanage/index";
import Trainingmanage from "../pages/Trainingmanage/index";
import Newarticle from "../pages/Newarticle/index";
import Newvideo from "../pages/Newvideo/index";
import Editarticle from "../pages/Editarticle/index";
import Editvideo from "../pages/Editvideo/index";
import Result from "../pages/Result/index";
import Videolesson from "../pages/Videolesson/index";
import Articlelesson from "../pages/Articlelesson/index";
import Lesson1 from "../pages/Lesson1/index";
import Lesson2 from "../pages/Lesson2/index";
import Videoprogress from "../pages/Videoprogress/index";
import Articleprogress from "../pages/Articleprogress/index";
import Post from "../pages/Post/index";
import Question from "../pages/Question/index";
import Testdetails from "../pages/Testdetails/index";
import Errorsets from "../pages/Errorsets/index";
// import Forgetpassword from "../pages/Forgetpassword/Forgetpassword";

const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/personal" element={<Personal />}></Route>
      <Route path="/courses" element={<Courses />}>
        <Route
          path="/courses/articlelesson"
          element={<Articlelesson />}
        ></Route>
        <Route path="/courses/videolesson" element={<Videolesson />}></Route>
      </Route>
      <Route path="/forum" element={<Forum />}></Route>
      <Route path="/training" element={<Training />}></Route>
      <Route path="/managerlogin" element={<Managerlogin />}></Route>
      <Route path="/manage" element={<Manage />}>
        <Route path="/manage/articlemanage" element={<Articlemanage />}></Route>
        <Route path="/manage/videomanage" element={<Videomanage />}></Route>
        <Route path="/manage/videoprogress" element={<Videoprogress />}></Route>
        <Route
          path="/manage/articleprogress"
          element={<Articleprogress />}
        ></Route>
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
      <Route path="/result" element={<Result />}></Route>
      <Route path="/lesson1" element={<Lesson1 />}></Route>
      <Route path="/lesson2" element={<Lesson2 />}></Route>
      <Route path="/post" element={<Post />}></Route>
      <Route path="/question" element={<Question />}></Route>
      <Route path="/testdetails" element={<Testdetails />}></Route>
      <Route path="/errorsets" element={<Errorsets />}></Route>
    </Routes>
  </Router>
);

export default BaseRouter;
