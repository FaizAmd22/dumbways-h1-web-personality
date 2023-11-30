const config = require('../src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const Project = require('../src/models/tb_projects')
const User =require('../src/models/users')
const bcrypt = require('bcrypt')

let urlRedirect = " "

async function home(req, res) {
    
    console.log(req.session.user); 

    if (req.session.user) {
        let userId = req.session.user.id;
        let userName = req.session.user.name
        userName = userName.split(" ", 1)
        console.log(userName); 
        const isLogin = req.session.isLogin

        const query = `SELECT * FROM tb_projects WHERE "authorId"=${userId}`
        const object = await sequelize.query(query, { type: QueryTypes.SELECT })
        res.render('index', { data: object, userName, isLogin })
    } else {
        console.log("data id tidak ditemukkan")
        const isLogin = req.session.isLogin
        
        res.render('index', { isLogin })
    }
}

function contact(req, res) {
    res.render('contact', { isLogin: req.session.isLogin })
}
async function projects(req, res) {
    const isLogin = req.session.isLogin
    const user = req.session.user
    if (!isLogin) {
        req.flash('danger', "You need to login first!")
        res.redirect('/')
    }

    const query = `SELECT tb_projects.id, tb_projects.name, tb_projects.start_date, tb_projects.end_date, tb_projects.description, tb_projects.node, tb_projects.next, tb_projects.react, tb_projects.typescript, tb_projects.image, tb_projects.duration, 
    users.name AS author FROM tb_projects LEFT JOIN users ON
    tb_projects."authorId" = users.id`
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('project', { datas: object.reverse(), isLogin, user })
}
function addProject(req, res) {
    const isLogin = req.session.isLogin
    if (!isLogin) {
        req.flash('danger', "You need to login first!")
        res.redirect('/')
    }

    res.render('addProject', { isLogin })
}
function addProjectPost(req, res) {
    if (!req.file) {
        res.status(401)
        console.log("gambar kosong")
        req.flash('danger', "Image can't be empty!")
        return res.redirect(`/projects/add`)
    }
    
    let data = {
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        node: req.body.nodeJs ? true : false,
        next: req.body.nextJs ? true : false,
        react: req.body.reactJs ? true : false,
        typescript: req.body.typescript ? true : false,
        duration: '',
        fileImage: req.file.filename,
        sessionId : req.session.user.id
    }
    const getSecStart = new Date(data.startDate).getTime()
    const getSecEnd = new Date(data.endDate).getTime()
    
    urlRedirect = "/projects/add"
    if (!data.projectName) {
        res.status(400)
        req.flash('danger', "Project name can't be empty!")
        return res.redirect(urlRedirect)
    } else if (!data.startDate || !data.endDate) {
        res.status(400)
        req.flash('danger', "Please input date correctly!")
        return res.redirect(urlRedirect)
    } else if (getSecStart > getSecEnd) {
        res.status(400)
        req.flash('danger', "End Date must be latest than Start Date!")
        return res.redirect(urlRedirect)
    } else if (!data.desc) {
        res.status(400)
        req.flash('danger', "Description can't be empty!")
        return res.redirect(urlRedirect)
    } else if (data.node == false && data.next == false && data.react == false && data.typescript == false) {
        res.status(400)
        req.flash('danger', "Please select at least one technologies!")
        return res.redirect(urlRedirect)
    }
    

    // data.fileImage = data.fileImage.substring(37)

    let day = Math.floor((getSecEnd - getSecStart) / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)

    async function insertData() {
        const query = `insert into tb_projects(name, start_date, end_date, description, node, next, react, typescript, image, duration, "authorId") values ('${data.projectName}', '${data.startDate}', '${data.endDate}', '${data.desc}', '${data.node}', '${data.next}', '${data.react}', '${data.typescript}', '${data.fileImage}', '${data.duration}', '${data.sessionId}')`
        const object = await sequelize.query(query, { type: QueryTypes.INSERT })
        console.log("data disimpan :", object)
        req.flash('success', 'Add project Success!')
        res.redirect('/projects')
    }


    if (year >= 1) {
        data.duration = `${year} years`
        // datas.unshift(data)
        insertData()
    } else if (month >= 1) {
        data.duration = `${month} months`
        // datas.unshift(data)
        insertData()
    } else if (day >= 1) {
        data.duration = `${day} days`
        // datas.unshift(data)
        insertData()
    }
}
async function projectDetail(req, res) {
    const id = req.params.id
    const isLogin = req.session.isLogin
    if (!isLogin) {
        req.flash('danger', "You need to login first!")
        res.redirect('/')
    }

    const query = `SELECT tb_projects.id, tb_projects.name, tb_projects.start_date, tb_projects.end_date, tb_projects.description, tb_projects.node, tb_projects.next, tb_projects.react, tb_projects.typescript, tb_projects.image, tb_projects.duration,
    users.name AS author FROM tb_projects LEFT JOIN users ON
    tb_projects."authorId" = users.id where tb_projects.id=${id}`
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })

    let sessionId = req.session.user.id
    console.log("session id :", sessionId)

    res.render('projectDetail', { data: object[0], isLogin })
}

