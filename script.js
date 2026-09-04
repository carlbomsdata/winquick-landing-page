document.getElementById('year').textContent = new Date().getFullYear();

/* Copy buttons. A <button> is keyboard-activatable already; what it needs is
   feedback that a screen reader also receives, hence the live region. */
for (const button of document.querySelectorAll('.copy-button')) {
  // The live region has to exist before the text changes, or a screen reader
  // has nothing to watch and the change goes unannounced.
  button.setAttribute('aria-live', 'polite');
  const say = (text) => {
    const original = button.dataset.label || button.textContent;
    button.dataset.label = original;
    button.textContent = text;
    setTimeout(() => { button.textContent = original; }, 1400);
  };
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      say('Copied');
    } catch {
      say('Press ⌘C to copy');
    }
  });
}

/* Tabs, following the WAI-ARIA pattern: one tab in the tab order, arrows move
   between them, and the panel is exposed only while selected. */
for (const list of document.querySelectorAll('[role="tablist"]')) {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  if (!tabs.length) continue;

  const select = (tab, focus) => {
    for (const t of tabs) {
      const on = t === tab;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) {
        panel.classList.toggle('active', on);
        panel.hidden = !on;
      }
    }
    if (focus) tab.focus();
  };

  list.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) select(tab, false);
  });

  list.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const keys = {
      ArrowRight: (i + 1) % tabs.length,
      ArrowLeft: (i - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(tabs[keys[e.key]], true);
  });
}
