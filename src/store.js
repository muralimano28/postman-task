import { createStore } from 'redux';

import userData from '../data';

const initialState = userData;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_THREAD':
      return {
        ...state,
        threads: {
          [action.value]: [],
          ...state.threads,
        },
      };
    default:
      return state;
  }
};

const Store = createStore(
  reducer,
);

export default Store;
