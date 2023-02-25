module.exports = {
  baseURL: '/dev-api',
  target: 'http://localhost:8086',
  token: "aceacd67-1b0b-4eeb-b4a4-3f0fc88e1e41",
  prod: process.env.NODE_ENV === "production",
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/"
}
