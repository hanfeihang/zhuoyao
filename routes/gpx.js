var express = require('express');
var fs = require('fs');
const {exec} = require('child_process');

var router = express.Router();

let gpx_file_position = '/Users/hanfeihang/projects/GodFeet/Location.gpx';
let apple_script_position = '/Users/hanfeihang/projects/zhuoyao/apple_script/xcode_simulation';

/* GET users listing. */
router.get('/lon/:lon/lat/:lat', function (req, res, next) {
    var content = '<?xml version="1.0"?><gpx version="1.1" creator="gpxgenerator.com"><wpt lat="$lat" lon="$lon"></wpt></gpx>';
    content = content.replace('$lat', req.params.lat);
    content = content.replace('$lon', req.params.lon);

    //写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略
    fs.writeFile(gpx_file_position, content, function (error) {
        if (error) {
            console.log(error);
            return false;
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

module.exports = router;