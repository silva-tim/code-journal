const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $photoLink = document.querySelector('#photolink');
const $notes = document.querySelector('#notes');
const $photo = document.querySelector('img');
const $ul = document.querySelector('ul');
const $viewEntryForm = document.querySelector("[data-view='entry-form']");
const $viewEntries = document.querySelector("[data-view='entries']");
const $aEntries = document.querySelector('a#entries');
const $aNew = document.querySelector('a#new');
const $noEntries = document.querySelector('#noentries');

$photoLink.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  const submission = {
    title: $title.value,
    photo: $photoLink.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };
  $ul.prepend(renderEntry(submission));
  data.nextEntryId++;
  data.entries.unshift(submission);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  viewSwap('entries');

  if ($noEntries.getAttribute('class') !== 'row hidden') {
    toggleNoEntries();
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  if (data.entries.length === 0) {
    toggleNoEntries();
  }
});

function renderEntry(entry) {
  const $li = document.createElement('li');

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.append($row);

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.append($columnHalf);

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photo);
  $image.setAttribute('alt', 'Journal Photo');
  $columnHalf.append($image);

  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row.append($columnHalf2);

  const $h2 = document.createElement('h2');
  $h2.classList.add('prozo', 'alignwithimg');
  $h2.textContent = entry.title;

  const $p = document.createElement('p');
  $p.classList.add('opensans');
  $p.textContent = entry.notes;
  $columnHalf2.append($h2, $p);
  return $li;
}

function toggleNoEntries() {
  $noEntries.classList.toggle('hidden');
}

function viewSwap(view) {
  if (view === 'entries') {
    $viewEntries.classList.remove('hidden');
    $viewEntryForm.classList.add('hidden');
  } else if (view === 'entry-form') {
    $viewEntries.classList.add('hidden');
    $viewEntryForm.classList.remove('hidden');
  }

  data.view = view;
}

$aEntries.addEventListener('click', function (event) {
  viewSwap('entries');
});

$aNew.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
toggleNoEntries();
