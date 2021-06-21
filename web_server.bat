@echo off

rem 防止乱码
chcp 65001

title ★ 启动临时WebServer ★

mode con cols=80 lines=22
color 8

echo http://127.0.0.1:8000/ | clip.exe

echo "在浏览器粘贴url"

wsl python3 -m http.server