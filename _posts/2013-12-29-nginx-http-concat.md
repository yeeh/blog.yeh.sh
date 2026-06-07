---
layout: post
title: nginx添加服务器端合并压缩
date: 2013-12-29 16:45:02
categories: 手
tags: centos nginx http-concat
---

tengine（ali开发的）有个nginx-http-concat插件，可以在服务器端合并压缩css和js，打算装上。


因为之前的nginx是yum install的，缺少必要的编译和安装库。

看nginx安装路径

```
rpm -ql nginx
```

我的安装在/usr/sbin/nginx

查看nginx安装参数

```
/usr/sbin/nginx -V
```

拷贝参数出来

安装git

```
yum -y install git
```

git http-concat库

```
git clone git://github.com/alibaba/nginx-http-concar.git
```
放在了/root/nginx-http-concat

看nginx版本

```
rpm -q nginx
```

获取对应版本

```
wget http://nginx.org/download/nginx-1.0.15.tar.gz
```

解压

```
tar zxvf nginx.1.0.15.tar.gz
```

解压到了/root/nginx-1.0.15/

```
cd /root/nginx-1.0.15
./configure --参数 --add-module=/root/nginx-http-concat
```

提示gcc未安装

```
yum install gcc
```

再来安装nginx，提示pcre未安装

```
yum -y install pcre-devel
```

再来安装nginx，提示openssl未安装

```
yum -y install openssql openssql-devel
```
再来安装nginx，提示libxml2/libxslt未安装

不装了，直接参数里关闭

```
make && make install
```

之后开启nginx

```
service nginx start
```

在网站的conf里添加

```
location / {
        index  index.html index.htm;
        concat on;
        concat_max_files 20;
    }
```

用http://***.com/??css/1.css,css/2.css 访问成功

需要留意的是，css里的图片路径要提前修改为绝对路径，否则合并后路径会出错的
