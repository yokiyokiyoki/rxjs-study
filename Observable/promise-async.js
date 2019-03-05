/** 
 * 和promise，async await交互
 * 可以接受observable，就可以promise
*/
const { Observable, interval, Subject,defer } = rxjs;
const { take, map,switchMap,takeUntil,retry } = rxjs.operators;
// Observable: 每1秒发出自增数值乘以100，共发出10次
const source$ = interval(1000).pipe(
    take(10),
    map(x => x * 100)
)
  
/**
 * 返回 promise，它等待 `ms` 毫秒并发出 "done" 
 */
function promiseDelay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve('done'+ms), ms);
  });
}

// 在 switchMap 中使用 promiseDelay
// source$.pipe(switchMap(x => promiseDelay(x))) // 正常运行
//   .subscribe(x => console.log(x)); 

// source$.pipe(switchMap(promiseDelay)) // 更简洁了
//   .subscribe(x => console.log(x)); 

// 或者使用 takeUntil
// source$.pipe(takeUntil(doAsyncThing('hi'))) // 完全可以运行
//   .subscribe(x => console.log(x))


/** 
 * defer
 * 可以用来重试
 * 结合async和await
*/
function getErroringPromise() {
    console.log('getErroringPromise called');
    return Promise.reject(new Error('sad'));
  }
//重试了三次
// defer(getErroringPromise).pipe(retry(3))
// .subscribe(x => console.log);

defer(async function() {
    const a = await promiseDelay(1000).then(() => 1);
    const b = a + await promiseDelay(1000).then(() => 2);
    return a + b + await promiseDelay(1000).then(() => 3);
}).subscribe(x => console.log(x))