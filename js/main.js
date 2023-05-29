const $photoLink = document.querySelector('#photolink');
const $photo = document.querySelector('img');

$photoLink.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});
