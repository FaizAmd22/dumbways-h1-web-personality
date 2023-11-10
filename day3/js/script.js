// const nilai = 78
// const nilaiPredikat = function () {
//     if (nilai >= 90) {
//         console.log("Nilai A")
//     } else if (nilai >= 70) {
//         console.log("Nilai B")
//     } else if (nilai >= 60) {
//         console.log("Nilai C")
//     } else if (nilai >= 50) {
//         console.log("Nilai D")
//     } else {
//         console.log("Nilai E")
//     }
// }

// nilaiPredikat(nilai)


function submitButton() {
    const inputName = document.getElementById("inputName").value
    const inputEmail = document.getElementById("inputEmail").value
    const inputPhone = document.getElementById("inputPhone").value
    const inputSubject = document.getElementById("inputSubject").value
    const inputMessage = document.getElementById("inputMessage").value

    if (inputName.length === 0) {
        alert("Nama harus diisi!")
    } else if (inputEmail.length === 0) {
        alert("Email harus diisi!")
    } else if (inputEmail == false) {
        alert("email salah!")
    } else if (inputPhone.length === 0) {
        alert("Phone number can't be empty!")
    } else if (inputSubject.length === 0) {
        alert("Subject harus diisi!")
    } else if (inputMessage.length === 0) {
        alert("Message harus diisi!")
    } else {
        console.log(`Name : ${inputName}\nEmail : ${inputEmail}\nPhone number : ${inputPhone}\nSubject : ${inputSubject}\nMessage : ${inputMessage}`)

        const email = "ahmadfaizhal8@gmail.com"
        let a = document.createElement('a')
        a.href = `mailto:${email}?subject=${inputSubject}&body=${inputMessage}`
        a.click()
    }
}