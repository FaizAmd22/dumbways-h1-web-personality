let dataProjects = []


function submitProject(e) {
    e.preventDefault()

    let inputNode = false
    if (document.getElementById("nodeJs").checked) {
        inputNode = true
    }
    
    let inputNext = false
    if (document.getElementById("nextJs").checked) {
        inputNext = true
    }

    let inputReact = false
    if (document.getElementById("reactJs").checked) {
        inputReact = true
    }
    
    let inputTypescript = false
    if (document.getElementById("typeScript").checked) {
        inputTypescript = true
    }
    
    let inputProjectName = document.getElementById("inputName").value
    let inputStartDate = document.getElementById("inputStartDate").value
    let inputEndDate = document.getElementById("inputEndDate").value
    let inputDesc = document.getElementById("inputDesc").value
    let uploadedImage = document.getElementById("upload").files

    
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
            typescript: inputTypescript
        }
        
        dataProjects.push(project)
        localStorage.setItem("Projects", JSON.stringify(dataProjects))
        renderProject()
    }
}

function renderProject() {
    document.getElementById("projects").innerHTML = ''
    for (let index = 0; index < dataProjects.length; index++) {
        document.getElementById("projects").innerHTML += `
        <div class="projectCard">
            <div class="projectImage">
                <img src="${dataProjects[index].image}" alt="" />
            </div>
            <div class="projectContent">
                <h1>
                    <a href="projectDetail.html" target="_blank">${dataProjects[index].title}</a>
                </h1>
                <div class="detailProjectContent">
                    durasi : 1 bulan
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
                    <button class="btnPost">Delete</button>
                </div>
            </div>
        </div>`
    }
}