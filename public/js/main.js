const deleteText = document.querySelectorAll('.fa-trash-xmark')
const thumbText = document.querySelectorAll('.fa-duotone fa-thumbs-up')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteEvent)
})

Array.from(thumbText).forEach((element) => {
    element.addEventListener('click', addLike)
})

async function deleteEvent() {
    const fanName = this.parentNode.childNodes[1].innerText
    const eventName = this.parentNode.childNodes[3].innerText
    try {
        const response = await fetch('deleteEvent', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'eventS': fanName,
                'eventNameS': eventName,
                'typeS': type,
                'venueS': venue,
                'locationS': location,
                'setCountS': setCount,
                'datesS': dates,


            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }
}

async function addLike() {
    const fanName = this.parentNode.childNodes[1].innerText
    const eventName = this.parentNode.childNodes[3].innerText
    const likes = Number(this.parentNode.childNodes[5].innerText)
    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'eventS': fanName,
                'eventNameS': eventName,
                'typeS': type,
                'venueS': venue,
                'locationS': location,
                'setCountS': setCount,
                'datesS': dates,
                'likeS': tlikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }
}