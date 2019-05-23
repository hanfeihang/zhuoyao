var express = require('express');
var fs = require('fs');
let moment = require('moment');

var router = express.Router();

let file_path = 'hot_position.json';

/* GET users listing. */
router.get('/get', function (req, res, next) {
    //写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略
    fs.readFile(file_path, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            res.json(data.toString());
        }
    );
});

/* GET users listing. */
router.get('/save/lng/:lng/lat/:lat', function (req, res, next) {
    //写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略
    fs.readFile(file_path, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let jsonObj = JSON.parse(data.toString());
        let new_position = {lng: req.params.lng, lat: req.params.lat, time: moment().format('YYYY-MM-DD HH:mm:ss')};
        console.log('before:' + jsonObj.length);
        jsonObj.push(new_position);
        console.log('after:' + jsonObj.length);
        let jsonStr = JSON.stringify(jsonObj);
        fs.writeFile(file_path, jsonStr, function (error) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('写入: ' + jsonStr);
        })
    });

    res.json({success: true});
});


router.get('/delete/lng/:lng/lat/:lat', function (req, res, next) {
    //写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略
    fs.readFile(file_path, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let jsonObj = JSON.parse(data.toString());
        for(let index in jsonObj) {
            if (jsonObj[index].lat === req.params.lat && jsonObj[index].lng === req.params.lng) {
                jsonObj.splice(index, 1);
                break;
            }
        }

        let jsonStr = JSON.stringify(jsonObj);
        console.log(jsonStr);
        fs.writeFile(file_path, jsonStr, function (error) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('写入: ' + jsonStr);
        })
    });

    res.json({success: true});
});

module.exports = router;