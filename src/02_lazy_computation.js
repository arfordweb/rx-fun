const { Observable } = require('rxjs')

let increment = 0

let observable = Observable.create((subscriber) => {
  // This function will be executed for each subscription rather than caching the observed values
  // and sending them to all subscribers

	subscriber.next(++increment)
	subscriber.next(++increment)
	setTimeout(() => {
		subscriber.next('timed out!')
		subscriber.complete()
	}, 1000)
})

// These two subscriptions are identical (other than the letter at the beginning of the 
// logged messages), but they'll log different things as `increment` changes

observable.subscribe(x => console.log(`A: got value ${x}`))

observable.subscribe(x => console.log(`B: got value ${x}`))

// NOTE: I passed a function into `observable.subscribe()` instead of an object with a
//       `next` function.  If you aren't responding to `error` or `complete`, then this
//       is equivalent to supplying an object with only a `next` function.

/* Output:
1: got value 1
1: got value 2
2: got value 3
2: got value 4
1: got value timed out!
2: got value timed out!
*/
