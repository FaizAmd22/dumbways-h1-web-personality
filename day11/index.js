const {
    home,
    contact,
    projects,
    addProject,
    addProjectPost,
    projectDetail,
    testimonial
} = require('./services/service')

const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/contact', contact)
app.get('/projects', projects)
app.get('/projects/add', addProject)
app.post('/projects/add', addProjectPost)
app.get('/projects/:id', projectDetail)
app.get('/testimonial', testimonial)



app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})