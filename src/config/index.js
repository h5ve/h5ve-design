// 接口定义
const api = require('./api')
module.exports = {
  token: sessionStorage.getItem("token"),
  request: api
}
