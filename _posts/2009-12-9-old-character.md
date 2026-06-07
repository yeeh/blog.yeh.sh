---
layout: post
title: 古文输出
date: 2009-12-09 20:29:06
tags: javascript
categories: 手
---
古文输出是从右向左，从上到下输出，虽然ie私有属性有竖排，不过今天面的是要求js实现。当时太急躁了点，在地铁上时候静心一想，其实和前些日子那个贪吃蛇异曲同工，算法比那个还简单...


```js
function ancient(str, line) {
        //计算列度
        var col = Math.ceil(str.length / line);
        //初始化矩阵
        var a = new Array();
        //初始化行数
        for (i = 0; i < line; i++) {
            a[i] = new Array();
        }

        l = 0;
        for (i = 0; i < line * col; i++) {
            a[l].unshift(!!str[i] ? str[i] : "--");
            l += 1;
            if (l > line - 1) {l = 0;}
        }
        //输出
        var s = "";
        for (i = 0; i < line; i++) {
            s += a[i].join("");
            s += "<br />";
        }
        return s;
}
document.write(ancient("我爱你哈哈哈哈", 2));
```
