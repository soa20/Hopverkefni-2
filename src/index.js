import List from './lib/list';
import Lecture from './lib/lecture'

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture__page');
  const filterButton = document.querySelectorAll('.filterButton');
  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    const list = new List();
    list.load();
    for (let i = 0; i < filterButton.length; i++) {
      filterButton[i].addEventListener('click', list.setFilter);
    }
  }
});