function testimonial(req, res) {
    res.render('testimonial')
}

async function updateProject(req, res) {
    const { id } = req.params
    const isLogin = req.session.isLogin

    let loginId = req.session.user.id
    console.log("userId : ", loginId)

    const query = `SELECT "authorId" FROM tb_projects WHERE id='${id}'`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    
    console.log("author id : ", obj[0].authorId)

    if (!isLogin) {
        req.flash('danger', "You need to login first!")
        return res.redirect('/')
    } else if (loginId == obj[0].authorId) {
        const query = `SELECT * FROM tb_projects where id=${id}`
        const object = await sequelize.query(query, { type: QueryTypes.SELECT })
        return res.render('update', { data: object[0], isLogin })
    } else {
        console.log("edit projek orang tidak boleh")
        req.flash('danger', "You can't edit other people's projects!")
        return res.redirect('/projects')
    }
}

async function updateProjectPost(req, res) {
    let data = {
        id: req.body.id,
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        node: req.body.nodeJs ? true : false,
        next: req.body.nextJs ? true : false,
        react: req.body.reactJs ? true : false,
        typescript: req.body.typescript ? true : false,
        duration: ``,
    }

    const reqs = req.body
    const getSecStart = new Date(reqs.startDate).getTime()
    const getSecEnd = new Date(reqs.endDate).getTime()
    urlRedirect = `/projects/update/${data.id}`
    if (!data.projectName) {
        res.status(400)
        req.flash('danger', "Project name can't be empty!")
        return res.redirect(urlRedirect)
    } else if (!data.startDate || !data.endDate) {
        res.status(400)
        req.flash('danger', "Please input date correctly!")
        return res.redirect(urlRedirect)
    } else if (getSecStart > getSecEnd) {
        res.status(400)
        req.flash('danger', "End Date must be latest than Start Date!")
        return res.redirect(urlRedirect)
    } else if (!data.desc) {
        res.status(400)
        req.flash('danger', "Description can't be empty!")
        return res.redirect(urlRedirect)
    } else if (data.node == false && data.next == false && data.react == false && data.typescript == false) {
        res.status(400)
        req.flash('danger', "Please select at least one technologies!")
        return res.redirect(urlRedirect)
    }

    let image = ''
    if (req.file) {
        image = req.file.filename
    }
    if (!image) {
        const query = `SELECT * FROM tb_projects WHERE id=${data.id}`
        const object = await sequelize.query(query, { type: QueryTypes.SELECT })
        image = object[0].image
    }

    let day = Math.floor((getSecEnd - getSecStart) / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)

    async function updateData() {
        const query = `UPDATE tb_projects SET name='${data.projectName}',start_date='${data.startDate}',end_date='${data.endDate}',description='${data.desc}',node='${data.node}',next='${data.next}',react='${data.react}',typescript='${data.typescript}',image='${image}' WHERE id=${data.id}`
        const object = await sequelize.query(query, { type: QueryTypes.UPDATE })
    }


    if (year >= 1) {
        data.duration = `${year} years`

        updateData()
        req.flash('success', 'Update project Success!')
        res.redirect('/projects')
    } else if (month >= 1) {
        data.duration = `${month} months`

        updateData()
        req.flash('success', 'Update project Success!')
        res.redirect('/projects')
    } else if (day >= 1) {
        data.duration = `${day} days`

        updateData()
        req.flash('success', 'Update project Success!')
        res.redirect('/projects')
    }
}


