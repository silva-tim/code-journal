/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  data.editing = null;
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

const previousDataJSON = localStorage.getItem('data');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
