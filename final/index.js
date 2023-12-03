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
    deleteHomeProject,
    home,
    login,
    loginPost,
    register,
    registerPost,
    logout,
    notFounded
} = require('./services/service')

const multer = require('multer')
const session = require('express-session')
const flash = require('express-flash')

const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(flash())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))


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

app.get('/login', login)
app.get('/register', register)

app.post('/login', loginPost)
app.post('/register', registerPost)

app.get('/logout', logout)

app.get('*', notFounded)


app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})