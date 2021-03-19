const request = require('request')


const geocode = (cityname, callback) => {                                // need address to geocode and also callback - function that is run after we have long and lat 
    // call back function is function that is called after the main has finished executing
//const url = //'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3NhbWEtYXRpZiIsImEiOiJja2s3b3lqOWYwZzJ3MndxejVyZXpjdzl0In0.PTidT6sYUqvi7N0TtVNH_Q&liimit=1'

const url = 'http://api.weatherstack.com/current?access_key=810529ed7f2ed8276c742062645a6269&query=' + cityname

// console.log(url)

request({ url, json: true}, (error, {body}) => {             // this function is the api request it uses url, and fetches the api as a json object, 
                                                            // if the reply is an error if statement will catch it otherwise the response will be dealt by the callback function
                                                            // we only use the body property from our response, so we can only put that thing in our arguments
if (error) 
{
callback('Unable to connect to location services', undefined)
}
else if(body.error)
{
callback('Unable to find location, try another search.', undefined)
}         
else {
callback(undefined, {
latitude: body.location.lat,
longitude: body.location.lon,
location: body.location.name,
region: body.location.region,
country:body.location.country
})
}
}
)
}

module.exports = geocode