---
layout: post
title: 给github的个人和组织添加主页
date: 2013-07-29 23:00:12
categories: 好
tags: github pages
---

一般github的个人项目页面是类似https://github.com/username这样的页面，但是github pages也提供了个人主页是类似http://username.github.io这样的网址。

缘起今天发现我的这个网址http://perryyeh.github.io直接访问是404，404？不可忍，搜了一圈找到了这篇[User, Organization and Project Pages](https://help.github.com/articles/user-organization-and-project-pages),设立个人、组织和项目的主页。

个人和组织的首页都是http://username.github.io的形式，所以方法一致，规矩有2个：

```
 如果个人用户名和组织名是username，那么创建新项目，名字一定要是username.github.io；
 
 一定要是主干分支，不能是其他分支，才会被当成github pages建立。
```

其他规矩和设立一个github pages无啥区别，一样可以用自定义域名，自定义404之类的。

可以看[源码](http://github.com/perryyeh/perryyeh.github.io)。我的比较简单，直接跳转到其他网址去了。

至于项目的首页，是类似http://username.github.io/project这样的网址，和设置github pages差不多，要gh-pages分支才会建立页面，当然也可以用cname之类的。