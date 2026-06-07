---
layout: post
title: github pages custom domains自有域名支持https
date: 2018-05-01 11:10:00
categories: 闲
tags: github pages custom domain https
---

> 先简介一下blog三件套

### github pages

托管blog的绝佳利器，免费，维护方便。

### disqus

github pages没评论功能，disqus配合绝佳。

### custom domains

github pages默认的是***.github.io域名，自有域名做个a记录或者cname记录指向到github pages，看起来就是自有网站。


> 最近又新增一枚利器

### let's encrypt

个人也可获得3个月的免费https域名签名证书，可配合自有vps nas router等使用。


开始github pages并不支持https。

在16年放开了***.github.io的https，也就是仓库setting中可看见的Enforce HTTPS。

今年1月份，github联合let's encrypt就开始灰度了一批。

今日，github pages https终于[正式上线](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/)。


> 注意点

如果看到Not yet available for your site because the certificate has not finished being issued，这是证书还没来得及生成，稍等即可。

转向https后，a记录的ip变更了，[参考设置](https://help.github.com/articles/setting-up-an-apex-domain/#configuring-a-records-with-your-dns-provider)。