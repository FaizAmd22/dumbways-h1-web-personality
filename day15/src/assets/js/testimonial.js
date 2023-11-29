// class Testimonial {
//     constructor(author, quotes, image) {
//         this.author = author
//         this.quotes = quotes
//         this.image = image
//     }

//     html() {
//         return `
//             <div class="testimonial animate__animated animate__fadeIn">
//                 <img src="${this.image}" class="profile-testimonial" />
//                 <p class="quote">"${this.quotes}"</p>
//                 <p class="author">- ${this.author}</p>
//             </div>
//         `
//     }
// }

// const testimonial1 = new Testimonial(
//     "Mr. White",
//     "Let him cook!",
//     "https://i.pinimg.com/564x/f9/85/de/f985debe6c7a2e7a7b630bffc1548e07.jpg"
// )
// const testimonial2 = new Testimonial(
//     "Mr. White",
//     "I cannot teach anybody anything; I can only make them think.",
//     "https://i.pinimg.com/564x/e2/72/bf/e272bfec9361ae5dee632b7b9137c5a8.jpg"
// )
// const testimonial3 = new Testimonial(
//     "Sherlock Holmes",
//     "The game is on!",
//     "https://i.pinimg.com/564x/02/10/fd/0210fd848228fab719b22995e9271b2b.jpg"
// )

// testimonials = [testimonial1, testimonial2, testimonial3]

// let testimonialHtml = ''
// for (let index = 0; index < testimonials.length; index++) {
//     testimonialHtml += testimonials[index].html()
// }

// document.querySelector(".testimonials").innerHTML = testimonialHtml


// Data testimonials
const testimonialData = [
    {
        author: "Mr. White",
        content: "Let him cook!",
        image: "https://i.pinimg.com/564x/f9/85/de/f985debe6c7a2e7a7b630bffc1548e07.jpg",
        rating: 4,
    },
    {
        author: "Professor",
        content: "I cannot teach anybody anything; I can only make them think.",
        image: "https://i.pinimg.com/564x/e2/72/bf/e272bfec9361ae5dee632b7b9137c5a8.jpg",
        rating: 3
    },
    {
        author: "Sherlock Holmes",
        content: "The game is on!",
        image: "https://i.pinimg.com/564x/02/10/fd/0210fd848228fab719b22995e9271b2b.jpg",
        rating: 5
    },
    {
        author: "Gustavo Fring",
        content: "Say my name",
        image: "https://i.pinimg.com/564x/f1/2a/93/f12a938a9a516e026632ee1f461e6a79.jpg",
        rating: 4
    },
    {
        author: "Jim Moriarty",
        content: "Did you miss me?",
        image: "https://i.pinimg.com/564x/98/54/13/985413a19b3c08a42b4862aa8b05aefb.jpg",
        rating: 5
    }
]


// Menampilkan semua card
function showTestimonials() {
    let testimonialHtml = ``
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
function filterByRating(rating) {
    let testimonialHtml = ``
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