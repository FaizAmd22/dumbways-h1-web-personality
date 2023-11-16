class Testimonial {
    constructor(name, review, image) {
        this.name = name
        this.review = review
        this.image = image
    }

    html() {
        return `
            <div class="testimonial">
                <img src="${this.image}" class="profile-testimonial" />
                <p class="quote">"${this.review}"</p>
                <p class="author">- ${this.name}</p>
            </div>
        `
    }
}

const testimonial1 = new Testimonial(
    "Mr. White",
    "Let him cook!",
    "https://i.pinimg.com/564x/f9/85/de/f985debe6c7a2e7a7b630bffc1548e07.jpg"
)
const testimonial2 = new Testimonial(
    "Mr. White",
    "I cannot teach anybody anything; I can only make them think.",
    "https://i.pinimg.com/564x/e2/72/bf/e272bfec9361ae5dee632b7b9137c5a8.jpg"
)
const testimonial3 = new Testimonial(
    "Sherlock Holmes",
    "The game is on!",
    "https://i.pinimg.com/564x/02/10/fd/0210fd848228fab719b22995e9271b2b.jpg"
)

testimonials = [testimonial1, testimonial2, testimonial3]

let testimonialHtml = ''
for (let index = 0; index < testimonials.length; index++) {
    testimonialHtml += testimonials[index].html()
}

document.querySelector(".testimonials").innerHTML = testimonialHtml