let DOM_LOADED = false
const queuedJobs = []

window.addEventListener('load', () => {
    DOM_LOADED = true

    while (queuedJobs.length)
        queuedJobs.pop()() // I love JavaScript
})

/**
 * This function is used to do any DOM-related
 * work once the DOM has loaded.
 * @param cb Any callback function
 */
const work = (cb) => {
    if (!DOM_LOADED)
        return queuedJobs.push(cb)
    return cb()
}

// Handle form submit
work(() => {
    const newsLetterForm = document.querySelector(".newsletter .container form")
    const messageDiv = document.querySelector(".newsletter .container .message")

    newsLetterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(newsLetterForm);
        const email = formData.get("email")
        messageDiv.innerHTML = email ?
            `Thank you! Your email address (${email}) has been added to our mailing list!` :
            "Please enter a valid email address."
    })
})