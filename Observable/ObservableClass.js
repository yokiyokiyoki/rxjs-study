/**
 * 增加一个unsubscribed，complete的时候调用
 */
class SafeObserver {
  constructor(observer) {
    this.observer = observer;
  }
  next(value) {
    if (this.observer.next && !this.unsubscribed) {
      this.observer.next(value);
    }
  }
  error(err) {
    if (this.observer.error && !this.unsubscribed) {
      this.unsubscribed = true;
      this.observer.error(error);
    }
  }
  complete() {
    if (this.observer.complete && !this.unsubscribed) {
      this.unsubscribed = true;
      this.observer.complete();
      this.unsubscribed();
    }
  }
  unsubscribed() {
    this.unsubscribed = true;
    if (this._unsubscribed) {
      //在Observable类里体现
      this._unsubscribed();
    }
  }
}
/**
 *  抽象Observable成类
 *  实例具有subscribe函数
 *
 */

class Observable {
  constructor(_subscribe) {
    //构造一个Observable,可以主动调用Observer
    this._subscribe = _subscribe;
  }
  subscribe(Observer) {
    //安全的observer
    const safeObserver = new SafeObserver(Observer);
    safeObserver._unsubscribed = this._subscribe(safeObserver);
    return () => safeObserver._unsubscribed();
  }
}

const simpleObservable = new Observable(Observer => {
  let i = 0;
  console.log(Observer);
  const id = setInterval(() => {
    if (i <= 10) {
      Observer.next(i++);
    } else {
      Observer.complete();
      //由于observer会被安全化，这里complete后next也无所谓
      Observer.next("stop me!");
      clearInterval(id);
    }
  }, 1000);

  return () => {
    console.log("disposed!");
    clearInterval(id);
  };
});

const observer = {
  next: value => console.log(value),
  error: () => {},
  complete: () => console.log("complete")
};

const unsub = simpleObservable.subscribe(observer);

// setTimeout(unsub, 500);
