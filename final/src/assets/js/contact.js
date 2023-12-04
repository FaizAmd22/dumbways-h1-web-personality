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
    const invalidEmail = !isEmail(inputEmail)

    if (inputName.length === 0) {
        alert("Name can't be empty!")
    } else if (inputEmail.length === 0) {
        alert("Email can't be empty!")
    } else if (invalidEmail) {
        alert("Wrong Email! Please input email correctly!")
    } else if (inputPhone.length === 0) {
        alert("Phone number can't be empty!")
    } else if (inputSubject.length === 0) {
        alert("Subject can't be empty!")
    } else if (inputMessage.length === 0) {
        alert("Message can't be empty!")
    } else {
        console.log(`Name : ${inputName}\nEmail : ${inputEmail}\nPhone number : ${inputPhone}\nSubject : ${inputSubject}\nMessage : ${inputMessage}`)

        const email = "ahmadfaizhal8@gmail.com"
        let a = document.createElement('a')
        a.href = `mailto:${email}?subject=${inputSubject}&body=${inputMessage}`
        a.click()
    }
}

// pengecekan bentuk email
function isEmail(email) {
    const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    return regx.test(email);
  }

// validasi inputan
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()