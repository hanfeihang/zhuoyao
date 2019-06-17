var express = require('express');
var fs = require('fs');
const {exec} = require('child_process');
let coordinate = require('../utils/coordinate');

var router = express.Router();

let gpx_file_position = '/Users/hanfeihang/projects/GodFeet/Location.gpx';
let apple_script_position = '/Users/hanfeihang/projects/zhuoyao/apple_script/xcode_simulation';
let apple_script_connect = '/Users/hanfeihang/projects/zhuoyao/apple_script/xcode_connect';

/* GET users listing. */
router.get('/lon/:lon/lat/:lat', function (req, res, next) {
    var content = '<?xml version="1.0"?><gpx version="1.1" creator="gpxgenerator.com"><wpt lat="$lat" lon="$lon"></wpt></gpx>';
    console.log(`GCJ:${req.params.lon},${req.params.lat}`);
    let wsg = coordinate.gcj02towgs84(parseFloat(req.params.lon), parseFloat(req.params.lat));
    console.log(`WSG:${wsg}`);
    content = content.replace('$lon', wsg[0]);
    content = content.replace('$lat', wsg[1]);

    //写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略
    fs.writeFile(gpx_file_position, content, function (error) {
        if (error) {
            console.log(error);
            return;
        }
        console.log('写入: ' + content);
        // 执行applescript
        exec('osascript ' + apple_script_position, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            // console.log(`stdout: ${stdout}`);
            // console.log(`stderr: ${stderr}`);
        });
    });

    res.json({lon: req.params.lon, lat: req.params.lat});
});

/* GET users listing. */
router.get('/connect', function (req, res, next) {

    console.log('osascript ' + apple_script_connect);
    // 执行applescript
    exec('osascript ' + apple_script_connect, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
    });

    res.json({success: true});
});

module.exports = router;