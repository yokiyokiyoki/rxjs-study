//同步简单实现

//TODO
//Observer需要有next，error，complete这些方法

function Observable(Observer) {
  for (let i = 0; i < 10; i++) {
    Observer.next(i);
  }
  Observer.complete();
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
