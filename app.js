/**
 * Created by Pavle on 12/8/2015.
 */


var express = require('express');
var fs = require('fs-extra');
var path = require('path');
var busboy = require('connect-busboy');
var app = express();
var songName = '';
var ms = require('mediaserver');

app.set('port', process.env.PORT || OPENSHIFT_NODEJS_PORT || 8080);
app.use(express.static(__dirname));
app.use(busboy());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/' + 'html.html'));
});



app.post('/fileupload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
//    fs.emptyDirSync(__dirname + '/songs/');
    req.busboy.on('file', function (fieldname, file, filename) {
        songName = filename;
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(__dirname + '/songs/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
            app.get('/getFile', function(req, res) {
                res.setHeader("Accept-Ranges","bytes");
                res.send('/songs/' + String(songName))
            });
        });
    });

});



app.listen(app.get('port'));
