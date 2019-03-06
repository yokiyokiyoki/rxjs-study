const { Observable, interval, Subject,defer,of } = rxjs;
const { take, map,switchMap,takeUntil,retry,multicast } = rxjs.operators;

/** 
 * source是冷的，通过subject变成多播
*/
const source = defer(() => of(
    Math.floor(Math.random() * 100)
  ));
  
  function observer(name) {
    return {
      next: (value) => console.log(`observer ${name}: ${value}`),
      complete: () => console.log(`observer ${name}: complete`)
    };
  }
  
//   const subject = new Subject();
//   subject.subscribe(observer("a"));
//   subject.subscribe(observer("b"));
//   source.subscribe(subject);
  //a
  //b
  //complete
  //complete

  /** 
   * multicast也能使冷的变成热的
   * 返回ConnectableObservable
   * 具有connect方法
  */
 //简单实现
//  function multicast(source) {
//     const subject = new Subject();
//     //在函数内部订阅 subject 使得 subject 在被观察者订阅之前就已经收到了 next 和 complete 通知，所以观察者只能收到 complete 通知。
//     source.subscribe(subject);
//     return subject;
//   }
  
//   const m = multicast(source);
//   m.subscribe(observer("a"));
//   m.subscribe(observer("b"));
    //complete
  //complete
  //输出complete就结束了，这不是我们要的，想要继续输出ab

const m = source.pipe(multicast(new Subject()));
m.subscribe(observer("a"));
m.subscribe(observer("b"));
m.connect();