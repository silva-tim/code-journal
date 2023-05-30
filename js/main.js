const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $photoLink = document.querySelector('#photolink');
const $notes = document.querySelector('#notes');
const $photo = document.querySelector('img');
const $ul = document.querySelector('ul');

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

  data.nextEntryId++;
  data.entries.unshift(submission);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntry(data.entries[i]));
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
