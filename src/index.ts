import * as _ from 'lodash';
import './index.scss';
import svenImage from './assets/sven-business-casual.JPG';
import { logMe } from './log';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'World'], ' ');
  element.classList.add('hello');

  const myImage = new Image();
  myImage.src = svenImage;
  element.appendChild(myImage);

  const button = document.createElement('button');
  button.innerHTML = 'Click Me';
  button.onclick = logMe;
  element.appendChild(button);

  return element;
}

document.body.appendChild(component());
