

/** 
 * subject是如何构造的
*/
// class MySubject extends Rx.Observable{
//     constructor(){
//         super()
//         //可以接受观察者，构建一个数组
//         this.observers=[]
//     }
//     subscribe(observer) {
//         this.observers.push(observer);
//     }
    
//     next(value) {
//         同步执行，自然接受的是一样的事件
//         this.observers.forEach(observer => observer.next(value));
//     }
    
//     error(error) {
//         this.observers.forEach(observer => observer.error(error));
//     }
    
//     complete() {
//         this.observers.forEach(observer => observer.complete());
//     }
     
// }

/** 
 * 构建BehaviorSubject
 * 新进来的观察者，会立刻接受到最新的值
 * 不管是否产生新的流，都可以获得最新值
 * 需要一个初始值
 * getValue可以获得当前最新值
*/

class MyBehaviorSubject extends Rx.Observable{
    constructor(initialValue){
        super()
        //可以接受观察者，构建一个数组
        this.observers=[]
        if(initialValue){
            //初始值赋予
            this.lastValue=initialValue
        }
    }
    subscribe(observer) {
        this.observers.push(observer);
        //有观察者立刻发出最新值
        observer.next(this.lastValue);
    }
    
    next(value) {
        this.lastValue=value
        this.observers.forEach(observer => observer.next(value));
    }
    
    error(error) {
        this.observers.forEach(observer => observer.error(error));
    }
    
    complete() {
        this.observers.forEach(observer => observer.complete());
    }
    getValue(){
        return this.getValue
    }
}
//demo
// const subject = new MyBehaviorSubject('initialValue');

// subject.map(value => `Observer one ${value}`).subscribe(function(value) {
//   console.log(value);
// });

// subject.next('New value');

// setTimeout(() => {
//   subject.map(value => `Observer two ${value}`).subscribe(function(value) {
//     console.log(value);
//   });
// }, 2000);




/** 
 * ReplaySubject的简单构建
 * 传入一个返回最近几次的数字buffersize
*/

// class MyReplaySubject extends Rx.Observable {

//     constructor(bufferSize) {
//         super();
//         this.observers = [];
//         this.bufferSize = bufferSize;
//         this.lastValues = [];
//     }

//     subscribe(observer) {
//         this.lastValues.forEach(val => observer.next(val));
//         this.observers.push(observer);
//     }

//     next(value) {
            // 如果相等则去掉头部，push进新的
//         if (this.lastValues.length === this.bufferSize) {
//         this.lastValues.shift();
//         }

//         this.lastValues.push(value);
//         this.observers.forEach(observer => observer.next(value));
//     }
// }