const { Observable } = require('rxjs')

// Most basic observable creation
let observable = Observable.create((observer) => {
    // the observer in this function sends data to subscribers and can end the stream
	observer.next(1)
	observer.next(2)
	setTimeout(() => {
		observer.next(4)
		observer.complete()
	}, 1000)
})

// You can export an Observable from your module for other modules to subscribe to like this
observable.subscribe({
	next: x => console.log(`got value ${x}`),
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