const strip = document.querySelector('.file-tabs');
const tabs = [...strip.querySelectorAll('a')];
const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));

function openFile(index) {
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
    panels[i].hidden = i !== index;
  });
}

function openLinkedFile() {
  const index = tabs.findIndex(tab => tab.hash === location.hash);
  openFile(index < 0 ? 0 : index);
}

strip.setAttribute('role', 'tablist');
tabs.forEach((tab, index) => {
  const panel = panels[index];
  tab.id = panel.id + '-tab';
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', panel.id);
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', tab.id);
  tab.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openFile(index);
    history.replaceState(null, '', tab.hash);
  });
  tab.addEventListener('keydown', event => {
    const next = { ArrowLeft: (index + tabs.length - 1) % tabs.length,
      ArrowRight: (index + 1) % tabs.length, Home: 0, End: tabs.length - 1,
      ' ': index }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  });
});
window.addEventListener('hashchange', openLinkedFile);
openLinkedFile();
