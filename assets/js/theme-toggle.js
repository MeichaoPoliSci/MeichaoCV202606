(function () {
  var storageKey = 'meichao-theme';
  var root = document.documentElement;
  var mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function storedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function systemTheme() {
    return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || storedTheme() || systemTheme();
  }

  function applyTheme(theme) {
    var toggle = document.getElementById('theme-toggle');
    var isDark = theme === 'dark';

    root.setAttribute('data-theme', theme);

    if (toggle) {
      toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      toggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function bindToggle() {
    var toggle = document.getElementById('theme-toggle');

    applyTheme(currentTheme());

    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function () {
      var nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
      saveTheme(nextTheme);
      applyTheme(nextTheme);
    });
  }

  function bindNavigation() {
    var toggle = document.getElementById('nav-toggle');
    var navigation = document.getElementById('site-navigation');

    if (!toggle || !navigation || !navigation.parentNode) {
      return;
    }

    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      navigation.parentNode.classList.toggle('is-open', isOpen);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', function (event) {
      if (event.target && event.target.tagName === 'A') {
        setOpen(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      bindToggle();
      bindNavigation();
    });
  } else {
    bindToggle();
    bindNavigation();
  }

  if (mediaQuery) {
    var onSystemThemeChange = function () {
      if (!storedTheme()) {
        applyTheme(systemTheme());
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(onSystemThemeChange);
    }
  }
}());
