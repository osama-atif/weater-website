console.log("client side javascript is loaded!")

//grabs the query within form of index.hbs and stores it in the weatherform object
const weatherform = document.querySelector('form')   
 //grabs teh input value and stores it in serach as an object 
const search = document.querySelector('input')      
//query selector finds the word that is inside the brackets and select the query within it
const messageOne = document.querySelector('#message-1')       
// however, we already have p which is our first paragrah which says use this site to get your weather
//hence we need to add id of paragraph                                                   
const messageTwo = document.querySelector('#message-2') 


//this is an event listener, whenever a submit event happens - the actions within the eventlistener are performed
weatherform.addEventListener('submit', (e) => {
// prevents the browser from doing its default things    
e.preventDefault()                                 
//store the value property from the serach object              
    const location = search.value                                     
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address=' + location).then((request) =>  
    // fetches the data then takes the request and does the following with the request
    { 
    //converts it into json and then uses the converted object in the following function    
        request.json().then((data) => {                                 
        if (data.error){
        messageOne.textContent = 'Error'
        messageTwo.textContent = `${data.error}`

        }
        else
        {
            messageOne.textContent = `${data.address}, ${data.location.region}, ${data.location.country}`
            messageTwo.textContent = ` ${data.forecast}` 
        //     console.log(data.address)                        // data.location is an object within the data so i save it inside the city and use its attributes later
        //     console.log(data.location.region) 
        //     console.log(data.forecast)
         }
        })
    })
})