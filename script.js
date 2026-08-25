document.getElementById('year').textContent = new Date().getFullYear();

for (const button of document.querySelectorAll('.copy-button')) {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy || '';
    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = original; }, 1200);
    } catch {
      button.textContent = 'Copy failed';
    }
  });
}

for (const tab of document.querySelectorAll('.code-tab')) {
  tab.addEventListener('click', () => {
    const name = tab.dataset.tab;
    document.querySelectorAll('.code-tab').forEach((item) => item.classList.toggle('active', item === tab));
    document.querySelectorAll('.code-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === name));
  });
}
