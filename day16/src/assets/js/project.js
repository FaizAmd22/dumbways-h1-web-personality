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
            nodeJs: inputNode,
            nextJs: inputNext,
            reactJs: inputReact,
            typescript: inputTypescript,
            duration: getDuration()
        }
        
    }
}


// function untuk menampilkan durasi
function getDuration() {
    let inputStartDate = document.getElementById("inputStartDate").value
    let inputEndDate = document.getElementById("inputEndDate").value

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
        return duration = year + " years"
    } else if (month >= 1) {
        return duration = month + " months"
    } else {
        return duration = day + " days"
    }
}


// function untuk delete card
function deleteData(data) {
    dataProjects = dataProjects.filter((e) => e !== dataProjects[data])
    renderProject()
}


// function untuk menampilkan card saat data berhasil ditambahkan
function renderProject() {
    document.getElementById("projects").innerHTML = ''
    for (let index = 0; index < dataProjects.length; index++) {
        document.getElementById("projects").innerHTML += `
        
        <div class="col-12 col-md-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <!-- image -->
                    <img src="${dataProjects[index].image}" alt="imageContent" class="w-100 rounded-2 mb-2">

                    <!-- Judul card -->
                    <a class="card-title text-decoration-none fw-bold text-capitalize" href="projectDetail.html" target="_blank">
                        ${dataProjects[index].title}
                    </a>

                    <!-- Durasi -->
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                        duration : ${dataProjects[index].duration}
                    </h6>
                    <p class="card-text overflow-hidden" style="height: 70px;">
                        ${dataProjects[index].description}
                    </p>

                    <!-- Icon -->
                    <div class="my-4 d-flex gap-2">
                        ${dataProjects[index].nodeJs === true ? "<i class='fa-brands fa-node-js fs-3'></i>" : ""}
                        ${dataProjects[index].nextJs === true ? "<img src='assets/icons/nextJs.png' alt='nextJs' style='width: 28px; height: 28px;'>" : ""}
                        ${dataProjects[index].reactJs === true ? "<i class='fa-brands fa-react fs-3'></i>" : ""}
                        ${dataProjects[index].typescript === true ? "<img src='assets/icons/typescript.png' alt='typeScript' style='width: 28px; height: 28px;'>" : ""}
                    </div>

                    <!-- Button -->
                    <div class="row">
                        <div class="col-6">
                            <div class="text-center bg-black rounded-3">
                                <a class="btn btnEdit text-decoration-none text-white">Edit</a>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="text-center bg-black rounded-3">
                                <a onclick="deleteData(${index})" class="btn btnDelete text-decoration-none text-white">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    }
}