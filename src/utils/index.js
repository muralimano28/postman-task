import Moment from 'moment';

const TimingUtils = (milliSeconds, isForMsg) => {
  const date = new Date(parseInt(milliSeconds, 10));

  return (isForMsg) ? Moment(date).format('h:mm A') : Moment(date).fromNow();
};

class WebSocketUtil {
  constructor() {
    this.webSocketRef = {};
    this.callbacks = {};
    this.processingRequests = [];
    this.waitingMsgs = [];
    this.isSocketOpen = false;

    this.webSocketRef = new WebSocket('wss://echo.websocket.org/');

    this.webSocketRef.onopen = () => this.onOpenHandler();
    this.webSocketRef.onclose = () => this.onCloseHandler();
    this.webSocketRef.onmessage = ev => this.onMsgHandler(ev);
    this.webSocketRef.onerror = ev => this.onErrorHandler(ev);
  }
  onOpenHandler = () => {
    this.isSocketOpen = true;

    for (let i = 0; i < this.waitingMsgs.length; i += 1) {
      const { msg, callback } = this.waitingMsgs[i];

      this.webSocketRef.send(JSON.stringify(msg));

      this.processingRequests.push(msg.id);
      this.callbacks[msg.id] = callback;
    }
  }
  onCloseHandler = () => {
    this.isSocketOpen = false;
  }
  onMsgHandler = (ev) => {
    const data = JSON.parse(ev.data);
    const idx = this.processingRequests.indexOf(data.id);
    const callback = this.callbacks[data.id];

    this.processingRequests.splice(idx, 1);

    if (callback) callback(data);

    delete this.callbacks[data.id];
  }
  onErrorHandler = (ev) => {
    for (let i = 0; i < this.processingRequests.length; i += 1) {
      const id = this.processingRequests[i];
      const callback = this.callbacks[id];

      if (callback) {
        callback(null, ev.data);
      }
      delete this.callbacks[id];
    }
    this.processingRequests = [];
  }
  send(msg, callback) {
    if (this.isSocketOpen) {
      this.webSocketRef.send(JSON.stringify(msg));

      this.processingRequests.push(msg.id);
      this.callbacks[msg.id] = callback;
    } else {
      this.waitingMsgs.push({
        msg,
        callback,
      });
    }
  }
}
const socketUtil = new WebSocketUtil();

class OnWindowResizeUtil {
  constructor() {
    this.listeners = [];
    this.onWindowResize = () => {
      this.listeners.forEach(listener => listener());
    };

    window.addEventListener('resize', this.onWindowResize);
  }
  addListener(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

const subscribeToOnResize = new OnWindowResizeUtil();


export { TimingUtils, Request, subscribeToOnResize, socketUtil };
