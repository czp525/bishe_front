const BASE_URL = "http://10.2.13.113:8088"
const getVideoPath = (file) => `${BASE_URL}/files/${file}`
const getImgurl = (file) => `${BASE_URL}/files/${file}`

export { getVideoPath, getImgurl }
