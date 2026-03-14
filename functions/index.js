const fs = require('fs')
const path = require('path')
const os = require('os')
const serverless = require('serverless-http')

let handler

async function ensureAnonymousToken() {
  const tokenPath = path.resolve(os.tmpdir(), 'anonymous_token')
  if (!fs.existsSync(tokenPath)) {
    fs.writeFileSync(tokenPath, '', 'utf-8')
  }
}

async function createHandler() {
  await ensureAnonymousToken()
  const generateConfigModule = require('../generateConfig')
  const generateConfig =
    typeof generateConfigModule === 'function'
      ? generateConfigModule
      : generateConfigModule?.default
  if (typeof generateConfig !== 'function') {
    throw new TypeError('generateConfig export is invalid')
  }
  const { constructServer } = require('../server')
  await generateConfig()
  const app = await constructServer()
  return serverless(app)
}

exports.handler = async (event, context) => {
  if (!handler) {
    handler = await createHandler()
  }
  return handler(event, context)
}
