const express = require('express')
const { check } = require('./check')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




let initialRecipe = [
    {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        preparationTime: '15 minutes',
        cookingTime: '15',
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
        country: "India",
        veg: true,
        id: 1
    }
]

app.get("/", (req, res) => {
    res.send("welcome to the recipe api");
});

app.get("/recipe/all", (req, res) => {
    res.send(initialRecipe);
})

app.get("/index", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/recipe.html')
})

app.post('/add', (req, res) => {
    initialRecipe.push(req.body)
    res.send(initialRecipe)
})

app.post('/recipe/add', check, (req, res) => {
    let postdata = {
        name: req.body.name,
        description: req.body.description,
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        imageUrl: req.body.imageUrl,
        country: req.body.country,
        veg: req.body.veg,
        id: initialRecipe.length + 1
    }
    initialRecipe.push(postdata)
    res.send(initialRecipe)
})

app.patch('/recipe/update/:id', (req, res) => {
    let { id } = req.params

    let match = initialRecipe.findIndex((e) => e.id == id)
    if (match == -1) {
        res.send("data not found")
    }
    else {
        initialRecipe[match].name = req.body.name;
        initialRecipe[match].description = req.body.description;
        initialRecipe[match].preparationTime = req.body.preparationTime;
        initialRecipe[match].cookingTime = req.body.cookingTime;
        initialRecipe[match].imageUrl = req.body.imageUrl;
        initialRecipe[match].country = req.body.country;
        initialRecipe[match].veg = req.body.veg;
    }
    res.status(200).send(initialRecipe)
})

app.delete('/recipe/delete/:id', (req, res) => {
    let { id } = req.params

    let index = initialRecipe.findIndex((e) => e.id == id)
    let remove = initialRecipe.splice(index, 1)[0]

    res.send(initialRecipe)
})

app.get('/recipe/filter', (req, res) => {
    let { veg } = req.query
    let { cookingTime } = req.query
    let { country } = req.query

    if (cookingTime == 'lth') {
        let lth = initialRecipe.sort((a, b) => a.cookingTime - b.cookingTime)
        res.send(lth)
    }

    if (cookingTime == 'htl') {
        let htl = initialRecipe.sort((a, b) => b.cookingTime - a.cookingTime)
        res.send(htl)
    }
    let countryfill = initialRecipe.filter((e) => e.conntry == country)
    let food = initialRecipe.filter((v) => v.veg.toString() == veg)
    res.send(countryfill)
    res.send(food)
})


app.listen(8090, () => {
    console.log("listening on port 8090");
})

