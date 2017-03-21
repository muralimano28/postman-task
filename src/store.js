import { createStore } from 'redux';

import userData from '../data';

const initialState = {
  ...userData,
  activeChat: null,
  isActiveChatAGroup: false,
  activeChatContactInfo: null,
};

const reducer = (state = initialState, action) => {
  let activeContact = null;
  let alphabets = [];
  let idx = -1;
  let msg = null;

  switch (action.type) {
    case 'ADD_NEW_THREAD':
      return {
        ...state,
        threads: {
          [action.value]: [],
          ...state.threads,
        },
      };
    case 'SET_ACTIVE_CHAT':
      if (action.isGroup) {
        activeContact = state.groups.filter(group => (group.id === action.value));
      } else {
        alphabets = Object.keys(state.contactList);
        for (let i = 0; i < alphabets.length; i += 1) {
          if (!activeContact || !activeContact.length) {
            activeContact = state.contactList[alphabets[i]].filter(
              contact => (contact.phone === action.value),
            );
          }
        }
      }
      return {
        ...state,
        activeChat: action.value,
        isActiveChatAGroup: action.isGroup,
        activeChatContactInfo: activeContact[0],
      };
    case 'SENDING_MSG':
      msg = state.threads[action.recipientId] ? state.threads[action.recipientId] : [];
      return {
        ...state,
        threads: {
          ...state.threads,
          [action.recipientId]: [
            ...msg,
            {
              id: action.id,
              sender: action.senderId,
              content: action.content,
              type: 'TXT',
              ref: null,
              sent_at: (new Date().getTime()).toString(),
            },
          ],
        },
      };
    case 'RECEIVING_MSG':
      for (let i = 0; i < state.threads[action.recipientId].length; i += 1) {
        if (state.threads[action.recipientId][i].id === action.id) {
          idx = i;
        }
      }
      msg = state.threads[action.recipientId][idx];
      msg.delivered_at = (new Date().getTime()).toString();
      msg.read_at = msg.delivered_at;

      // NOTE:
      // If a message is sent in group then the reply is sent by some other group member.
      // It is mocked here.
      return {
        ...state,
        threads: {
          ...state.threads,
          [action.recipientId]: [
            ...state.threads[action.recipientId].slice(0, idx),
            { ...msg },
            ...state.threads[action.recipientId].slice(idx + 1),
            {
              id: `${action.id}-response`,
              sender: (action.isGroup) ? action.senderId : action.recipientId,
              content: action.content,
              type: 'TXT',
              ref: null,
              sent_at: (new Date().getTime()).toString(),
              delivered_at: (new Date().getTime()).toString(),
              read_at: (new Date().getTime()).toString(),
            },
          ],
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
