const { Observable } = require('rxjs')
const { tap, withLatestFrom } = require('rxjs/operators')

// helper function to increment a capital letter to the next letter
function incrementCapitalLetter(letter) {
    return String.fromCharCode(
        (
            (letter.charCodeAt(0) - 64) 
                % 26
        ) 
    + 65)
}

// counts the seconds for 30 seconds
let seconds$ = Observable.create((observer) => {
    let secondsSinceStart = 0
    setInterval(
        () => { 
            observer.next(secondsSinceStart)
            if (secondsSinceStart === 10) {
                observer.complete()
            }
            secondsSinceStart += 1
        },
        1000, // every second
    )
})

// incremenets a letter in a rotation every 2/3 seconds
let letters$ = Observable.create((observer) => {
    let letter = 'A'
    observer.next(letter)
    setInterval(
        () => { 
            letter = incrementCapitalLetter(letter)
            observer.next(letter)
        },
        667, // every 2/3 second
    )
})

const subscription = seconds$.pipe(
    tap((seconds) => {
        // right now, the value is just a number; letter is inaccessible from here
        console.log(`first tap seconds: ${seconds}`) 
    }),
    withLatestFrom(letters$), // value will now be an array with current letter at index 1
    tap(([seconds, letter]) => { // seconds and letter destructure from Array
        console.log(`second tap seconds: ${seconds}, letter: ${letter}`) 
    }),
).subscribe({
    next: ([seconds, letter]) => {
        console.log(`in subscription handler, seconds: ${seconds}, letter: ${letter}`)
    },
    error: err => console.error(`something wrong occurred: ${err}`),
    complete: () => {
        console.log('done')
        process.exit(0)
    },
})

// In the following, notice some letters (including A) are skipped because only changes in the
// `seconds$` Observable trigger the operators and subscription handler to run

/* Output:
first tap seconds: 0
second tap seconds: 0, letter: B
in subscription handler, seconds: 0, letter: B
first tap seconds: 1
second tap seconds: 1, letter: C
in subscription handler, seconds: 1, letter: C
first tap seconds: 2
second tap seconds: 2, letter: E
in subscription handler, seconds: 2, letter: E
first tap seconds: 3
second tap seconds: 3, letter: F
in subscription handler, seconds: 3, letter: F
first tap seconds: 4
second tap seconds: 4, letter: H
in subscription handler, seconds: 4, letter: H
first tap seconds: 5
second tap seconds: 5, letter: I
in subscription handler, seconds: 5, letter: I
first tap seconds: 6
second tap seconds: 6, letter: K
in subscription handler, seconds: 6, letter: K
first tap seconds: 7
second tap seconds: 7, letter: L
in subscription handler, seconds: 7, letter: L
first tap seconds: 8
second tap seconds: 8, letter: N
in subscription handler, seconds: 8, letter: N
first tap seconds: 9
second tap seconds: 9, letter: O
in subscription handler, seconds: 9, letter: O
first tap seconds: 10
second tap seconds: 10, letter: Q
in subscription handler, seconds: 10, letter: Q
done
*/