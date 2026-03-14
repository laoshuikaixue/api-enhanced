const { consturctServer } = require('../server')

let app

module.exports = async (req, res) => {
  if (!app) {
    app = await consturctServer()
  }
  app(req, res)
}
