import serverModule from '../server.js'

const { consturctServer } = serverModule

let app

export default async function handler(req, res) {
  if (!app) {
    app = await consturctServer()
  }
  app(req, res)
}
