import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { consturctServer } = require('../server')

let app

export default async function handler(req, res) {
  if (!app) {
    app = await consturctServer()
  }
  app(req, res)
}
