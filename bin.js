#!/usr/bin/env node
const { spawn } = require('child_process')
const env = Object.create(process.env)
env.NODE_ENV = 'production'
const proc = spawn('neu', ['run'], {cwd: __dirname, stdio: 'ignore', detached: true, env, windowsHide: true })
proc.unref()