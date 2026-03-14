const { consturctServer } = require('../server')

let app

module.exports = async (req, res) => {
  if (!app) {
    try {
      // 构造 Express 应用实例
      app = await consturctServer()
    } catch (err) {
      console.error('Failed to construct server:', err)
      res.statusCode = 500
      res.end('Internal Server Error')
      return
    }
  }

  // 将请求交给 Express 处理
  app(req, res)
}
