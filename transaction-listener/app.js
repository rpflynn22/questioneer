/**
 *  Creates a WebSocket client and listens to the public Ripple WebSocket
 *  server.
 */

var WebSocketClient = require('ws'),
    mongoose = require('mongoose'),
    secrets = require('./conf/secrets.json'),
    shared = require('../conf/shared.json');

mongoose.connect(shared.MONGO_URI);

// Connect to Ripple's WSS
var ws = new WebSocketClient(secrets.PUBLIC_RIPPLE_WSS);

var SUBSCRIBE_REQUEST = {
    "id": 1,
    "command": "subscribe",
    "accounts": [secrets.QUESTIONEER_RIPPLE_ADDRESS],
    "streams": [
        "server",
        "ledger"
    ]
}

// Connection established!
ws.on('open', function () {
    console.log("Connction established to " + secrets.PUBLIC_RIPPLE_WSS);

    // Send the initial request to subscribe to the stream
    ws.send(JSON.stringify(SUBSCRIBE_REQUEST));

    ws.on('message', function (data) {
        // On receipt of messages, parse info and
        var parsed = JSON.parse(data);

        if (isIncomingTransaction(parsed)) {
            // Received an incoming transaction, so now we need to add it to
            // mongo
        }
    });
});

/**
 *  Returns whether or not the response res is that of an incoming transaction.
 *  Expects res to be a parsed JSON object.
 */
function isIncomingTransaction(res) {
    return res.type &&
        res.type === "transaction" &&
        res.transaction.TransactionType == "Payment";
}
