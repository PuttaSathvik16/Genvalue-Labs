// GV Agile Tab Injector for GitHub Repository Navigation
(function () {
  const PROJECT_URL = 'https://github.com/users/genvaluelabs-a11y/projects/2';

  function injectGVAgileTab() {
    if (document.getElementById('gv-agile-repo-tab')) return;

    // Locate repository navigation bar (Primer UnderlineNav)
    const navBar = 
      document.querySelector('nav[aria-label="Repository"] ul') ||
      document.querySelector('ul.UnderlineNav-body') ||
      document.querySelector('nav.UnderlineNav ul') ||
      document.querySelector('[data-view-component="true"] ul.UnderlineNav-body');

    if (!navBar) return;

    // Find Pull requests tab to inject immediately after it (exact ZenHub position)
    const pullRequestsTab = 
      navBar.querySelector('a[href*="/pulls"]')?.closest('li') ||
      navBar.querySelector('li:nth-child(3)');

    // Create GV Agile Tab Element
    const tabItem = document.createElement('li');
    tabItem.className = 'd-inline-flex gv-agile-tab-item';
    tabItem.id = 'gv-agile-repo-tab';

    const tabLink = document.createElement('a');
    tabLink.href = PROJECT_URL;
    tabLink.className = 'UnderlineNav-item gap-1';
    tabLink.setAttribute('data-tab-item', 'gv-agile');
    tabLink.title = 'GV Agile Kanban & Sprint Planning';
    tabLink.style.display = 'inline-flex';
    tabLink.style.alignItems = 'center';
    tabLink.style.gap = '6px';

    // ZenHub-style Zap Icon
    tabLink.innerHTML = `
      <svg class="octicon text-orange" width="16" height="16" viewBox="0 0 16 16" fill="#f78166" style="vertical-align: text-bottom;">
        <path d="M9.504.43a1.5 1.5 0 0 1 1.264.508l4.8 5.5a1.5 1.5 0 0 1 0 1.974l-4.8 5.5A1.5 1.5 0 0 1 9.504 14.5H1.5A1.5 1.5 0 0 1 0 13V2A1.5 1.5 0 0 1 1.5.5h8.004Zm-.62 1.5H1.5a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h7.384l4.8-5.5a.5.5 0 0 0 0-.658l-4.8-5.5Z"/>
      </svg>
      <span data-content="GV Agile" style="font-weight: 600; color: #f0f6fc;">GV Agile</span>
      <span class="Counter" style="background-color: rgba(247, 129, 102, 0.2); color: #f78166; font-weight: bold; border-radius: 2em; padding: 0 6px; font-size: 11px;">PRO</span>
    `;

    if (pullRequestsTab && pullRequestsTab.nextSibling) {
      navBar.insertBefore(tabItem, pullRequestsTab.nextSibling);
    } else {
      navBar.appendChild(tabItem);
    }

    tabItem.appendChild(tabLink);
  }

  // Initial execution
  injectGVAgileTab();

  // Handle GitHub Turbo / PJAX page transitions
  ['turbo:load', 'turbo:render', 'pjax:end', 'popstate'].forEach(evt => {
    document.addEventListener(evt, () => {
      setTimeout(injectGVAgileTab, 100);
    });
  });

  // MutationObserver for dynamic tab changes
  const observer = new MutationObserver(() => {
    if (!document.getElementById('gv-agile-repo-tab')) {
      injectGVAgileTab();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
