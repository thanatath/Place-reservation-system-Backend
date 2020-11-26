var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
var https = require('https');
var http = require('http');
var fs = require('fs');
require('dotenv').config();
var api = new ParseServer({
  databaseURI:
    databaseUri || process.env.DB_REMOTE
    ,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID ,
  masterKey: process.env.MASTER_KEY, //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL, // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
});



// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey
var app = express();
// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes 


const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.crt')
};

var port = process.env.PORT || 443;

var httpsServer = https.createServer(options, app).listen(port, function() {
    console.log('parse-server running on SSL port ' + port + '.');
});

var httpServer = http.createServer(app).listen(1337, function() {
    console.log('parse-server running on port 1337.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);