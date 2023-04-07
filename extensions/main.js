import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer, WebSocket } from 'ws';
import minimist from 'minimist';
const { 'nl-port': nl_port, 'nl-token': nl_token, 'nl-extension-id': nl_extension_id } = minimist(process.argv.slice(2));

const ws = new WebSocket(`ws://localhost:${nl_port}?extensionId=${nl_extension_id}`);
ws.on('error', console.error);
ws.on('open', function open() {
    //console.log('connected')
});
ws.on('message', function message(e) {
    const { event, data } = JSON.parse(e.toString());
    //console.log('event', event, 'data', data);
    if (event === "eventToExtension") {
        //console.log("BROADCASTING!")
        ws.send(
            JSON.stringify({
                id: uuidv4(),
                method: "app.broadcast",
                accessToken: nl_token,
                data: { event: "eventFromExtension", data: { test: 'me' } },
            })
        );
    }
});
ws.on('close', process.exit)
/*
    Could use vite extensions websocket server to connect app to here but starting
    own websocket server instead for web app portability.

    Simple websocket server that rebroadcasts events to all connected clients
*/
const wss = new WebSocketServer({ port: 5679 });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        //console.log('state changed', JSON.parse(data.toString()))
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});