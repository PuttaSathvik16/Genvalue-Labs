// GV Agile Tab Injector for GitHub Repository Navigation
(function () {
  const PROJECT_BOARD_URL = 'https://github.com/users/genvaluelabs-a11y/projects/2/views/2';

  function injectGVAgileTab() {
    if (document.getElementById('gv-agile-repo-tab')) return;

    // Locate repository navigation bar (Primer UnderlineNav)
    const navBar = 
      document.querySelector('nav[aria-label="Repository"] ul') ||
      document.querySelector('ul.UnderlineNav-body') ||
      document.querySelector('nav.UnderlineNav ul') ||
      document.querySelector('[data-view-component="true"] ul.UnderlineNav-body');

    if (!navBar) return;

    // Find Actions tab or Projects tab to place in between Actions and Projects
    const actionsTab = 
      navBar.querySelector('a[href*="/actions"]')?.closest('li') ||
      navBar.querySelector('a[data-tab-item*="actions"]')?.closest('li');

    const projectsTab = 
      navBar.querySelector('a[href*="/projects"]')?.closest('li') ||
      navBar.querySelector('a[data-tab-item*="projects"]')?.closest('li');

    // Create GV Agile Tab Element with 100% Native GitHub Primer markup
    const tabItem = document.createElement('li');
    tabItem.className = 'd-inline-flex';
    tabItem.setAttribute('data-view-component', 'true');
    tabItem.id = 'gv-agile-repo-tab';

    const tabLink = document.createElement('a');
    tabLink.id = 'gv-agile-tab';
    tabLink.href = PROJECT_BOARD_URL;
    tabLink.className = 'UnderlineNav-item';
    tabLink.setAttribute('data-tab-item', 'gv-agile-tab');
    tabLink.setAttribute('data-view-component', 'true');
    tabLink.title = 'GV Agile Kanban Board & Sprint Planning';

    // Exact GitHub UnderlineNav structure: SVG with UnderlineNav-octicon + span[data-content]
    tabLink.innerHTML = `
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-zap UnderlineNav-octicon">
        <path d="M7.747.054a.75.75 0 0 1 .506.71v5.986h4.997a.75.75 0 0 1 .59 1.213l-7.25 9a.75.75 0 0 1-1.24-.766l1.32-5.433H2.25a.75.75 0 0 1-.59-1.213l6-7.5a.75.75 0 0 1 .087-.075Z"></path>
      </svg>
      <span data-content="GV Agile">GV Agile</span>
    `;

    // Insert between Actions and Projects
    if (projectsTab) {
      navBar.insertBefore(tabItem, projectsTab);
    } else if (actionsTab && actionsTab.nextSibling) {
      navBar.insertBefore(tabItem, actionsTab.nextSibling);
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
