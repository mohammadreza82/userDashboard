import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import Modal from 'react-modal';

// Create a root element for react-modal
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

// Set app element for react-modal
Modal.setAppElement('#root');

(global as any).HTMLElement.prototype.inert = true;
if (typeof (global as any).TextEncoder === 'undefined') {
  (global as any).TextEncoder = TextEncoder;
}
if (typeof (global as any).TextDecoder === 'undefined') {
  (global as any).TextDecoder = TextDecoder;
}

import 'whatwg-url';