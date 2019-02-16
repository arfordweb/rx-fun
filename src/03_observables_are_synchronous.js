const { Observable } = require('rxjs')

/*
Like Promises, Observables are great for responding to data received from ansynchronous sources.
But, they are not inherently asynchronous.  If the Observable is synchronously providing data
to its subscribers, the handling of that data will happen synchronously.  But if you
asynchronously provide data to subscribers, that's fine as well.
*/
 
const observable = new Observable(subscriber => {
  console.log('Hello')
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4) // happens asynchronously
  }, 0)
})

console.log('Before subscriptions')
observable.subscribe(x => {
  console.log(x)
})
console.log(
  'After subscriptions; Did this execute before or after the synchronously '
  + 'observed values (1-3) were logged?  How about the asynchronously observed value (4)?'
)

/* Output:
Before subscriptions
Hello
1
2
3
After subscriptions; Did this execute before or after the synchronously observed values (1-3) were logged?  How about the asynchronously observed value (4)?
4
*/
