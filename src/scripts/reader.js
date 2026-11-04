const entries = [...document.querySelectorAll('[data-cv-entry]')];
const toolbar = document.querySelector('[data-reader-toolbar]');
const position = document.querySelector('[data-reader-position]');
const status = document.querySelector('[data-reader-status]');
const previous = document.querySelector('[data-reader-prev]');
const next = document.querySelector('[data-reader-next]');
const copy = document.querySelector('[data-reader-copy]');
const close = document.querySelector('[data-reader-close]');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let selected = null;
let savedHash = '';
let copyVersion = 0;

function visible(entry) {
  return entry.getClientRects().length > 0;
}
function groupEntries(entry) {
  return [...entry.closest('[data-cv-group]').querySelectorAll('[data-cv-entry]')].filter(visible);
}
function updateHash(hash) {
  const url = new URL(window.location.href);
  url.hash = hash;
  history.replaceState(history.state, '', url);
}
function announce(message) {
  status.textContent = message;
}
function select(entry, { focus = true, behavior, scroll = true } = {}) {
  if (!entry || !visible(entry)) return;
  if (!selected) savedHash = window.location.hash;
  selected?.removeAttribute('data-selected');
  selected?.querySelector('[data-entry-select]')?.removeAttribute('aria-current');
  selected = entry;
  selected.setAttribute('data-selected', 'true');
  const trigger = selected.querySelector('[data-entry-select]');
  trigger.setAttribute('aria-current', 'true');
  const group = groupEntries(selected);
  const index = group.indexOf(selected);
  position.textContent = `${selected.closest('[data-cv-group]').dataset.cvGroup} · ${index + 1} / ${group.length}`;
  // aria-disabled keeps focus stable on the toolbar at the first/last item.
  previous.setAttribute('aria-disabled', String(index === 0));
  next.setAttribute('aria-disabled', String(index === group.length - 1));
  toolbar.hidden = false;
  copyVersion++;
  copy.removeAttribute('data-copied');
  copy.setAttribute('aria-label', 'Copy link to selected entry');
  announce(`${trigger.textContent.replace(trigger.querySelector('[aria-hidden]')?.textContent ?? '', '').trim()}. ${position.textContent}. Arrow keys move between entries. Escape clears selection.`);
  updateHash(`#${entry.id}`);
  if (focus) trigger.focus({ preventScroll: true });
  if (scroll) entry.scrollIntoView({ block: 'center', behavior: behavior ?? (reduced.matches ? 'instant' : 'smooth') });
}
function clear({ focus = false, announceChange = true } = {}) {
  if (!selected) return;
  const trigger = selected.querySelector('[data-entry-select]');
  selected.removeAttribute('data-selected');
  trigger.removeAttribute('aria-current');
  selected = null;
  copyVersion++;
  toolbar.hidden = true;
  if (entries.some(entry => `#${entry.id}` === savedHash)) savedHash = '';
  updateHash(savedHash);
  if (focus && trigger.getClientRects().length) trigger.focus({ preventScroll: true });
  if (announceChange) announce('Selection cleared.');
}
function move(delta, focus = true) {
  if (!selected) return;
  const group = groupEntries(selected);
  const index = group.indexOf(selected) + delta;
  if (index >= 0 && index < group.length) select(group[index], { focus });
}
function onKey(event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === ' ' && event.target.matches('[data-entry-select]')) {
    event.preventDefault();
    select(event.target.closest('[data-cv-entry]'));
    return;
  }
  if (!selected) return;
  if (event.target.closest('input,select,textarea,[contenteditable="true"]')) return;
  const inToolbar = toolbar.contains(event.target);
  const currentEntry = event.target.closest('[data-cv-entry]');
  if (!inToolbar && currentEntry !== selected) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    clear({ focus: inToolbar });
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    move(event.key === 'ArrowDown' ? 1 : -1, !inToolbar);
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    const group = groupEntries(selected);
    select(group[event.key === 'Home' ? 0 : group.length - 1], { focus: !inToolbar });
  } else if (event.key === ' ' && event.target.matches('[data-entry-select]')) {
    event.preventDefault();
    select(selected);
  }
}
for (const entry of entries) {
  entry.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.getSelection()?.toString()) return;
    const interactive = event.target.closest('a,button,input,select,textarea,summary,details');
    if (interactive && !interactive.matches('[data-entry-select]')) return;
    event.preventDefault();
    select(entry);
  });

}
document.querySelectorAll('[data-cv-group]').forEach(group => group.addEventListener('keydown', onKey));
toolbar.addEventListener('keydown', onKey);
previous.addEventListener('click', () => move(-1, false));
next.addEventListener('click', () => move(1, false));
close.addEventListener('click', () => clear({ focus: true }));
copy.addEventListener('click', async () => {
  const version = copyVersion;
  try {
    await navigator.clipboard.writeText(window.location.href);
    if (version !== copyVersion) return;
    copy.setAttribute('data-copied', 'true');
    copy.setAttribute('aria-label', 'Link copied');
    announce('Link to selected entry copied.');
  } catch {
    if (version === copyVersion) announce('Could not copy. You can copy the selected entry’s link from the address bar.');
  }
});
document.querySelector('#skills')?.addEventListener('change', () => {
  if (selected?.closest('#skills') && !visible(selected)) clear();
  else if (selected?.closest('#skills')) select(selected, { focus: false, scroll: false });
});
// A native anchor navigation restores browser behavior and clears stale selection.
window.addEventListener('hashchange', () => {
  const entry = entries.find(entry => `#${entry.id}` === window.location.hash);
  if (entry) {
    ensureVisible(entry);
    select(entry, { focus: false });
  }
  else if (selected) {
    savedHash = window.location.hash;
    clear({ announceChange: false });
  }
});
function ensureVisible(entry) {
  const all = document.querySelector('#skills input[value="all"]');
  if (entry.closest('#skills') && !visible(entry) && all) {
    all.checked = true;
    all.dispatchEvent(new Event('change', { bubbles: true }));
  }
}
const initial = entries.find(entry => `#${entry.id}` === window.location.hash);
if (initial) {
  ensureVisible(initial);
  select(initial, { focus: false, behavior: 'instant' });
  // Fragment navigation and restored scroll can run after a deferred module.
  // Re-center once after the page and local fonts settle, never on every resize.
  const settleInitial = () => {
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => window.requestAnimationFrame(() => {
      if (selected === initial) initial.scrollIntoView({ block: 'center', behavior: 'instant' });
    }));
  };
  if (document.readyState === 'complete') settleInitial();
  else window.addEventListener('pageshow', settleInitial, { once: true });
}
document.querySelectorAll('[data-reader-enhancement]').forEach(element => { element.hidden = false; });
// Restore the reader's own choices after print preview, not an arbitrary default.
let printState = [];
window.addEventListener('beforeprint', () => {
  if (printState.length) return;
  printState = [...document.querySelectorAll('details')].map(element => [element, element.open]);
  printState.forEach(([element]) => { element.open = true; });
  if (selected) selected.scrollIntoView({ block: 'nearest', behavior: 'instant' });
});
window.addEventListener('afterprint', () => {
  printState.forEach(([element, open]) => { element.open = open; });
  printState = [];
});

for (const details of document.querySelectorAll('[data-cv-entry] details')) {
  details.addEventListener('toggle', () => {
    const entry = details.closest('[data-cv-entry]');
    if (entry === selected) entry.scrollIntoView({ block: 'center', behavior: reduced.matches ? 'instant' : 'smooth' });
  });
}
