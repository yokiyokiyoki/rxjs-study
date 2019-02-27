//异步简单实现，借助setTimeout

//不阻塞程序

function Observable(Observer) {
  let id = setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      Observer.next(i);
    }
    Observer.complete();
    clearTimeout(id);
  }, 0);
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
