let datas = [
    {
        projectName: "Absensi App",
        desc: "Absensi app using ReactJs, ExpressJs and MYSQL",
        node: true,
        next: false,
        react: true,
        typescript: false,
        duration: "2 months",
        startDate: "12 Jan 2023",
        endDate: "20 Mar 2023"
    },
    {
        projectName: "Simple Cart",
        desc: "Simple Cart using VueJs, Bootstrap and JQuery",
        node: true,
        next: true,
        react: true,
        typescript: false,
        duration: "1 months",
        startDate: "09 Apr 2023",
        endDate: "25 Mei 2023"
    },
    {
        projectName: "Movie App",
        desc: "Movie app using MERN (MongoDB, ExpressJs, ReactJs and NodeJs) stack",
        node: true,
        next: true,
        react: true,
        typescript: true,
        duration: '1 years',
        startDate: "22 Jun 2023",
        endDate: "02 Jul 2024"
    },
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
    let data = {
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        nodeJs: req.body.nodeJs ? true : false,
        nextJs: req.body.nextJs ? true : false,
        reactJs: req.body.reactJs ? true : false,
        typescript: req.body.typescript ? true : false,
        duration: ''
    }

    let getSecStart = new Date(data.startDate).getTime()
    let getSecEnd = new Date(data.endDate).getTime()

    let day = Math.floor((getSecEnd - getSecStart) / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)
    

    // console.log("name :", data.projectName)
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
            console.log(data)
            res.redirect('/projects')
        } else if (month >= 1) {
            data.duration = `${month} months`
            console.log(data)
            datas.unshift(data)
            res.redirect('/projects')
        } else if (day >= 1) {
            data.duration = `${day} days`
            console.log(data)
            datas.unshift(data)
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
    const node = datas[id].node
    const next = datas[id].next
    const react = datas[id].react
    const typescript = datas[id].typescript


    const data = {
        id,
        name,
        description,
        duration,
        startDate,
        endDate,
        node,
        next,
        react,
        typescript
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
    console.log("dataFilter", dataFilter)
    res.render('update', { data: dataFilter })
}

function updateProjectPost(req, res) {
    let data = {
        id: req.body.id,
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        nodeJs: req.body.nodeJs ? true : false,
        nextJs: req.body.nextJs ? true : false,
        reactJs: req.body.reactJs ? true : false,
        typescript: req.body.typescript ? true : false,
        duration: `2 years`
    }

    let getSecStart = new Date(data.startDate).getTime()
    let getSecEnd = new Date(data.endDate).getTime()

    let day = Math.floor((getSecEnd - getSecStart) / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)
    
    function updateData() {
        datas[parseInt(data.id)] = {
            projectName: data.projectName,
            startDate: data.startDate,
            endDate: data.endDate,
            desc: data.endDate,
            node: data.nodeJs,
            next: data.nextJs,
            react: data.reactJs,
            typescript: data.typescript,
            duration: data.duration
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