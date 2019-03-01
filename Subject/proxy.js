const { Observable, interval, subject } = rxjs;

console.log(Observable, interval, subject);
const interval$ = interval(1000);

/**
 * 两个观察者获得的是不一样事件
 */
interval$.subscribe(v => {
  console.log(`${v}`);
});

setTimeout(() => {
  interval$.subscribe(v => {
    console.log(`${v}+setTimeout`);
  });
}, 2000);

/**
 * 两个观察者获得的是相同事件
 * subject桥接代理
 */
