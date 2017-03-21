import { socketUtil } from './utils';

import Store from './store';

const serverActions = {
  sendMsg: (msgData) => {
    const onRecievingMsg = (data) => {
      Store.dispatch({
        type: 'RECEIVING_MSG',
        ...data,
      });
    };

    Store.dispatch({
      type: 'SENDING_MSG',
      ...msgData,
    });

    socketUtil.send(msgData, onRecievingMsg);
  },
};
const userInterfaceActions = {
};
export default {
  ...serverActions,
  ...userInterfaceActions,
};
