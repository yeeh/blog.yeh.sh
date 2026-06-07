---
layout: post
title: 群晖nas的ssl证书
date: 2017-07-15 20:27:00
categories: 好
tags: synology 群晖 nas https ssl 证书 acme
---

运营商封了80，群晖dsm6.1系统使用的是80端口认证证书，let‘s encrypt证书签发失败，所幸还有救。

[acme.sh](https://github.com/Neilpang/acme.sh)就是这个东西，[教程在此](https://github.com/Neilpang/acme.sh/wiki/Synology-NAS-Guide)。

* 群晖ssh权限。

用administrator组的账号登陆，登陆后也没root权限，需要sudo -i提权到root

* 安装并切到目录
```sh
$ wget https://github.com/Neilpang/acme.sh/archive/master.tar.gz
$ tar xvf master.tar.gz
$ cd acme.sh-master/
$ ./acme.sh --install --nocron --home /usr/local/sbin/acme.sh
$ cd /usr/local/sbin/acme.sh
```

* [api问题](https://github.com/Neilpang/acme.sh/blob/master/dnsapi/README.md)

godaddy api，在其他地方注册的域名虽然可以用godaddy的dns，但却用不了api，显示域名找不到，不知道是godaddy的故意控制还是bug，按理有dns就能用才对。

* api的账号密码问题

在account.conf里配置后直接执行acme.sh失败说未授权，最后是直接输入下面内容后执行acme。
```sh
$ export GD_Key="***"
$ export GD_Secret="***"
```

* 证书目录

如果要替换synology的默认证书，按照教程即可。
本次替换的其他证书，先找到证书目录/usr/syno/etc/certificate/_archive/，记录下默认证书目录。在控制面板里随便加一个自签名证书，再看此目录获取到6位长度的目录名，记录为vPATH。


* 执行，下面是godaddy api，其他api对照替换
```sh
$ /usr/local/sbin/acme.sh/acme.sh --issue -d yourdomain.com --dns dns_gd --certpath /usr/syno/etc/certificate/_archive/vPATH/cert.pem --keypath /usr/syno/etc/certificate/_archive/vPATH/privkey.pem --fullchainpath /usr/syno/etc/certificate/_archive/vPATH/fullchain.pem --capath /usr/syno/etc/certificate/_archive/vPATH/chain.pem --reloadcmd "/usr/syno/etc/rc.sysv/nginx.sh reload" --dnssleep 10
```

* 任务调度

没有加cronjob，直接在设置里增加的user script，内容如上2步合并，设定为每个月执行一次，并报告执行结果。
