// let datas = [
//     {
//         name: "Absensi App",
//         description: "Absensi app using ReactJs, ExpressJs and MYSQL",
//         node: true,
//         next: false,
//         react: true,
//         typescript: false,
//         duration: "2 months",
//         startDate: "12 Jan 2023",
//         endDate: "20 Mar 2023",
//         image: "imageContent1.jpg"
//     },
//     {
//         name: "Simple Cart",
//         description: "Simple Cart using VueJs, Bootstrap and JQuery",
//         node: true,
//         next: true,
//         react: true,
//         typescript: false,
//         duration: "1 months",
//         startDate: "09 Apr 2023",
//         endDate: "25 Mei 2023",
//         image: "imageContent2.jpg"
//     },
//     {
//         name: "Movie App",
//         description: "Movie app using MERN (MongoDB, ExpressJs, ReactJs and NodeJs) stack",
//         node: true,
//         next: true,
//         react: true,
//         typescript: true,
//         duration: '1 years',
//         startDate: "22 Jun 2023",
//         endDate: "02 Jul 2024",
//         image: "imageContent3.jpg"
//     },
// ]

const config = require('../src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const tb_projects = require('../src/models/tb_projects')

async function home(req, res) {
    const query = 'SELECT * FROM tb_projects'
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('index', { data: object })
}

function contact(req, res) {
    res.render('contact')
}
async function projects(req, res) {
    const query = 'SELECT * FROM tb_projects'
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('project', { datas : object.reverse() })
}
function addProject(req, res) {
    res.render('addProject')
}
function addProjectPost(req, res) {
    validationInput(req, res)
    const reqs = req.body
    const getSecStart = new Date(reqs.startDate).getTime()
    const getSecEnd = new Date(reqs.endDate).getTime()
    if (!req.file) {
        res.status(400).send({
            status: false,
            data: "Image can't be empty!",
        })      
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
    const id  = req.params.id

    // const name = datas[id].projectName
    // const description = datas[id].desc
    // const duration = datas[id].duration
    // const startDate = datas[id].startDate
    // const endDate = datas[id].endDate
    // const tech = datas[id].tech
    // const fileImage = datas[id].fileImage


    // const data = {
    //     id,
    //     name,
    //     description,
    //     duration,
    //     startDate,
    //     endDate,
    //     tech,
    //     fileImage
    // }
    const query = `SELECT * FROM tb_projects where id=${id}`
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('projectDetail', { data: object[0] })
}

function testimonial(req, res) {
    res.render('testimonial')
}

async function updateProject(req, res) {
    const { id } = req.params
    
    // const dataFilter = datas[parseInt(id)]
    // dataFilter.id = parseInt(id)
    const query = `SELECT * FROM tb_projects where id=${id}`
    const object = await sequelize.query(query, { type: QueryTypes.SELECT })
    res.render('update', { data: object[0] })
}

async function updateProjectPost(req, res) {
    try {
        validationInput(req, res)
        const reqs = req.body
        const getSecStart = new Date(reqs.startDate).getTime()
        const getSecEnd = new Date(reqs.endDate).getTime()

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
            res.redirect('/projects')
        } else if (month >= 1) {
            data.duration = `${month} months`

            updateData()
            res.redirect('/projects')
        } else if (day >= 1) {
            data.duration = `${day} days`

            updateData()
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
    res.redirect('/projects')
}
async function deleteHomeProject(req, res) {
    const { id } = req.params
    
    // datas.splice(id, 1)
    const query = `delete from tb_projects where id=${id}`
    const object = await sequelize.query(query, { type: QueryTypes.DELETE })

    console.log("data dihapus :", object)
    res.redirect('/')
}

function validationInput(req, res) {
    const reqs = req.body
    const getSecStart = new Date(reqs.startDate).getTime()
    const getSecEnd = new Date(reqs.endDate).getTime()

    if (!reqs.projectName) {
        res.status(400).send({
            status: false,
            data: "Project name can't be empty!",
        })
    } else if (!reqs.startDate || !reqs.endDate) {
        res.status(400).send({
            status: false,
            data: "Please input date correctly!",
        })
    } else if ( getSecStart > getSecEnd ) {
        res.status(400).send({
            status: false,
            data: "End Date must be latest than Start Date!",
        })
    } else if (!reqs.desc) {
        res.status(400).send({
            status: false,
            data: "Description can't be empty!",
        })
    } else if (reqs.nodeJs == false && reqs.nextJs == false && reqs.reactJs == false && reqs.typescript == false) {
        res.status(400).send({
            status: false,
            data: "Please select at least one technologies!",
        })
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
    deleteHomeProject
}