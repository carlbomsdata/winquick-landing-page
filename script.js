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
