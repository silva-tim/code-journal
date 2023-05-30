const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $photoLink = document.querySelector('#photolink');
const $notes = document.querySelector('#notes');
const $photo = document.querySelector('img');

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
