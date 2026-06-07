---
layout: post
title: godaddy的email系统不认dnspod.cn的dns
date: 2013-07-25 07:34:56
categories: 好
tags: godaddy dns dnspod
---

本站域名注册在godaddy，邮箱是google apps托管，之前一直用dnspod.com的解析（解析服务器是A.DNSPOD.COM，B.DNSPOD.COM，C.DNSPOD.COM），上个月把解析迁移到了dnspod.cn（解析服务器是F1G1NS1.DNSPOD.NET，F1G1NS2.DNSPOD.NET），dnspod.com和dnspod.cn是同一家公司的。

前天感觉最近个把月没收到godaddy的广告邮件，想登录进去看看，发现忘了密码。点取回密码，怎么都收不到godaddy发的邮件，收不到邮件就重设不了密码，重设不了就进不去，进不去就改不了dns。测试了下发现这是个死循环，完全无解。

所幸最后想起来密码了，但是同时发现尝试登录失败次数太多，账号已被锁定，最后还是skype打客服电话才解锁的（话说客服电话的英文语速真快，和平时看电影压根不是一节奏，听了3遍才听清菜单）。

发微博说了这事，dnspod回复说让设置白名单（我哪能设置godaddy的名单=_=)。同时发了godaddy的support ticket，说的很明白他们的邮箱系统不认F1G1NS1.DNSPOD.NET F1G1NS2.DNSPOD.NET，可是godaddy回复说 发现我的邮箱托管在第三方，让我联系第三方看垃圾邮件设置，这又踢回google了…

最后域名dns是这么设置的：

```
Name Server:F1G1NS1.DNSPOD.NET
Name Server:F1G1NS2.DNSPOD.NET
Name Server:A.DNSPOD.COM
Name Server:B.DNSPOD.COM
Name Server:C.DNSPOD.COM
```

在dnspod.com和dnspod.cn里都加了mx记录，这下godaddy的email能收到了，所以我觉得问题的本质不是google的apps企业邮箱问题，而是godaddy的email系统不认F1G1NS1.DNSPOD.NET F1G1NS2.DNSPOD.NET的解析，另外不知道F1G1NS1.DNSPOD.NET上有没有什么设置（按理说同一家公司的，不应该）。

> 这么设置后，不同地方nslookup得到的nameserver并不一样，有些地方得到F1G1NS1.DNSPOD.NET和F1G1NS2.DNSPOD.NET，有些则是A.DNSPOD.COM这一组。 所以a记录 mx记录等解析记录，要在**dnspod.com和dnspod.cn各做一遍**。

目前这么规避。

update@2013.08.19: 发现ns服务器加多了会导致解析混乱，于是最终把godaddy的email换成其他邮箱来规避了。嗯。