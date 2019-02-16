const { Observable } = require('rxjs')

let observable = new Observable((subscriber) => {
    // the observer in this function sends data to subscribers and can end the stream
    subscriber.next(1)
    subscriber.next(2)
	setTimeout(() => {
		subscriber.next(4)
		subscriber.complete()
	}, 1000)
})

// You can export an Observable from your module for other modules to subscribe to like this
observable.subscribe({
  next: x => console.log(`got value ${x}`),
  // We're not demonstrating an error here, but this is how you can handle errors
  error: err => console.error(`something wrong occurred: ${err}`),
	complete: () => console.log('done'),
})
console.log('just after subscribe')

/* Output:
got value 1
got value 2
just after subscribe
got value 4
done
*/
