# 捉妖雷达 & 虚拟定位

## 介绍

一起来捉妖网页版雷达&定位功能
    
  - 支持妖灵展示、擂台展示
  - 目前仅支持iOS虚拟定位，需配合Mac使用
  
## 功能

- 菜单：可筛选过滤，进行简单的设置
- 妖灵：点击后可以展示目标点附近的妖灵
- 擂台：点击后可以展示目标点附近的擂台
- 飞行：手机虚拟定位到目标点
- 重连：当前wss接口不稳定，可点击按钮进行重连
- 大范围扫描：从目标点开始进行一个20*20的稀有妖灵扫描
- 保存点：保存常用地点

> 特殊的使用技巧：在局域网内，用Xcode无线连接手机，然后用手机访问电脑IP访问地图，即可以躺在床上用手机控制飞行啦

## 原理

1、通过微信小程序捉妖雷达的接口将信息展示在地图上

2、坐标转换，将国内地图坐标系转换成火星坐标系

3、手机虚拟定位
  - iOS：将坐标生成gpx文件，然后使用Node服务器触发AppleScript，实时修改iPhone定位。
  - Android：可以基于adb来实现，欢迎同学重写iOS_gps.js来实现

## 部署

iOS
  - 使用Xcode的Simulation功能进行虚拟定位。新建Location.gpx，将该文件导入Xcode作为虚拟定位文件。将文件路径赋值给iOS_gps.js内的变量gpx_file_position。
  - 使用osacompile指令对apple_script文件夹内的脚本进行编译，产出可执行脚本。将脚本路径赋值给iOS_gps.js内的变量apple_script_position。
  - 进入项目目录，执行指令 npm install && npm start
  - 使用浏览器访问 http://localhost:8080/
 
Android（手头没有安卓手机，未实现，欢迎PR）
  - 电脑安装adb工具
  - 参考iOS_gps.js写一个支持安卓虚拟定位的脚本


## 感谢

地图雷达：https://github.com/liuzirui1122/zhuoyao_radar/

ios虚拟定位：https://github.com/chanteP/ios-simulate-location-service