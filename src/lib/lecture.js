import {
  empty,
  el,
  markRead,
  isRead
} from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('main');
  }

  fixLines(data, type, container) {
    const text = data.split('\n');
    const newText = el(container);
    let chick;
    text.forEach((item) => {
      if (item.length > 0) {
        chick = newText.appendChild(el(type, item));
      }
      if (item.length === 0) {
        chick.setAttribute('class', 'fat');
      }
    });
    return newText;
  }

  buildCode(data) {
    const code = this.fixLines(data, 'p', 'code');
    return code;
  }

  buildList(data) {
    const result = el('ul');
    for (let i = 0; i < data.length; i += 1) {
      result.appendChild(el('li', data[i]));
    }
    return result;
  }

  buildHeading(data) {
    const heading = el('h2', data);
    return heading;
  }

  buildImage(data) {
    const fig = el('figure');
    const caption = el('figcaption', data.caption);
    const image = el('img');
    image.setAttribute('src', data.data);
    image.setAttribute('alt', '');
    fig.appendChild(image);
    fig.appendChild(caption);
    return fig;
  }

  buildQuote(data) {
    const quote = el('blockquote', data.data, el('p', data.attribute));
    return quote;
  }

  buildText(data) {
    const text = this.fixLines(data, 'p', 'div');
    return text;
  }

  buildVideo(data) {

    const video = el('iframe');
    video.setAttribute('title', 'Youtube Video');
    video.setAttribute('class', 'youtube-player');
    video.setAttribute('type', 'text/html');
    video.setAttribute('height', '450px');
    video.setAttribute('src', data);
    video.setAttribute('frameborder', 0);
    video.setAttribute('allowFullScreen', true);

    return video;
  }

  getContent(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const result = el('div');
    result.setAttribute('class', 'lecture full');

    for (let i = 0; i < keys.length; i += 1) {
      const section = el('section');
      const contentType = values[i].type || null;
      switch (contentType) {
        case 'youtube':
          section.appendChild(this.buildVideo(values[i].data));
          break;
        case 'text':
          section.appendChild(this.buildText(values[i].data));
          break;
        case 'quote':
          section.appendChild(this.buildQuote(values[i]));
          break;
        case 'image':
          section.appendChild(this.buildImage(values[i]));
          break;
        case 'heading':
          section.appendChild(this.buildHeading(values[i].data));
          break;
        case 'list':
          section.appendChild(this.buildList(values[i].data));
          break;
        case 'code':
          section.appendChild(this.buildCode(values[i].data));
          break;
        default:
          break;
      }
      result.appendChild(section);
    }

    return result;
  }

  buildLecture(data) {
    const {
      slug,
      title,
      category,
      image,
      content
    } = data;
    const isLectureRead = isRead(slug);
    const result = this.container;
    const banner = document.querySelector('.banner');
    const link = el('a', document.createTextNode('Klára fyrirlestur'));
    link.setAttribute('href', 'index.html');
    link.setAttribute('class', 'list__return');
    link.setAttribute('data', slug);
    link.onclick = markRead;

    if (isLectureRead) {
      link.classList.add('marked');
      link.innerHTML = '<span>&#10004;</span> Fyrirlestur kláraður';
    }

    banner.appendChild(el('h4', category));
    banner.appendChild(el('h1', title));
    if (image) {
      banner.setAttribute('style', `background-image:url(${image});`);
    }

    result.appendChild(this.getContent(content));
    result.appendChild(link);
  }

  getSlug(paramName) {
    const searchString = window.location.search.substring(1);
    let slug = searchString.split('&');
    const params = searchString.split('&');
    for (let i = 0; i < params.length; i += 1) {
      slug = params[i].split('=');
      if (slug[0] === paramName) {
        return slug[1];
      }
    }
    return null;
  }

  getLecture() {
    const search = this.getSlug('slug');
    return fetch('./lectures.json', {})
      .then(response => response.json())
      .then((data) => {
        empty(this.container);
        for (let i = 0; i < data.lectures.length; i += 1) {
          if (data.lectures[i].slug === search) {
            this.buildLecture(data.lectures[i]);
          }
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('ERROR:Fetch aborted');
        } else {
          console.log('ERROR:', err);
        }
      });
  }

  load() {
    this.getLecture();
  }
}
