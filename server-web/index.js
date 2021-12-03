const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static("files"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

const dir = '../files';
var models;

wss.on('connection', function connection(ws, req) {
  console.log('[CLIENT CONNECTED] %o:%o', req.socket.remoteAddress, req.socket.remotePort);
  ws.on('message', function message(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {

        var msg = data.toString().substring(0, 2);
        console.log('msg\n %s', msg);
        var value = data.toString().replace(msg, "");
        console.log('value\n %s', value);

        if (msg.normalize() === "l:".normalize()) {

          models = getRecentFiles();
          models = models.slice(Math.max(models.length - value, 0));

          for (var i=0; i<models.length; i++) {
            console.log('data send\n %s', models[i]);
            client.send(models[i]);
          }
        } 
        if ((msg.normalize() === "i:".normalize()) && (models != null)) {
          console.log('data send\n %o', models);
          var object = models[Number(value)];
          const content = fs.readFileSync(dir + "/" + object, {encoding:'utf8'});
          console.log('data send\n %s', content);
          client.send(content);

          /*var modelName = path.parse(object).name;
          var dicom = getFileDicom(modelName); 
          for (var i=0; i<dicom.length; i++) {
            var fileDicom = fs.readFileSync(dir + "/" + modelName + "/" + dicom[i].name, {encoding:'utf8'});
            client.send(fileDicom);
          }*/
        }
      }
    });
  });
});

server.on('request', (request, res) => {
  console.log("[REQUEST FROM] %o:%o", res.socket.remoteAddress, res.socket.remotePort);
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`[SERVER STARTED] ${server.address().port}`);
});

const getRecentFiles = () => {

  var models = fs.readdirSync(dir, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name);

  var sorted = models.map((file) => {
    var filepath = path.resolve(dir, file);
      return {
        name:file,
        time:fs.statSync(filepath).mtime.getTime()
      }
    })
    .sort((a, b) => a.time - b.time)
    .map((file) => file.name);

    return sorted;
}

const getFileDicom = (directoryName) => {
  return fs.readdirSync(dir + "/" + directoryName + "/", {withFileTypes: true});
}