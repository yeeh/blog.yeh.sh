---
layout: post
title: Skins
date: 2026-06-05 00:00:00
tags: skins
theme: about
---

Pick a season. It is saved locally in this browser.

<div class="skin-list" role="group" aria-label="Site skins">
  <button class="skin-option" type="button" data-skin="spring"><strong>Spring</strong><span>green signal, new leaves</span></button>
  <button class="skin-option" type="button" data-skin="summer"><strong>Summer</strong><span>black ink, long night heat</span></button>
  <button class="skin-option" type="button" data-skin="autumn"><strong>Autumn</strong><span>warm paper, yellow-brown leaf tone</span></button>
  <button class="skin-option" type="button" data-skin="winter"><strong>Winter</strong><span>white snow, quiet monochrome</span></button>
</div>

<script>
(function () {
  var key = 'yeh-blog-skin';
  var aliases = { mono:'winter', swiss:'winter', ink:'summer', warm:'autumn', signal:'spring' };
  var skins = /^(spring|summer|autumn|winter)$/;
  var root = document.documentElement;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-skin]'));

  function normalize(skin) {
    skin = aliases[skin] || skin;
    return skins.test(skin || '') ? skin : 'spring';
  }

  function current() {
    try {
      return normalize(localStorage.getItem(key) || root.getAttribute('data-theme') || 'spring');
    } catch (e) {
      return normalize(root.getAttribute('data-theme') || 'spring');
    }
  }

  function apply(skin) {
    skin = normalize(skin);
    root.setAttribute('data-theme', skin);
    try { localStorage.setItem(key, skin); } catch (e) {}
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-skin') === skin ? 'true' : 'false');
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      apply(button.getAttribute('data-skin'));
    });
  });

  apply(current());
}());
</script>
