const {
    contact,
    projects,
    addProject,
    addProjectPost,
    projectDetail,
    testimonial,
    updateProject,
    updateProjectPost,
    deleteProject,
    deleteHomeProject
} = require('./services/service')

const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

const multer = require('multer')


const diskStorage = multer.diskStorage({
    // folder penyimpanan file
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/src/assets/img"))
    },

    // penamaan file dengan unik
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/contact', contact)
app.get('/projects', projects)
app.get('/projects/details/:id', projectDetail)
app.get('/testimonial', testimonial)

app.get('/projects/add', addProject)
app.post(
    '/projects/add',
    multer({ storage: diskStorage }).single("file"),
    addProjectPost)

app.get('/projects/update/:id', updateProject)
app.post(
    '/projects/update',
    multer({ storage: diskStorage }).single("file"),
    updateProjectPost)

app.post('/projects/delete/:id', deleteProject)
app.post('/delete/:id', deleteHomeProject)


async function home(req, res) {
    const query = 'SELECT * FROM tb_projects'
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })
    
    console.log(object)
    res.render('index', { data: object })
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})