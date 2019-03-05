/** 
 * 演示的是桥接代理模式
*/
const { Observable, interval, Subject } = rxjs;

// console.log(Observable, interval, Subject);
const interval$ = interval(1000);

/**
 * 两个观察者获得的是不一样事件
 */
// interval$.subscribe(v => {
//   console.log(`${v}`);
// });

// setTimeout(() => {
//   interval$.subscribe(v => {
//     console.log(`${v}+setTimeout`);
//   });
// }, 2000);

/**
 * 两个观察者获得的是相同事件
 * subject桥接代理
 */
const subject = new Subject();
//subject正在观察interval$
interval$.subscribe(subject);

subject.subscribe(val => console.log(`First observer ${val}`));
//这里拿到的val是相同的执行，即使这里延迟了，这就是区别
setTimeout(() => {
  subject.subscribe(val => console.log(`Second observer ${val}`));
}, 2000);
