const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = 

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//this takes a path to to where your partials are, need line 17 to configure a partial
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alex Blostein'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex Blostein'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Alex Blostein'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address to search'
        })
    }else{
     geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
            
        })
    })


  }
})

app.get('/products', (req,res) => {
    // This code will only run when there is no search term
   if(!req.query.search){
    //    by using return I'm stopping the function execution if this runs
        return res.send({
            error:'You must provide a search term'
        })
   }

    res.send({
       products: []
   })
})





app.get('/help/*',(req,res) =>{
    res.render('404', {
        errorText: 'Help article not found.',
        title: '404 Error',
        name: 'Alex Blostein'

    })
})




// * means match anything that hasn't been matched so far
// app.get for 404 necessarily has to come last.
app.get('*', (req,res) =>{
    res.render('404', {
        errorText: 'Page not found.',
        title: '404 Error',
        name: 'Alex Blostein'

    })
})


// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})