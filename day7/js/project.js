// variable yang menampung data saat tombol submit dieksekusi dan berhasil menambahkan data
let dataProjects = []

// function saat button submit dikilk
function submitProject(e) {
    e.preventDefault()

    // ambil nilai nodejs
    let inputNode = false
    if (document.getElementById("nodeJs").checked) {
        inputNode = true
    }
    // ambil nilai nextjs
    let inputNext = false
    if (document.getElementById("nextJs").checked) {
        inputNext = true
    }
    // ambil nilai reactjs
    let inputReact = false
    if (document.getElementById("reactJs").checked) {
        inputReact = true
    }
    // ambil nilai typescript
    let inputTypescript = false
    if (document.getElementById("typeScript").checked) {
        inputTypescript = true
    }
    

    // ambil nilai dari form
    let inputProjectName = document.getElementById("inputName").value
    let inputStartDate = document.getElementById("inputStartDate").value
    let inputEndDate = document.getElementById("inputEndDate").value
    let inputDesc = document.getElementById("inputDesc").value
    let uploadedImage = document.getElementById("upload").files


    // mengubah value date
    let startDate = new Date(inputStartDate)
    let endDate = new Date(inputEndDate)
    
    let milliSecStart = startDate.getTime()
    let milliSecEnd = endDate.getTime()
    
    let duration = milliSecEnd - milliSecStart
    let day = Math.floor(duration / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)

    // pengkondisian nilai duration
    if (year >= 1) {
        duration = year + " years"
    } else if (month >= 1) {
        duration = month + " months"
    } else {
        duration = day + " days"
    }


    // pengkondisian saat input kosong dan berhasil ditambahkan
    if (inputProjectName.length === 0) {
        alert("Project Name can't be empty")
    } else if (!inputStartDate) {
        alert("Start Date can't be empty")
    } else if (!inputEndDate) {
        alert("End Date can't be empty")
    } else if (!inputDesc) {
        alert("Description can't be empty")
    } else if (inputNode === false && inputNext === false && inputReact === false && inputTypescript === false) {
        alert("Please select at least one technologies")
    } else if (uploadedImage.length === 0) {
        alert("Please choose an image")
    } else {
        uploadedImage = URL.createObjectURL(uploadedImage[0])

        const project = {
            title: inputProjectName,
            description: inputDesc,
            image: uploadedImage,
            startDate: inputStartDate,
            endDate: inputEndDate,
            nodeJs: inputNode,
            nextJs: inputNext,
            reactJs: inputReact,
            typescript: inputTypescript,
            duration: duration
        }
        
        dataProjects.push(project)
        localStorage.setItem("Projects", JSON.stringify(dataProjects))
        renderProject()
        alert("Project has been added!")
    }
}

function deleteData(data) {
    delete dataProjects[data]
    console.log(dataProjects)
}


// function untuk menampilkan card saat data berhasil ditambahkan
function renderProject() {
    document.getElementById("projects").innerHTML = ''
    for (let index = 0; index < dataProjects.length; index++) {
        document.getElementById("projects").innerHTML += `
        <div id="projectCard" class="projectCard">
            <div class="projectImage">
                <img src="${dataProjects[index].image}" alt="" />
            </div>
            <div class="projectContent">
                <h1>
                    <a href="projectDetail.html" target="_blank">${dataProjects[index].title}</a>
                </h1>
                <div class="detailProjectContent">
                    <h4>duration : ${dataProjects[index].duration}</h4>
                </div>
                <p>
                    ${dataProjects[index].description}
                </p>
                <div class="projectTech">
                    ${dataProjects[index].nodeJs === true ? "<i class='fa-brands fa-node-js'></i>" : ""}
                    ${dataProjects[index].nextJs === true ? "<img src='assets/icons/nextJs.png' alt='nextJs'>" : ""}
                    ${dataProjects[index].reactJs === true ? "<i class='fa-brands fa-react'></i>" : ""}
                    ${dataProjects[index].typescript === true ? "<img src='assets/icons/typescript.png' alt='typeScript'>" : ""}
                </div>
                <div class="btnGroup">
                    <button class="btnEdit">Edit</button>
                    <button onclick="deleteData(${index})" class="btnDelete">Delete</button>
                </div>
            </div>
        </div>`

    }
}