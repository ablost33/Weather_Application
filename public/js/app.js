console.log('Client side javascript file is loaded!')

// The fetch API is weird and doesn't exactly work with NodeJS, and for callback functions with fetvh, you need to use .then()
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Currently loading.'
    fetch('/weather?address='+ location).then((response) => {
  
    response.json().then((data) => {
        if(data.error){
            messageTwo.textContent = data.error
        }else{
            messageOne.textContent = data.location + ": "
            messageTwo.textContent = data.forecast
        }
    })
}) 

    
})