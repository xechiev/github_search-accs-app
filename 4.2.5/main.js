import {API} from './module/api.js';
import {LAYOUT} from './module/layout.js';
import {Search} from './module/search.js';

const api = new API();

new Search(new LAYOUT(api), api)

