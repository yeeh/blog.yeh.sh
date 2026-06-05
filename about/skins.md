---
layout: post
title: SKINS
date: 2026-06-05 00:00:00
tags: skins
theme: about
comment: false
---

Pick a skin. It is saved locally in this browser.

<div class="skin-list" role="group" aria-label="Site skins">
  <button class="skin-option" type="button" data-skin="mono"><strong>Mono</strong><span>plain monochrome archive</span></button>
  <button class="skin-option" type="button" data-skin="swiss"><strong>Swiss</strong><span>warm paper, black type, small IKB accent</span></button>
  <button class="skin-option" type="button" data-skin="ink"><strong>Ink</strong><span>near-black page, soft paper text</span></button>
  <button class="skin-option" type="button" data-skin="warm"><strong>Warm</strong><span>quiet note paper, brown-black ink</span></button>
  <button class="skin-option" type="button" data-skin="signal"><strong>Signal</strong><span>technical grey-green signal tone</span></button>
</div>

<script>
(function () {
  var key = 'yeh-blog-skin';
  var skins = /^(mono|swiss|ink|warm|signal)$/;
  var root = document.documentElement;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-skin]'));

  function current() {
    try {
      return localStorage.getItem(key) || root.getAttribute('data-theme') || 'swiss';
    } catch (e) {
      return root.getAttribute('data-theme') || 'swiss';
    }
  }

  function apply(skin) {
    if (!skins.test(skin || '')) skin = 'swiss';
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
