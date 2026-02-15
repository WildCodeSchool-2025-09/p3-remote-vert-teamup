type Callback = (messages: Message[]) => void;

class LongPollManager {
  private waiting: Record<string, Callback[]> = {};

  addWaiting(activityId: string, callback: Callback) {
    if (!this.waiting[activityId]) {
      this.waiting[activityId] = []; // waiting {activityId: []}
    }
    this.waiting[activityId].push(callback); // waiting {activityId: [callback]}
  }

  removeWaiting(activityId: string, callback: Callback) {
    if (this.waiting[activityId]) {
      this.waiting[activityId] = this.waiting[activityId].filter(
        (cb) => cb !== callback,
      );
    }
  }

  notifyWaiting(activityId: string, message: Message) {
    const waitingList = this.waiting[activityId] || [];

    const callbacks = waitingList;
    delete this.waiting[activityId];
    console.log("callbacks", callbacks);

    for (const callback of callbacks) {
      try {
        callback([message]);
      } catch (err) {
        console.error("Longpol callback failed");
      }
    }

    this.waiting[activityId] = [];
  }
}

export default new LongPollManager();
