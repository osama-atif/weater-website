const request = require ('request')
const geocode = require('./geocode')
const access_key = '810529ed7f2ed8276c742062645a6269'

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error

// const forecast = (latitude, longitude, callback) => {       
//     const url = 'http://api.weatherstack.com/current?access_key=810529ed7f2ed8276c742062645a6269&query=' + latitude + ',' + longitude
//     // ' + longitude + ',' + latitude   //&query= &units= allows you to add additional parameters
//     // request({ url: url, json:true}, (error,response) => {    
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)
    
//     request({ url: url, json: true}, (error,response) => {              // url: url 1.options object, json property true, 2. function to run once we have the response
        
//                 if (error)
//                 {                                                     // if there is an error object available, then print out the following code
//                     callback('Unable to connect to location services', undefined)
//                 } 
//                 else if(response.body.error)
//                 {              
//                 //console.log(url)                   
//                 callback('Unable to find location. Try another search.', undefined)
//                 }
//                 else
//                 {
//                 //console.log(url)
//                  const currenttemp = response.body.current   
//                 // console.log(currenttemp)                                   
//                 callback (undefined, 'It is currently ' + currenttemp.weather_descriptions[0]   + ' with ' 
//                 + currenttemp.temperature + ' degrees out. There is a ' + currenttemp.precip + 
//                 '% chance of rain and it feels like ' + currenttemp.feelslike)
//                 // currenttemp.weather_descriptions[0] because weather_descriptions is an array      
//                 }
//                                                         }
//             )
//                                                         }   //    - Success, pass forecast string for data (same format as from before)

const forecast = (location, country, region, latitude, longitude, callback) => {       
const url = 'http://api.weatherstack.com/current?access_key=810529ed7f2ed8276c742062645a6269&query=' + latitude + ',' + longitude
// ' + longitude + ',' + latitude   //&query= &units= allows you to add additional parameters
// request({ url: url, json:true}, (error,response) => {    
// const data = JSON.parse(response.body)
// console.log(data.current)

request({ url, json: true}, (error, {body}) => {              // url: url 1.options object, json property true, 2. function to run once we have the response
        
            if (error)
            {                                                     // if there is an error object available, then print out the following code
                callback('Unable to connect to location services', undefined)
            } 
            else if(body.error)
            {              
            //console.log(url)                   
            callback('Unable to find location. Try another search.', undefined)
            }
            else
            {
            //console.log(url)
            // const {program_error} = response.body.error
            const { feelslike, precip, temperature, weather_descriptions } = body.current
            // console.log(currenttemp)                                   
            callback(undefined, 'It is currently ' + weather_descriptions[0] + ' with ' 
            + temperature + ' degrees out. There is a ' + precip + 
            '% chance of rain and it feels like ' + feelslike)
            // currenttemp.weather_descriptions[0] because weather_descriptions is an array      
            }
                                                    }
        )
                                                    }                   

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

module.exports = forecast