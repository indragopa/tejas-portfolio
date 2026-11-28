const tools = document.querySelector('.archive-tools');
const input = document.querySelector('#story-search');
const stories = Array.from(document.querySelectorAll('.archive-list a'));
const count = document.querySelector('#story-count');
const empty = document.querySelector('.no-stories');

function normalize(value) {
  return value.normalize('NFC').toLowerCase().replace(/[\s-]+/g, ' ').trim();
}

function filterStories() {
  const query = normalize(input.value);
  let matches = 0;
  for (const story of stories) {
    const title = story.querySelector('span').textContent;
    story.hidden = !normalize(title + ' ' + story.dataset.slug).includes(query);
    if (!story.hidden) matches++;
  }
  count.textContent = matches + (matches === 1 ? ' story' : ' stories');
  empty.hidden = matches > 0;
}

tools.hidden = false;
input.addEventListener('input', filterStories);
window.addEventListener('pageshow', filterStories);
filterStories();
