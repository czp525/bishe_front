import request from "./request";

// 登录接口
export const LoginApi = (params) => {
  return request.post("/api/login", params);
};
//管理员登录接口
export const ManagerLoginApi = (params) => {
  return request.post("/api/admin_login", params);
};
// 注册接口
export const RegisterApi = (params) => request.post("/api/reguser", params);

//编辑文章接口
export const EditarticleApi = (params) =>
  request.post("/my/article/updatearticle", params);

//编辑视频接口
export const EditvideoApi = (params) =>
  request.post("/my/video/updatevideo", params);

//搜索文章接口
export const SearcharticleApi = (params) =>
  request.post("/my/article/search", params);

//搜索视频接口
export const SearchvideoApi = (params) =>
  request.post("/my/video/search1", params);

//编辑个人信息接口
export const PersonalApi = (params) => request.post("/my/userinfo", params);
