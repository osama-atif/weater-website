const path = require('path')
const express = require('express')          //express is a function not an object it can be called to create new and different things.
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname,"../public"))   // this funciton joins paths listed in the arguments

const app = express ()

// creates pathways that are later used to direct express where to find the correct files and directories
const publicdirectorypath = path.join(__dirname, '../public')  // joins paths, __dirname provies the name of the directory you are in currently, ../ moves the directory up on folder
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')




// setup to handle bars engine and views location 
app.set('view engine', 'hbs')                 //important to setup handlebars templates
app.set('views', viewspath)                   // finds views directory for the application and viewspath is the directory where to find it  
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicdirectorypath))  //express.static - automatically finds the path to the correct file requested by the user

app.get('', (req,res) => {                    // lets us consider what the server should do when someone tries to go to app.com
res.render('index', {                         // req is the requst, res is the response
                                              // res.render express goes off and gets the view index, it then converts the hbs file to html and makes sure html gets back to the reqeuster
                                              
title: 'Weather', 
name: 'Osama'
})
})

app.get('/about', (req,res) => {
 res.render('about', {  
    title: 'About Me', 
    name: 'Osama Atif'
                    })
                                })
    
app.get('/help', (req,res) => {
 res.render('help', {   
     title: 'Help',
     name: 'Osama Atif',
     helpfultext: 'This is some helpful text' 
                    })
                                })

app.get('/weather', (req, res) => {
    // res.render('about', {  
    //     title: 'About Me', 
    //     name: 'Osama Atif'
    //                     })
                                    
    if(!req.query.address){
        return res.send(
        {
        error: 'Please add an address'
        }
        )
    }
    else {
        cityname = req.query.address 
        geocode (cityname, (error, {latitude, longitude, location, country, region} = {}) => {        //sending in a default paramter of empty object her, if the object is empty it won't crash the program             
            // first is the addresss, second is the call back funtion that will be sent too but will be executed 
            // after the main function has been executed
            
            if (error)
                {
            return res.send(
                {error: 'Please enter a valid address'  
                                                      //return terminates the program
                })
            }
            forecast(location, country, region, latitude, longitude, (error, forecastdata) => {
                if (error)
                {
                    res.send (
                    {    
                    error: 'Please enter a valid address'  
                                                          //return terminates the program
                    })
                }
                else 
                {
                res.send(
                {forecast: forecastdata,
                location: {location, region, country},
                address: cityname
                })
                }
                })
                })
        }



    // address = req.query.address
    // location = req.query.address
    // res.send(
    // { 
    //     forecast: 'it is currently foggy', 
    //     location: 'philadelphia',
    //     address,
    //     temperature: '10'
    // })
    
    })

app.get('/products', (req, res) => {
        if (!req.query.search) 
        {                                           //req is an object with a query property that is also an object with search property 
                                                    //this will only run if there is no search then an error will pop up
        return res.send( {
                error: 'you must provide a search term'
            })
        }
        // console.log(req.query.search) // http://localhost:3000/products?search=games&rating=5 ? is the search within and search is an element with in the query object which can be accessed by req.query.search
        res.send({
            products: []
        })
})

app.get('/help/*', (req, res) => {

    res.render('Help',                                  // looks for help page and then the arguemtns are used to fill out the remaining info
{   title: "Help Article Not Found",
    name: "Osama Atif"
})

})

app.get('*', (req,res) => {

    res.render('404',                                   //404 error, found and 
{   title: "404",
    name: "Osama Atif",
    error: "Page not found"

}



    )

})

//app.com 
//app.com/help
//app.com/about

app.listen(3000, () => {                            //development port, it starts up the server
    console.log('Server is up on port 3000')
} )