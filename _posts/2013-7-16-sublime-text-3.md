---
layout: post
title: sublime text 3设置
date: 2013-07-16 18:46:10
categories: 好
tags: sublime-text
---

这是我的sublime text 3 用户设置，备注在这里。

```js
{
  "close_windows_when_empty": true,
  "draw_indent_guides": true,
  "draw_white_space": "all",
  "ensure_newline_at_eof_on_save": false,
  "file_exclude_patterns":
      [
        ".DS_Store",
        "*.lib",
        "*.log"
      ],
  "folder_exclude_patterns":
      [
        ".git",
        ".bundle",
        ".sass-cache",
        ".svn",
        ".hg"
      ],
  "font_size": 18,
  "highlight_line": true,
  "highlight_modified_tabs": true,
  "ignored_packages":
      [
        "Vintage",
        "SublimeLinter"
      ],
  "line_padding_bottom": 3,
  "line_padding_top": 3,
  "open_files_in_new_window": false,
  "remember_open_files": true,
  "remember_open_folders": true,
  "sublimelinter": "save-only",
  "scroll_past_end": true,
  "scroll_speed": 2,
  "show_full_path": true,
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "trim_trailing_white_space_on_save": true,
  "use_simple_full_screen": true,
  "wide_caret": true,
  "word_wrap": true
}

```
配置一部分来自于<http://blog.manikrathee.com/posts/2013/07/27/sublime-text.html>

此外win下的github，修改默认配置.gitconfig，增加

```
[core]
  autocrlf = false
  safecrlf = true
```

刚开始写代码用的是editplus，后来换成了vs。有了mac后寻找mac上也能用的编辑器，st就这么入眼。1年前开始，几乎天天用，也忍受了大半年的弹窗提示。完全适应后，几个月前终于买了个授权，现在清爽了。
