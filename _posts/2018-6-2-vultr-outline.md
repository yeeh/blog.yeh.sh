---
layout: post
title: vultr安装outline
date: 2018-06-02 23:02:00
categories: 闲
tags: vultr outline
---

> outline出来有段日子了，看了下教程，已经是超级简单。

#### outline组成：

server：服务端，docker跑单个ss实例。

manager：管理工具，省却敲命令，走的是https api。

client：全局的，不算好用，用其他的替代。

> vultr之前囤了一日一美 vps，2.5刀一个月，500g流量，正合适。

#### 先开bbr，分开运行下面每行

```sh
wget –no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh

chmod +x bbr.sh

./bbr.sh
```
装完重启。

#### 关防火墙打开端口
```sh
service firewalld stop
```

#### 装outline server

```sh
bash -c "$(wget -qO- https://raw.githubusercontent.com/Jigsaw-Code/outline-server/master/src/server_manager/install_scripts/install_server.sh)"
```

#### 报错的话先装docker后启动docker，之后执行上面的装outline server

```sh
curl -sS https://get.docker.com/ | sh

service docker start
```

#### 装完了管理用outline manager，把装server得到的https api加入，就可以新增key了。

#### 生成服务端后，会看到端口，把端口加到服务器列表允许名单，再把防火墙开启。
