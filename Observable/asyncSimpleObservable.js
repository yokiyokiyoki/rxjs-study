//异步简单实现（不阻塞程序），借助setTimeout

function Observable(Observer) {
  let i = 0;

  const id = setInterval(() => {
    if (i <= 10) {
      Observer.next(i++);
    } else {
      Observer.complete();
      clearInterval(id);
    }
  }, 100);
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
Observable(Observer);

//可以取消订阅的

function unsubObservable(Observer) {
  let i = 0;

  const id = setInterval(() => {
    if (i <= 10) {
      Observer.next(i++);
    } else {
      Observer.complete();
      clearInterval(id);
    }
  }, 100);
  return () => {
    console.log("disposed!");
    clearInterval(id);
  };
}

//五个数后取消，本来应该10个
let unsub = unsubObservable(Observer);
setTimeout(unsub, 500);
