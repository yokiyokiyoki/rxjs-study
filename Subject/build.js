

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