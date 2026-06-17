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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggle);
  } else {
    bindToggle();
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
