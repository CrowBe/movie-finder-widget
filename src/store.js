import { createStore } from 'redux';
import reducers from './reducers';

// Create store by passing in combined reducers and enable redux devtools.
export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);