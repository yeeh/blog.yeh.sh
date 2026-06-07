---
layout: post
title: 新装mac
date: 2021-11-12 9:00:00
categories: 手
tags: iterm2 oh-my-zsh zsh
---

#### 设置：

不开共享数据给apple，不开siri录音给apple

联网，appleid登陆

3指拖移缩放窗口

设备改名

finder设置

1password

surge

xcode

设置zsh为默认

```sh
#zsh设为默认
chsh -s `which zsh`

#确认zsh默认结果
echo $SHELL
```

iterm2+ohmyzsh，+插件，更改ssh默认目录，ssh-add+证书

安装[itrem2](https://www.iterm2.com/)
安装[ohmyzsh](https://ohmyz.sh/)

```sh
cd ~/.oh-my-zsh/custom/plugins/
git clone https://github.com/zsh-users/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
```

```sh
vim ~/.zshrc

#添加插件
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)

#添加默认rsa
ssh-add ~/.ssh/xxx_rsa

#设置shell的默认路径
cd /Users/***/***

#设置npm alias

```

```sh
# 要加文件权限
chmod 400 xxx_rsa
```

alfred4+快捷键

输入法切换 / launchpad 快捷键

webstorm等编辑器

notion

timemachine备份

chrome登陆

macos账号添加gmail

message / facetime接收设置

telegram 等聊天工具

office365 等办公工具

图片处理工具

moneywiz

iina等影音工具

netdownloadmanager等下载工具
