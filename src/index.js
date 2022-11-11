import _ from 'lodash';
import './index.css';
import svenImage from './assets/sven-business-casual.JPG';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'World'], ' ');
  element.classList.add('hello');

  const myImage = new Image();
  myImage.src = svenImage;
  element.appendChild(myImage);

  return element
}

document.body.appendChild(component());
