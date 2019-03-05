/** 
 * observable本质是连接生产者和观察者
 * 内部产生数据，next(value)，外部接受：生产者
 * 
 * observerable分为hot和cold
 * hot是外部产生的，可以复用.如我不想一遍又一遍创建耗费资源的连接，比如ws。单播的
 * cold是内部产生，一直创建。多播。
*/

// const cold=new Observable((observer)=>{
//     const product=new Producer()
// })

// const product=new Producer()
// const hot=new Observable((observer)=>{
//     product ..
// })

/** 
 * 将现有冷的observerable变成热的，其实就是利用subject
 * 桥接代理模式
 * rxjs使用 publish 或 share（引用计数法）
*/
function makeHot(cold){
    const subject=new subject()
    cold.subscribe(subject)
    return new Observable((observer) => subject.subscribe(observer));
}
//如果取消订阅，当所有观察者都取消订阅的时候，应该也取消cold的订阅。使用引用计数法
function makeHott(cold){
    const subject=new subject()
    let mainCold=cold.subscribe(subject)
    let ref=0
    return new Observable((observer) => {
        let sub=subject.subscribe(observer)
        ref++
        return ()=>{
            ref--
            if(ref==0){
                mainCold.unsubscribe()
            }
            sub.unsubscribe()
        }
    });
}