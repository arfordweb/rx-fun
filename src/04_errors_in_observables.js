const { Observable } = require('rxjs')

/*
Could your observable throw and error?  If so, you can wrap that portion of the code in a
try / catch block so subscribers can responds to errors.
*/
 
const observable = new Observable(subscriber => {
  let emptyVariable = undefined
  try {
    console.log('Start')
    emptyVariable.doTheImpossible() // Uh oh!
    console.log('This is unreachable')
  } catch (err) {
    subscriber.error(err)
  }
  console.log('This is reachable, since we\'re catching the above error')
})

observable.subscribe({
  next: x => {
    console.log(x)
  },
  error: err => {
    console.log(`An error occurred: ${err}`)
  },
})


/* Output:
Start
An error occurred: TypeError: Cannot read property 'doTheImpossible' of undefined
This is reachable, since we're catching the above error
*/
