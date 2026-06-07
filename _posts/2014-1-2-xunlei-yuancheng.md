---
layout: post
title: mybook live添加迅雷远程
date: 2014-01-02 01:00:00
categories: 手
tags: 迅雷 mybook-live 远程
---

今天一群里贴了个迅雷新出的神器网址g.xunlei.com，瞄了下是出了个linux远程下载插件，给各种linux设备加上远程下载的功能，比如nas，电视盒子，openwrt，ddwrt的各种路由器。

本来我已有磊科nw762这个远程下载器，但是无奈nw762的局域网共享速度非常不给力，才3.4mb/s，看个1080p能急死人。于是打算把mybook live加上远程支持，话说mybook live的局域网是千兆，共享完全看路由器性能，性能还算给力。

办法挺简单的，下对应设备的程序，在linux上装上即可。但mybook live内置的是debian，不是centos，所以又光荣踩坑了。

先把mybook live的ssh开了，在路由器ip/UI/ssh里可以直接打开ssh，直接ssh上去，输入密码进入。我的mybook live 3t的硬件配置是800m cpu，内存256mb。

```sh
df -h
```

看了下，下载盘符是/DataVolume，在此下新建目录TDDOWNLOAD，这是迅雷下载默认的内容存储目录。

但是mybook
 live设立的共享目录在/DataVolume/shares里，比如我想下到/DataVolume/shares/Public/怎么办呢？
 
那就需要把/DataVolume/TDDOWNLOAD映射到/DataVolume/shares/Public。


把程序上传到/etc/xunlei/，之后直接

```sh
cd /etc/xunlei/
chmod 755 * -R
./portal
``` 

运行

```sh
initing...

try stopping xunlei service...

setting xunlei runtime env...
bind(3): errno = 98.
port: 9000 is usable.

YOUR CONTROL PORT IS: 9000


starting xunlei service...

...

THE ACTIVE CODE IS: ******

go to http://yuancheng.xunlei.com, bind your device with the active code.
finished.

```
这就是成功了。在yuancheng.xunlei.com里输入激活码，捆绑上就可以。

新建个sh文件,放在/etc/init.d/目录下，我命名为xunlei，无后缀，内容如下

```sh
#!/bin/sh

START=99
start(){
        mount -o bind /shares/Public /DataVolume/TDDOWNLOAD
        /etc/xunlei/portal
}
stop(){
        /etc/xunlei/portal -s
}
restart(){
       stop
       start
}

case "$1" in
    start)
        start
    ;;
    stop)
        stop
    ;;
    restart)
        restart
    ;;
    cleanup)
    ;;
    *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit $?
```

然后设置成开机自启

```sh
update-rc.d xunlei defaults 99 1     
```

重启下mybook live，大功告成。

踩坑主要是开始把迅雷放到root下面去，那个盘符只有1g大小，下什么片都不够。

linux蛮有意思的。
