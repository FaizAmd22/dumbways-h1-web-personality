let datas = [
    {
        projectName: "Absensi App",
        desc: "Absensi app using ReactJs, ExpressJs and MYSQL",
        tech: [
            {node: true},
            {next: false},
            {react: true},
            {typescript: false}
        ],
        duration: "2 months",
        startDate: "12 Jan 2023",
        endDate: "20 Mar 2023"
    },
    {
        projectName: "Simple Cart",
        desc: "Simple Cart using VueJs, Bootstrap and JQuery",
        tech: [
            {node: true},
            {next: false},
            {react: true},
            {typescript: true}
        ],
        duration: "1 months",
        startDate: "09 Apr 2023",
        endDate: "25 Mei 2023"
    },
    {
        projectName: "Movie App",
        desc: "Movie app using MERN (MongoDB, ExpressJs, ReactJs and NodeJs) stack",
        tech: [
            {node: true},
            {next: true},
            {react: true},
            {typescript: true}
        ],
        duration: '1 years',
        startDate: "22 Jun 2023",
        endDate: "02 Jul 2024"
    },
]

function home(req, res) {
    res.render('index')
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
    let tech = {
        nodeJs: req.body.nodeJs ? true : false,
        nextJs: req.body.nextJs ? true : false,
        reactJs: req.body.reactJs ? true : false,
        typescript: req.body.typescript ? true : false,
    }

    let data = {
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        desc: req.body.desc,
        tech: [{...tech}],
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
            console.log(data)
            res.redirect('/projects')
        } else if (month >= 1) {
            data.duration = `${month} months`
            console.log(data)
            res.redirect('/projects')
        } else if (day >= 1) {
            data.duration = `${day} days`
            console.log(data)
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


    const data = {
        id,
        name,
        description,
        duration,
        startDate,
        endDate,
        tech
    }

    res.render('projectDetail', {data})
}
function testimonial(req, res) {
    res.render('testimonial')
}

module.exports = {
    home,
    contact,
    projects,
    addProject,
    addProjectPost,
    projectDetail,
    testimonial
}