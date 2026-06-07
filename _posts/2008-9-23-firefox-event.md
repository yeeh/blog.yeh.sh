---
layout: post
title: firefox 3.0.1的event实现bug
date: 2008-09-23 20:41:54
tags: event firefox
categories: 手
---
朋友说，给前几日的那个联动下拉做个灰色不可选，没想到实现的时候发现了firefox3的event实现bug。代码如下：

```html
<select name="test1" id="test1" disabled onchange="alert(this.name);">
<option value="" selected>选拔1</option>
<option value="1">1</option>
<option value="2">2</option>
</select>
<input type="button"
value="undisabled&dispatchEvent"
onclick="document.getElementById('test1').disabled=false;document.getElementById('test1').options[1].selected = true;var evt = document.createEvent('HTMLEvents');evt.initEvent('change',true,true);document.getElementById('test1').dispatchEvent(evt);"
/>
```

注意，这段代码ie下无效，请在非ie内核看。opera chrome safari按一次就可以alert，而firefox需要按2次 我猜firefox偷懒，没有立即对elementes重新加载或者判断 所以虽然确实效果是ubdisabled了，但是ff还认为是disabled，所以没有events，自然dispatchEvent就没了效果。我贴到了dhtml群，王好奇同学给了解决办法，加settimeout。确实，加了这个‘延时’后，也只需要按一次就可以alert了。不过我的因为是n个select联动，所以settimeout这种0秒‘延时’，导致触发不了后面的select 失效ing...
