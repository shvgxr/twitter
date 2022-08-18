const like = document.querySelectorAll('#like-butt')
const del = document.querySelectorAll('#del-butt')

Array.from(like).forEach(element => {
    element.addEventListener('click', addLike)
})

Array.from(del).forEach(element => {
    element.addEventListener('click', delTweet)
})

async function addLike(){
    const nameq = this.parentNode.childNodes[3].innerText
    const tweetq = this.parentNode.childNodes[7].innerText
    const likesq = Number(this.parentNode.childNodes[9].innerText)
    try{
        const res = await fetch ('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'usernameS': nameq,
                'tweetS': tweetq,
                'likesS': likesq
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function delTweet(){
    const nameq = this.parentNode.childNodes[3].innerText
    const tweetq = this.parentNode.childNodes[7].innerText
    try{
        const res = await fetch ('deleteTweet', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'usernameS': nameq,
                'tweetS': tweetq,
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}