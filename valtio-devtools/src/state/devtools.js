import WebSocket from 'isomorphic-ws';
import { observableDiff, applyChange, applyDiff } from 'deep-diff';
import _ from 'lodash';
let ws;
let proxy;
export default function init (state, options) {
    proxy = state;
    options = options || {};
    //Connect to websocket server (if not already)
    ws = new WebSocket(`ws://${options.host || 'localhost'}:${options.port || 5679}`);
    ws.onopen = function open() {
        console.log('connected to websocket server')
    };
    ws.onclose = function close() {
        console.log('disconnected from websocket server');
    };
    ws.onmessage = function incoming(msg) {
        const obj = JSON.parse(msg.data);
        if(!_.isEqual(proxy, obj)) {
            console.log('Merging in state changes...', msg.data)
            observableDiff(proxy, obj, function (d) {
                console.log('Change', d)
                applyChange(proxy, obj, d);
            });
            //applyDiff(proxy, obj)
        }
    };
}