const Swal = require('sweetalert2')

let datas = [
    // {
    //     projectName: "Absensi App",
    //     desc: "Absensi app using ReactJs, ExpressJs and MYSQL",
    //     tech: [
    //         {
    //             node: true,
    //             next: false,
    //             react: true,
    //             typescript: false
    //         }
    //     ],
    //     duration: "2 months",
    //     startDate: "12 Jan 2023",
    //     endDate: "20 Mar 2023",
    //     fileImage: "/assets/img/imageContent1.jpg"
    // },
    // {
    //     projectName: "Simple Cart",
    //     desc: "Simple Cart using VueJs, Bootstrap and JQuery",
    //     tech: [
    //         {
    //             node: true,
    //             next: true,
    //             react: true,
    //             typescript: false
    //         }
    //     ],
    //     duration: "1 months",
    //     startDate: "09 Apr 2023",
    //     endDate: "25 Mei 2023",
    //     fileImage: "/assets/img/imageContent2.jpg"
    // },
    // {
    //     projectName: "Movie App",
    //     desc: "Movie app using MERN (MongoDB, ExpressJs, ReactJs and NodeJs) stack",
    //     tech: [
    //         {
    //             node: true,
    //             next: true,
    //             react: true,
    //             typescript: true
    //         }
    //     ],
    //     duration: '1 years',
    //     startDate: "22 Jun 2023",
    //     endDate: "02 Jul 2024",
    //     fileImage: "/assets/img/imageContent3.jpg"
    // },
]

function home(req, res) {
    res.render('index', {datas})
}
function contact(req, res) {
    res.render('contact')
}
function projects(req, res) {

    res.render('project', { datas })
}
function addProject(req, res) {
    res.render('addProject')
}
function addProjectPost(req, res) {
    // const { projectName, startDate, endDate, desc } = req.body
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
    let techs = {
        node: req.body.nodeJs ? true : false,
        next: req.body.nextJs ? true : false,
        react: req.body.reactJs ? true : false,
        typescript: req.body.typescript ? true : false
    }

    let data = {
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        tech: [{...techs}],
        duration: '',
        fileImage: req.file.path
    }

    data.fileImage = data.fileImage.substring(25)

    let day = Math.floor((getSecEnd - getSecStart) / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)
    
    // console.log("startdate :", data.startDate)
    // console.log("enddate :", data.endDate)
    // console.log("des :", data.desc)
    // console.log("node :", data.nodeJs)
    // console.log("next :", data.nextJs)
    // console.log("react :", data.reactJs)
    // console.log("typescript :", data.typescript)
    
    if (year >= 1) {
        data.duration = `${year} years`
        datas.unshift(data)
        console.log("data :", data)
        res.redirect('/projects')
    } else if (month >= 1) {
        data.duration = `${month} months`
        datas.unshift(data)
        console.log("data :", data)
        res.redirect('/projects')
    } else if (day >= 1) {
        data.duration = `${day} days`
        datas.unshift(data)
        console.log("data :", data)
        res.redirect('/projects')
    }
}
function projectDetail(req, res) {
    const { id } = req.params

    const name = datas[id].projectName
    const description = datas[id].desc
    const duration = datas[id].duration
    const startDate = datas[id].startDate
    const endDate = datas[id].endDate
    const tech = datas[id].tech
    const fileImage = datas[id].fileImage


    const data = {
        id,
        name,
        description,
        duration,
        startDate,
        endDate,
        tech,
        fileImage
    }

    res.render('projectDetail', {data})
}
function testimonial(req, res) {
    res.render('testimonial')
}

function updateProject(req, res) {
    const { id } = req.params
    
    const dataFilter = datas[parseInt(id)]
    dataFilter.id = parseInt(id)
    res.render('update', { data: dataFilter })
}

function updateProjectPost(req, res) {
    validationInput(req, res)
    const reqs = req.body
    const getSecStart = new Date(reqs.startDate).getTime()
    const getSecEnd = new Date(reqs.endDate).getTime()

    let techs = {
        node: req.body.nodeJs ? true : false,
        next: req.body.nextJs ? true : false,
        react: req.body.reactJs ? true : false,
        typescript: req.body.typescript ? true : false
    }

    let data = {
        id: req.body.id,
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        tech: [{...techs}],
        duration: ``,
        fileImage: datas[req.body.id].fileImage
    }

    let day = Math.floor((getSecEnd - getSecStart) / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)

    function updateData() {
        datas[parseInt(data.id)] = {
            projectName: data.projectName,
            startDate: data.startDate,
            endDate: data.endDate,
            desc: data.desc,
            tech: data.tech,
            duration: data.duration,
            fileImage: data.fileImage
        }
    }

    if (year >= 1) {
        data.duration = `${year} years`
        console.log(data)
        updateData()
        res.redirect('/projects')
    } else if (month >= 1) {
        data.duration = `${month} months`
        console.log(data)
        updateData()
        res.redirect('/projects')
    } else if (day >= 1) {
        data.duration = `${day} days`
        console.log(data)
        updateData()
        res.redirect('/projects')
    }
}


function deleteProject(req, res) {
    const { id } = req.params
    
    datas.splice(id, 1)
    res.redirect('/projects')
}
function deleteHomeProject(req, res) {
    const { id } = req.params
    
    datas.splice(id, 1)
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