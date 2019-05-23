var express = require('express');
const {exec} = require('child_process');

var router = express.Router();

/* GET users listing. */
router.get('/lng/:lng/lat/:lat', function (req, res, next) {
    console.log(`坐标:${req.params.lng},${req.params.lat}`);

    // 执行adb
    let cmd = `adb -s emulator-5554 emu geo fix ${req.params.lng} ${req.params.lat}`;
    console.log(`cmd:${cmd}`);
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

    res.json({lng: req.params.lng, lat: req.params.lat});
});

module.exports = router;