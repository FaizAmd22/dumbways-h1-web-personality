const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.npoint.io/9b469dc8617f3d82b34b', true)
    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
        } else {
            reject("Internal server error!")
        }
    }

    xhr.onerror = () => {
        reject("Network error!")
    }

    xhr.send()
})

// Menampilkan semua card
async function showTestimonials() {
    let testimonialHtml = ``
    const testimonialData = await promise
    testimonialData.map((item) => {
        testimonialHtml += html(item)
    })

    document.getElementById("testimonials").innerHTML = testimonialHtml
}

// struktur card
function html(item) {
    return `
        <div class="testimonial animate__animated animate__fadeIn">
            <img src="${item.image}" class="profile-testimonial" />
            <p class="quote">"${item.content}"</p>
            <p class="author">- ${item.author}</p>
            <p class="author rating">
                ${item.rating}
                <i class="fa-solid fa-star"></i>
            </p>
        </div>
    `
}

showTestimonials()


// filter berdasarkan rating
async function filterByRating(rating) {
    let testimonialHtml = ``
    const testimonialData = await promise

    const cardFiltered = testimonialData.filter((item) => {
        return item.rating === rating
    })

    if (cardFiltered.length === 0) {
        testimonialHtml = `<h3>No testimonials on this rating!</h3>`
    } else {
        cardFiltered.map((item) => {
            testimonialHtml += html(item)
        })
    }

    document.getElementById("testimonials").innerHTML = testimonialHtml
}