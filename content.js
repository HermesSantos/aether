if (!document.getElementById('custom-input-overlay')) {
  const overlay = document.createElement('div');
  overlay.id = 'custom-input-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '999999';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Text to search...';
  input.style.padding = '10px';
  input.style.fontSize = '18px';
  input.style.borderRadius = '10px';
  input.style.backgroundColor = 'rgb(31, 31, 30)';
  input.style.color = 'white';
  input.style.border = '1px solid grey';
  input.style.width = '500px';
  input.id = 'aether-input';

  overlay.appendChild(input);
  document.body.appendChild(overlay);
  input.focus();

  function escListener(e) {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escListener);
    }
    if (e.key === 'Enter') {
      const value = input.value.trim();

      overlay.remove();
      document.removeEventListener('keydown', escListener);

      chrome.runtime.sendMessage({
        action: 'openTab',
        query: value
      });
    }
  }

  document.addEventListener('keydown', escListener);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}