async function deleteProject(req, res) {
    const { id } = req.params

    // datas.splice(id, 1)
    let userId = req.session.user.id
    console.log("userId : ", userId)
    
    const query = `SELECT "authorId" FROM tb_projects WHERE id='${id}'`
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })
    
    console.log(object[0].authorId)
    if (userId == object[0].authorId) {
        const query2 = `delete from tb_projects where id=${id}`
        const object2 = await sequelize.query(query2, { type: QueryTypes.DELETE })

        console.log("data dihapus :", object2)
        req.flash('success', 'Delete Success!')
        res.redirect('/projects')
    } else {
        console.log("edit projek orang tidak boleh")
        req.flash('danger', "You can't delete other people's projects!")
        res.redirect('/projects')
    }
}

async function deleteHomeProject(req, res) {
    const { id } = req.params

    // datas.splice(id, 1)
    let userId = req.session.user.id
    console.log("userId : ", userId)
    
    const query = `SELECT "authorId" FROM tb_projects WHERE id='${id}'`
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })
    
    console.log(object[0].authorId)
    if (userId == object[0].authorId) {
        const query2 = `delete from tb_projects where id=${id}`
        const object2 = await sequelize.query(query2, { type: QueryTypes.DELETE })

        console.log("data dihapus :", object2)
        req.flash('success', 'Delete Success!')
        res.redirect('/')
    } else {
        console.log("edit projek orang tidak boleh")
        req.flash('danger', "You can't delete other people's projects!")
        res.redirect('/')
    }
}

function login(req, res) {
    res.render('login')
}

async function loginPost(req, res) {
    const { email, password } = req.body

    const query = `SELECT * FROM users WHERE email='${email}'`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    if (!obj.length) {
        console.log('User not registration!')
        req.flash('danger', 'User not registration!')
        return res.redirect('/login')
    }

    bcrypt.compare(password, obj[0].password, (err, result) => {
        if (err) {
            console.error('Server Error!')
            req.flash('danger', 'Server Error!')
            res.status(404)
            return res.redirect('/login')
        }

        if (!result) {
            console.error('Email or password was wrong!')
            req.flash('danger', 'Email or password was wrong!')
            res.status(401)
            return res.redirect('/login')
        }

        console.log('Login Success!')
        req.flash('success', 'Login Success!')
        req.session.isLogin = true
        req.session.user = {
            name: obj[0].name,
            email: obj[0].email,
            id: obj[0].id
        }

        res.redirect('/')
    })
}

function register(req, res) {
    res.render('register')
}

async function registerPost(req, res) {
    const { name, email, password } = req.body
    const salt = 10

    bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
            console.error("Password failed to be encrypted!")
            req.flash('danger', 'Register failed : password failed to be encrypted!')
            return res.redirect('/register')
        }

        const query = `SELECT email FROM users`
        const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
        
        let duplicated = ''

        obj.filter((e) => {
            if (e.email === email) {
                return duplicated = true
            }
        })

        if (duplicated) {
            console.log("email ada")
            req.flash('danger', 'Email already used!')
            res.redirect('/register')
        } else {
            const query2 = `INSERT INTO users(name, email, password) VALUES ('${name}', '${email}','${hash}')`
    
            const obj2 = await sequelize.query(query2, { type: QueryTypes.INSERT })

            const query3 = `SELECT * FROM users WHERE email='${email}'`
            const obj3 = await sequelize.query(query3, { type: QueryTypes.SELECT })

            req.flash('success', 'Register success!')
            req.session.isLogin = true
            req.session.user = {
                name: obj3[0].name,
                email: obj3[0].email,
                id: obj3[0].id
            }

            res.redirect('/')
        }
    })
}

function logout(req, res) {
    req.session.isLogin = false
    req.session.user = ''
    req.flash('success', 'Logout Success!')
    res.redirect('/')
}


function notFounded(req, res) {
    res.render('notFound')
}

module.exports = {
    home,
    contact,
    projects,
    addProject,
    addProjectPost,
    projectDetail,
    updateProject,
    updateProjectPost,
    testimonial,
    deleteProject,
    deleteHomeProject,
    login,
    loginPost,
    register,
    registerPost,
    logout,
    notFounded
}