// import * as Helper from './helpers';
import { empty, getData } from './helpers'

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  load() {
    empty(this.container);
    let lectures = getData();
    this.container.innerHTML = JSON.stringify(lectures);
  }
}
