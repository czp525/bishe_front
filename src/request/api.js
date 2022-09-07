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
export const PersonalApi = (params) =>
  request.post("/my/updateuserinfo", params);

//获取文章数据
export const GetarticleApi = (params) =>
  request.get("/my/article/getpage", { params });

//新建文章接口
export const NewarticleApi = (params) =>
  request.post("/my/article/addarticle", params);
//新建视频接口
export const NewvideoApi = (params) =>
  request.post("/my/video/addvideo", params);
//获取视频数据
export const GetvideoApi = (params) =>
  request.get("/my/video/getpage1", { params });
//获取随机文章课程封面
export const GetrandarticleApi = () => request.get("/my/article/randarticle");
//获取随机视频文章封面
export const GetrandvideoApi = () => request.get("/my/video/randvideo");
//获取轮播图对应的封面
export const GetrandimgApi = () => request.get("/my/randindex");
//文章排行榜
export const GetalApi = () => request.get("/my/article/articlelist");
//视频排行榜
export const GetvlApi = () => request.get("/my/video/videolist");
//用户搜索
export const SearchApi = (params) => request.post("/my/usersearch", params);
//提交视频评论
export const AddvideocommentApi = (params) =>
  request.post("/my/video/addvideocomment", params);
//提交文章评论
export const AddarticlecommentApi = (params) =>
  request.post("/my/article/addarticlecomment", params);
  //获取视频评论
export const GetvideocommentApi = (params) =>
  request.post("/my/video/getvideocomment",params);

//获取文章评论
export const GetarticlecommentApi = (params) =>
  request.post("/my/article/getarticlecomment", params);
  //保存视频进度
export const VideoprogressApi = (params) =>
  request.post("/my/video/duration", params);
  //获取视频进度
export const GetvideodurationApi = (params) =>
  request.get("/my/video/updateduration", { params });
//保存文章进度
  export const ArticleprogressApi = (params) =>
    request.post("/my/article/duration1", params);