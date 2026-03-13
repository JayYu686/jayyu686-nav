const fs = require('fs');
let code = fs.readFileSync('src/pages/index.astro', 'utf8');

// Theming variables. 
code = code.replace(
      /:root \{[^}]*\}/,
      \:root {
        --panel: rgba(18, 26, 43, 0.55);
        --panel-active: rgba(255, 255, 255, 0.12);
        --text: #f0f6fc;
        --text-sub: #c9d1d9;
        --muted: #8b949e;
        --line: rgba(255, 255, 255, 0.08);
        --accent: #58a6ff;
        --accent-hover: #79c0ff;
        --gradient: linear-gradient(135deg, #58a6ff 0%, #00f2fe 100%);
        --bg-color: #0b1020;
        --card-bg: rgba(22, 27, 34, 0.5);
      }
      
      :root[data-theme="light"] {
        --panel: rgba(245, 245, 247, 0.75);
        --panel-active: rgba(255, 255, 255, 0.9);
        --text: #1d1d1f;
        --text-sub: #424245;
        --muted: #86868b;
        --line: rgba(0, 0, 0, 0.08);
        --accent: #0066cc;
        --accent-hover: #0077ed;
        --gradient: linear-gradient(135deg, #001f3f 0%, #0088ff 100%);
        --bg-color: #fbfbfd;
        --card-bg: rgba(255, 255, 255, 0.7);
      }\
);

code = code.replace(
      /body \{[\s\S]*?\}/,
      \ody {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "PingFang SC", "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
        background-color: var(--bg-color);
        color: var(--text);
        min-height: 100vh;
        overflow-x: hidden;
        transition: background-color 0.4s ease, color 0.4s ease;
      }\
);

code = code.replace(
      /\.aurora-bg \{[\s\S]*?\}/,
      \.aurora-bg {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: -1;
        overflow: hidden;
        background: var(--bg-color);
        transition: background-color 0.4s ease;
      }\
);

code = code.replace(
      /<head>/,
      \<head>
    <script is:inline>
      (function(){
        try {
          var localTheme = localStorage.getItem('theme');
          var sysTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
          var theme = localTheme || sysTheme;
          if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
          }
        } catch(e) {}
      })();
    </script>\
);

const newCSS = \.theme-btn {
        position: fixed;
        top: 24px;
        right: 24px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--panel);
        border: 1px solid var(--line);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 100;
        color: var(--text);
        transition: all 0.3s ease;
      }
      .theme-btn:hover {
        background: var(--panel-active);
        transform: scale(1.05);
      }
      .theme-btn svg { width: 20px; height: 20px; fill: currentColor; }
      :root[data-theme="light"] .sun-icon { display: none; }
      :root:not([data-theme="light"]) .moon-icon { display: none; }
      
      .wrap {\;

code = code.replace(/\.wrap \{/, newCSS);

const heroHTML = \<main class="wrap">
      <section class="hero">\;
const heroNewHTML = \<button class="theme-btn" id="theme-toggle" aria-label="Toggle Theme">
      <svg class="sun-icon" viewBox="0 0 24 24">
        <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7z M2,13h2c0.55,0,1-0.45,1-1s-0.45-1-1-1H2c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13h2c0.55,0,1-0.45,1-1s-0.45-1-1-1h-2c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1S11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0s-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0s-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41s-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41s-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path>
      </svg>
      <svg class="moon-icon" viewBox="0 0 24 24">
        <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path>
      </svg>
    </button>
    <main class="wrap">
      <section class="hero">\;
code = code.replace(heroHTML, heroNewHTML);


code = code.replace(".card {", \.card { background: var(--card-bg);\);

const endScript = \      input.addEventListener('input', applyFilters);
    </script>\;

const newScript = \      input.addEventListener('input', applyFilters);

      const themeToggleBtn = document.getElementById('theme-toggle');
      if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
          const root = document.documentElement;
          if (root.getAttribute('data-theme') === 'light') {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
          } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
          }
        });
      }
    </script>\;
code = code.replace(endScript, newScript);

fs.writeFileSync('src/pages/index.astro', code);
