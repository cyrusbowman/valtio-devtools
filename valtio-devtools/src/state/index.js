import { proxy, useSnapshot, subscribe, snapshot } from 'valtio'
import devtools from './devtools'

const state = proxy({
  info: 'Awaiting client to connect to devtools...'
})

//Connect to websocket server
devtools(state)

export { state, useSnapshot, subscribe }