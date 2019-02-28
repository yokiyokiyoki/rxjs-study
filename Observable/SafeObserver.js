//安全的observer
/**
 * observer需要是安全，对外面observer再封装一层
 * 如确保complete之后，Observable函数内部再调用next也无用
 * unsubscribed
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
    }
  }
}

const Observer = {
  next: v => {
    console.log(v);
  },
  complete: () => {
    console.log("done");
  },
  error: () => {
    console.log("error");
  }
};

function unsubObservable(Observer) {
  //安全的
  let safeObserver = new SafeObserver(Observer);
  console.log(safeObserver);
  let i = 0;

  const id = setInterval(() => {
    if (i <= 10) {
      safeObserver.next(i++);
    } else {
      safeObserver.complete();
      clearInterval(id);
    }
  }, 1000);
  return () => {
    console.log("disposed!");
    clearInterval(id);
  };
}
let unsub = unsubObservable(Observer);
setTimeout(unsub, 5000);
