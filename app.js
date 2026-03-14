#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const tmpPath = require('os').tmpdir()

const getPortFromArgs = () => {
  const args = process.argv.slice(2)
  const argPort = args.find((arg) => /^\d+$/.test(arg))
  if (argPort) {
    return argPort
  }
  const portFlagIndex = args.findIndex(
    (arg) => arg === '--port' || arg === '-p',
  )
  if (portFlagIndex !== -1 && args[portFlagIndex + 1]) {
    return args[portFlagIndex + 1]
  }
  return null
}

if (!process.env.PORT) {
  const portFromArgs = getPortFromArgs()
  if (portFromArgs) {
    process.env.PORT = portFromArgs
  }
}

async function start() {
  // 检测是否存在 anonymous_token 文件,没有则生成
  if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
    fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
  }
  // 启动时更新anonymous_token
  const generateConfig = require('./generateConfig')
  await generateConfig()
  require('./server').serveNcmApi({
    checkVersion: true,
  })
}
start()
