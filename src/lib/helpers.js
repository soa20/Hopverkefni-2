export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function getData() {
  fetch('./lectures.json', {})
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      return data.lectures;
    })
    .catch((err) => {
      if (err.name === 'AbortError') {
        console.log('ERROR:Fetch aborted');
      } else {
        console.log('ERROR:', err);
      }
    });
}
