/*
Think of Observables as the missing way to respond to data.  The existing ways to respond
to data are:

         Single          Multiple
      ********************************
Pull  ** Function     ** Iterator   **
      ********************************
Push  ** Promise      ** ???        **
      ********************************

Before we get into Observables, let's review the existing ways to respond to data.

More Info on pull vs. push: https://rxjs-dev.firebaseapp.com/guide/observable#pull-versus-push
*/

// 1. Function

/*
 * This may be a very trivial example, but it demonstrates that a function can be used to
 * get data on demand.
 * 
 * Notice we're calling the function, so this is considered `pull`ing a value.  And the function
 * returns one value.  In this case, and in functional programming, calling a function with the
 * same arguments always returns the same value.
 */
function getNumberTen() {
    return 10
}

console.log(`Used a Function to get ${getNumberTen()}\n`)


// 2. Iterator

/*
 * Here is a very simple Iterator that iterates through the values 1 through 10.  In this case,
 * we just log that value to the console.
 * 
 * Of course, the `.next()` method (a.k.a. Function called in the context of an Object) only returns
 * one value, but the value is different each time.  And we can tell from the returned object
 * whether there are any more values left to iterate on.
 * 
 * Another distiction is that we're also `pull`ing the values here.  The Iterator will return
 * the values in realtime.  So, this can't be used for data that will be received asynchronously
 * in the future, like data coming in from a network connect.
 */
function oneToTenIteratorFactory() {
  let iterationCount = 1

  return {
    next: () => ({ 
      value: iterationCount++,
      done: iterationCount > 10,
    })
  }
}

const oneToTenIterator = oneToTenIteratorFactory()
let curIteration
do {
  // each call to `.next()` return an object with a `value` and a `done` property
  curIteration = oneToTenIterator.next()
  console.log(`Used an Iterator to get ${curIteration.value}`)
} while (!curIteration.done)
console.log() // just getting a newline here so the output is more clear


// 3. Promise

/*
 * A Promise is an object that can eventually (or immediately) resolve with a value.  And you
 * can access that value in a handler you pass to the Promise's `then` method.  This is great
 * because you can ask for something to happen, then *later* decide how to handle the result.
 * And you can listen for the result with multiple handlers instead of having to bundle all
 * your handlers into a single function.
 */

var myPromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('Hello');
  }, 2000);
});

function printValue(value) {
  console.log(`Used a Promise to get ${value}\n`)
}

// Two seconds will elapse before the promise handler `printValue` is called.
// During that time, this script will seem to hang.
myPromise.then(printValue)

/*
But Promises only resolve a single value.  They're one and done.  What if we want to push
multiple values over time, like in the case of receiving user input or data from a network
connection?  Move on the the next example for a basic example of how we can achieve this with
Observables.
*/

/* Output:
Used a Function to get 10

Used an Iterator to get 1
Used an Iterator to get 2
Used an Iterator to get 3
Used an Iterator to get 4
Used an Iterator to get 5
Used an Iterator to get 6
Used an Iterator to get 7
Used an Iterator to get 8
Used an Iterator to get 9
Used an Iterator to get 10

Used a Promise to get Hello
*/

// More Info: https://rxjs-dev.firebaseapp.com/guide/observable
