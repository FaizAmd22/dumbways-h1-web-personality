const config = require('../src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const tb_projects = require('../src/models/tb_projects')
const bcrypt = require('bcrypt')
const session = require('express-session')

async function home(req, res) {
    const query = 'SELECT * FROM tb_projects'
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })

    const isLogin = req.session.isLogin
    console.log(isLogin)
    res.render('index', { data: object, user: req.session.user, isLogin })
}

function contact(req, res) {
    res.render('contact', { isLogin: req.session.isLogin })
}
async function projects(req, res) {
    const isLogin = req.session.user
    if (!isLogin) {
        req.flash('danger', "You need to login first!")
        res.redirect('/')
    }

    const query = 'SELECT * FROM tb_projects'
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('project', { datas: object.reverse(), isLogin })
}
function addProject(req, res) {
    const isLogin = req.session.user
    if (!isLogin) {
        req.flash('danger', "You need to login first!")
        res.redirect('/')
    }

    res.render('addProject', { isLogin })
}
function addProjectPost(req, res) {
    const urlRedirect = "/projects/add/"
    validationInput(req, res, urlRedirect)
    const reqs = req.body
    const getSecStart = new Date(reqs.startDate).getTime()
    const getSecEnd = new Date(reqs.endDate).getTime()
    if (!req.file) {
        res.status(400)
        req.flash('danger', "Image can't be empty!")
        res.redirect(urlRedirect)
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
        fileImage: req.file.filename
    }

    // data.fileImage = data.fileImage.substring(37)

    let day = Math.floor((getSecEnd - getSecStart) / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)

    async function insertData() {
        const query = `insert into tb_projects(name, start_date, end_date, description, node, next, react, typescript, image, duration) values ('${data.projectName}', '${data.startDate}', '${data.endDate}', '${data.desc}', '${data.node}', '${data.next}', '${data.react}', '${data.typescript}', '${data.fileImage}', '${data.duration}')`
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
    const isLogin = req.session.user
    if (!isLogin) {
        req.flash('danger', "You need to login first!")
        res.redirect('/')
    }

    const query = `SELECT * FROM tb_projects where id=${id}`
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('projectDetail', { data: object[0], isLogin })
}

function testimonial(req, res) {
    res.render('testimonial')
}

async function updateProject(req, res) {
    const { id } = req.params
    const isLogin = req.session.user
    if (!isLogin) {
        req.flash('danger', "You need to login first!")
        res.redirect('/')
    }

    // const dataFilter = datas[parseInt(id)]
    // dataFilter.id = parseInt(id)
    const query = `SELECT * FROM tb_projects where id=${id}`
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })
    res.render('update', { data: object[0], isLogin })
}

async function updateProjectPost(req, res) {
    try {
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

        const urlRedirect = `/projects/update/${data.id}`
        validationInput(req, res, urlRedirect)
        const reqs = req.body
        const getSecStart = new Date(reqs.startDate).getTime()
        const getSecEnd = new Date(reqs.endDate).getTime()

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
    } catch (error) {
        console.log(error)
    }
}

// function updateData(data) {
//     datas[parseInt(data.id)] = {
//         projectName: data.projectName,
//         startDate: data.startDate,
//         endDate: data.endDate,
//         desc: data.desc,
//         tech: data.tech,
//         duration: data.duration,
//         fileImage: data.fileImage
//     }
// }

async function deleteProject(req, res) {
    const { id } = req.params

    // datas.splice(id, 1)
    const query = `delete from tb_projects where id=${id}`
    const object = await sequelize.query(query, { type: QueryTypes.DELETE })

    console.log("data dihapus :", object)
    req.flash('success', 'Delete Success!')
    res.redirect('/projects')
}
async function deleteHomeProject(req, res) {
    const { id } = req.params

    // datas.splice(id, 1)
    const query = `delete from tb_projects where id=${id}`
    const object = await sequelize.query(query, { type: QueryTypes.DELETE })

    console.log("data dihapus :", object)
    req.flash('success', 'Delete Success!')
    res.redirect('/')
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
            email: obj[0].email
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
    const encryptedPassword = await bcrypt.hash(password, salt)

    const query = `INSERT INTO users(name, email, password) VALUES('${name}', '${email}', '${encryptedPassword}')`
    await sequelize.query(query, { type: QueryTypes.UPDATE })

    const userEmail = `SELECT * FROM users`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    // if (email == obj[0].email) {
    //     req.flash('danger', 'Email has been used!')
    //     res.redirect('/register')
    // }
    const query2 = `SELECT * FROM users WHERE email='${email}'`
    const obj2 = await sequelize.query(query2, { type: QueryTypes.SELECT })

    req.flash('success', 'Register Success!')
    req.session.isLogin = true
    req.session.user = {
        name: obj2[0].name,
        email: obj2[0].email
    }
    res.redirect('/')
}

function logout(req, res) {
    req.session.isLogin = false
    req.session.user = ''
    req.flash('success', 'Logout Success!')
    res.redirect('/')
}

function validationInput(req, res, urlRedirect) {
    const reqs = req.body
    const getSecStart = new Date(reqs.startDate).getTime()
    const getSecEnd = new Date(reqs.endDate).getTime()

    if (!reqs.projectName) {
        res.status(400)
        req.flash('danger', "Project name can't be empty!")
        return res.redirect(urlRedirect)
    } else if (!reqs.startDate || !reqs.endDate) {
        res.status(400)
        req.flash('danger', "Please input date correctly!")
        return res.redirect(urlRedirect)
    } else if (getSecStart > getSecEnd) {
        res.status(400)
        req.flash('danger', "End Date must be latest than Start Date!")
        return res.redirect(urlRedirect)
    } else if (!reqs.desc) {
        res.status(400)
        req.flash('danger', "Description can't be empty!")
        return res.redirect(urlRedirect)
    } else if (reqs.nodeJs == false && reqs.nextJs == false && reqs.reactJs == false && reqs.typescript == false) {
        res.status(400)
        req.flash('danger', "Please select at least one technologies!")
        return res.redirect(urlRedirect)
    }
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
    logout
}