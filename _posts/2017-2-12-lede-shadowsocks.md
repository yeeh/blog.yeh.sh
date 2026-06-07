---
layout: post
title: LEDE折腾shadowsocks
date: 2017-02-12 22:25:00
categories: 闲
tags: lede openwrt shadowsocks chinadns ubnt 路由
---

之前搞了个ubnt的erx，就是系统不是openwrt找个新点的ss要自己交叉编译好麻烦，于是刷成了openwrt。

...然而到今天才留意到lede，去年就从openwrt分家出来了。鉴于erx在openwrt那一直是trunk，lede已发了rc，就刷lede吧。

从<https://downloads.lede-project.org/releases/17.01.0-rc2/targets/ramips/mt7621/>下erx的最新包，刷上去。

```sh
sysupgrade -n ****.tar
```

重启完成后，原版是连luci界面都没有的，先ssh进去装界面。

```sh
opkg update
opkg install luci
/etc/init.d/uhttpd enable
/etc/init.d/uhttpd start
```

就可以进luci界面了。

先装upnp

```sh
opkg install miniupnpd
opkg install luci-app-upnp
```

下面开始ss依赖包

```sh
opkg install ip ipset iptables-mod-tproxy
opkg install libopenssl
```


vi /etc/opkg.conf 或 opkg配置

```sh
arch all 100
arch mipsel_24kc 200
arch ramips_24kec 300
arch ramips 400
```



把下好的shadowsocks chinadns dns-forward丢到tmp目录，下载地址见下

+ <https://github.com/shadowsocks/openwrt-shadowsocks/releases>
+ <https://github.com/shadowsocks/luci-app-shadowsocks/releases>
+ <https://github.com/aa65535/openwrt-chinadns/releases>
+ <https://github.com/aa65535/openwrt-dns-forwarder/releases>
+ <https://github.com/aa65535/openwrt-dist-luci/releases>

```sh
scp shadowsocks-libev***.ipk root@192.168.1.1:/tmp
```

```sh
cd /tmp
opkg install shadowsocks-libev*.ipk luci-app-shadowsocks*.ipk
opkg install ChinaDNS*.ipk luci-app-chinadns*.ipk
opkg install dns-forwarder*.ipk luci-app-dns-forwarder*.ipk
```

刷新下ip表

```sh
wget -O- 'http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest' | awk -F\| '/CN\|ipv4/ { printf("%s/%d\n", $4, 32-log($5)/log(2)) }' > /etc/chinadns_chnroute.txt
```

剩下就是设置了，后面再更。
