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
const $h1 = document.querySelector('h1');
const $delete = document.querySelector('button#delete');
const $background = document.querySelector('div.background');
const $modal = document.querySelector('div#modal');
const $search = document.querySelector('#search');
const $magnify = document.querySelector('#magnify');

// Re-renders previous entries if there are any and switches to view user left page on.
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntry(data.entries[i]));
  }

  if (data.entries.length === 0) {
    toggleNoEntries();
  }
  viewSwap(data.view);
});

// Function for creating DOM tree and rendering entries based on form inputs.
function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $row = document.createElement('div');
  $row.classList.add('row');
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

  const $row2 = document.createElement('div');
  $row2.classList.add('row');
  $columnHalf2.append($row2);

  const $columnAlwaysHalf = document.createElement('div');
  $columnAlwaysHalf.classList.add('column-alwayshalf');
  $row2.append($columnAlwaysHalf);

  const $h2 = document.createElement('h2');
  $h2.classList.add('prozo', 'alignwithimg');
  $h2.textContent = entry.title;
  $columnAlwaysHalf.append($h2);

  const $columnAlwaysHalf2 = document.createElement('div');
  $columnAlwaysHalf2.classList.add('column-alwayshalf', 'justifyright');
  $row2.append($columnAlwaysHalf2);

  const $pencilIcon = document.createElement('i');
  $pencilIcon.classList.add('fa', 'fa-pencil', 'alignwithimg');
  $pencilIcon.setAttribute('aria-hidden', 'true');
  $columnAlwaysHalf2.append($pencilIcon);

  const $row3 = document.createElement('div');
  $row3.classList.add('row');
  $columnHalf2.append($row3);

  const $columnFull = document.createElement('div');
  $columnFull.classList.add('column-full');
  $row3.append($columnFull);

  const $p = document.createElement('p');
  $p.classList.add('opensans');
  $p.textContent = entry.notes;
  $columnFull.append($p);
  return $li;
}

// Sets photo to the link inputed into $photoLink.
$photoLink.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});

/* Submit button that handles two situations, first if it is a new entry it will
 create the object, render and add it to the entries page and add the new object
 to the data.entries array. If it is an edited entry it will keep the entryId
 consistent and render/replace the original entry in both the entries page and
 the data.entries array. Finally it checks if $noEntries is on and turns it off
 and resets the form/picture and switches to entries view. */
$form.addEventListener('submit', function (event) {
  event.preventDefault();

  const submission = {
    title: $title.value,
    photo: $photoLink.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };

  if (data.editing === null) {
    $ul.prepend(renderEntry(submission));
    data.nextEntryId++;
    data.entries.unshift(submission);
  } else if (data.editing !== null) {
    submission.entryId = data.editing.entryId;
    data.entries[data.entries.indexOf(data.editing)] = submission;

    const $originalLI = document.querySelector("[data-entry-id='" + submission.entryId + "']");
    $originalLI.replaceWith(renderEntry(submission));
  }

  if ($noEntries.getAttribute('class') !== 'row hidden') {
    toggleNoEntries();
  }

  resetForm();
  viewSwap('entries');
});

// Function to toggle $noEntries.
function toggleNoEntries() {
  $noEntries.classList.toggle('hidden');
}

// Function to swap views.
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

// Events to switch entries on click.
$aEntries.addEventListener('click', function (event) {
  resetForm();
  viewSwap('entries');
});

$aNew.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

// Event to setup form for the editing ability. Inputs all values of data.editing and switches view to entry-form.
$ul.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number(event.target.closest('li').getAttribute('data-entry-id'))) {
      data.editing = data.entries[i];

      $form.elements.title.value = data.editing.title;
      $form.elements.photolink.value = data.editing.photo;
      $form.elements.notes.value = data.editing.notes;
      $photo.setAttribute('src', data.editing.photo);
      $h1.textContent = 'Edit Entry';
      $delete.classList.remove('hidden');
    }
  }
  viewSwap('entry-form');
});

$delete.addEventListener('click', function (event) {
  $modal.classList.remove('hidden');
  $background.classList.remove('hidden');
});

$modal.addEventListener('click', function (event) {
  if (event.target.getAttribute('id') === 'cancel') {
    hideModal();
  } else if (event.target.getAttribute('id') === 'confirm') {
    data.entries.splice(data.entries.indexOf(data.editing), 1);
    const $currentLI = document.querySelector("[data-entry-id='" + data.editing.entryId + "']");
    $currentLI.remove();

    resetForm();
    hideModal();

    if (data.entries.length < 1) {
      toggleNoEntries();
    }
    viewSwap('entries');
  }
});

function resetForm() {
  $form.reset();
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $h1.textContent = 'New Entry';
  data.editing = null;
  $delete.classList.add('hidden');
}

function hideModal() {
  $modal.classList.add('hidden');
  $background.classList.add('hidden');
}

$magnify.addEventListener('click', function (event) {
  if (!$search.classList.contains('hidden')) {
    unrenderAll();
    for (let i = 0; i < data.entries.length; i++) {
      $ul.append(renderEntry(data.entries[i]));
    }
  }
  $search.classList.toggle('hidden');
  $search.focus();
  $search.value = '';
});

$search.addEventListener('input', function (event) {
  unrenderAll();
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].title.toLowerCase().includes(event.target.value.toLowerCase())) {
      $ul.append(renderEntry(data.entries[i]));
    }
  }
});

function unrenderAll() {
  const $lis = document.querySelectorAll('li');
  $lis.forEach(function (element) {
    element.remove();
  });
}
