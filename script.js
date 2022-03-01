// Variables
const body = document.querySelector('body')


// Get data
const xhttp = new XMLHttpRequest
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        const comments = JSON.parse(this.responseText)
        sectionMaker(comments)
    }
}
xhttp.open("GET", "data.json", true)
xhttp.send()


// Comment Maker
commentMaker = (user, commentor) =>{
    const commentBox = document.querySelector('.comment-box')
    const div = document.createElement('div')
    commentBox.append(div)

    const score = commentor.score
    const img = commentor.user.image.png
    const username = commentor.user.username
    const createdAt = commentor.createdAt
    const replyingTo = commentor.replyingTo
    const content = commentor.content
    const replies = commentor.replies

    makeComment(score, img, username, commentor, user, createdAt, replyingTo, content, replies, div)
}


// Make individual comments
makeComment = (score, img, username, commentor, user, creationDate, repliedTo, content, replies, div) =>{

    // Comment_____
    const comment = document.createElement('div')
    comment.classList.add('comment')
    div.append(comment)
    
    // Score box
    const scoreContainer = document.createElement('div')
    scoreContainer.classList.add('score-box')
    comment.append(scoreContainer)
    
    // Plus
    const plus = document.createElement('div')
    plus.classList.add('plus')
    scoreContainer.append(plus)
    
    const plusSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    plusSVG.setAttribute('width', '11')
    plusSVG.setAttribute('height', '11')
    plus.append(plusSVG)

    const plusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    plusPath.setAttribute('d', 'M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z')
    plusPath.setAttribute('fill', '#C5C6EF')
    plusSVG.append(plusPath)
    
    // score
    const scoreBox = document.createElement('div')
    scoreBox.classList.add('score')
    scoreContainer.append(scoreBox)
    
    const scoreP = document.createElement('p')
    scoreP.innerHTML = score
    scoreBox.append(scoreP)
    
    // minus
    const minus = document.createElement('div')
    minus.classList.add('minus')
    scoreContainer.append(minus)
    
    const minusSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    minusSVG.setAttribute('width', '11')
    minusSVG.setAttribute('height', '3')
    minus.append(minusSVG)

    const minusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    minusPath.setAttribute('d', 'M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z')
    minusPath.setAttribute('fill', '#C5C6EF')
    minusSVG.append(minusPath)

    // Scorebox function
    const scoreBtn = [...scoreContainer.children]
    scoreBtn.forEach(btn=>{
        if(btn.classList.contains('score') == false){
            btn.addEventListener('click', ()=>{
                const offset = btn.classList.contains('plus') == true ? 1 : -1
                scoreP.innerHTML = parseFloat(scoreP.innerHTML) + offset
            })
        }
    })
    

    // profile_____
    const profile = document.createElement('div')
    profile.classList.add('profile')
    comment.append(profile)

    // Profile image
    const profileIMG = document.createElement('img')
    profileIMG.setAttribute('src', img)
    profile.append(profileIMG)
    
    // Username
    const usernameP = document.createElement('p')
    usernameP.classList.add('username')
    usernameP.innerHTML = username
    profile.append(usernameP)

    // Check if its you
    if(username == user.username){
        // you span
        const you = document.createElement('p')
        you.classList.add('you')
        you.innerHTML = 'you'
        profile.append(you)

        // User buttons
        const userBtns = document.createElement('div')
        userBtns.classList.add('userBtns')
        comment.append(userBtns)

        // Delete button_____
        const deleteBtn = document.createElement('div')
        deleteBtn.classList.add('delete-btn')
        userBtns.append(deleteBtn)

        const deleteSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        deleteSVG.setAttribute('width', '12')
        deleteSVG.setAttribute('height', '14')
        deleteBtn.append(deleteSVG)

        const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        deletePath.setAttribute('d', 'M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z')
        deletePath.setAttribute('fill', '#ED6368')
        deleteSVG.append(deletePath)
        
        const deleteP = document.createElement('p')
        deleteP.innerHTML = 'Delete'
        deleteBtn.append(deleteP)

        deleteBtn.addEventListener('click', ()=>{
            body.classList.add('no-scroll')
            deleteBox(comment)
        })
        
        // Edit button_____
        const editBtn = document.createElement('div')
        editBtn.classList.add('edit-btn')
        userBtns.append(editBtn)

        const editSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        editSVG.setAttribute('width', '14')
        editSVG.setAttribute('height', '14')
        editBtn.append(editSVG)

        const editPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        editPath.setAttribute('d', 'M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z')
        editPath.setAttribute('fill', '#5357B6')
        editSVG.append(editPath)
        
        const edit = document.createElement('p')
        edit.innerHTML = 'Edit'
        editBtn.append(edit)

        editBtn.addEventListener('click', ()=>{
            createForm(contentBox, repliedTo, contentP)
        })
    }else{
        const replybox = document.createElement('div')
        replybox.classList.add('replybox')
        comment.append(replybox)

        // Reply button_____
        const replyBtn = document.createElement('div')
        replyBtn.classList.add('reply-btn')
        replybox.append(replyBtn)
        
        const replySVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        replySVG.setAttribute('width', '14')
        replySVG.setAttribute('height', '13')
        replyBtn.append(replySVG)

        const replyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        replyPath.setAttribute('d', 'M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z')
        replyPath.setAttribute('fill', '#5357B6')
        replySVG.append(replyPath)
        
        const reply = document.createElement('p')
        reply.innerHTML = 'reply'
        replyBtn.append(reply)

        replyBtn.addEventListener('click', ()=>{
            makeReply(user, div, username)
        })
    }
    
    // Time created
    const createdAt = document.createElement('p')
    createdAt.classList.add('createdAt')
    createdAt.innerHTML = creationDate
    profile.append(createdAt)
    
    
    
    
    // Content_____
    const contentBox = document.createElement('div')
    contentBox.classList.add('content')
    comment.append(contentBox)
    
    // content p
    const contentP = document.createElement('p')
    contentP.classList.add('content')
    contentBox.append(contentP)
    
    if(repliedTo !== undefined){
        // content span
        contentP.innerHTML = `<span class="replyTo">@${repliedTo}</span> ${content}`
    }else{
        contentP.innerHTML = content
    }
    
    
    // reply maker_____
    replyMaker = () =>{
        const replyContainer = document.createElement('div')
        replyContainer.classList.add('replies')
        div.append(replyContainer)
        
        const replyComments = replies
        
        for (let i=0; i < replyComments.length; i++) {
            const score = replyComments[i].score
            const img = replyComments[i].user.image.png
            const username = replyComments[i].user.username
            const createdAt = replyComments[i].createdAt
            const replyingTo = replyComments[i].replyingTo
            const content = replyComments[i].content
            const replies = replyComments[i].replies
            
            makeComment(score, img, username, replyComments[i], user, createdAt, replyingTo, content, replies, replyContainer)
        }
    }
    
    if(commentor.hasOwnProperty('replies') == true && replies.length > 0){
        replyMaker()
    }
}


// Make reply
makeReply = (commentor, parent, span) =>{
    const div = document.createElement('div')
    div.classList.add('make-reply')

    if(parent.classList.contains('replies') == true){
        parent.append(div)
    }else{
        parent.insertBefore(div, parent.children[1])
    }

    const img = document.createElement('img')
    img.setAttribute('src', commentor.image.png)
    div.append(img)

    const replyForm = document.createElement('form')
    div.append(replyForm)

    const textarea = document.createElement('textarea')
    textarea.innerHTML = `@${span} `
    replyForm.append(textarea)

    const button = document.createElement('button')
    button.classList.add('submit')
    button.innerHTML = 'Reply'
    replyForm.append(button)

    button.addEventListener('click', (e)=>{
        e.preventDefault()
        
        const score = 0
        const userImg = commentor.image.png
        const username = commentor.username
        const createdAt = 'Just now'
        textarea.value = textarea.value.replace(`@${span}`, "")
        const content = textarea.value
        const replies = ''

        if(parent.classList.contains('replies') == true){
            div.remove()
            makeComment(score, userImg, username, username, commentor, createdAt, span, content, replies, parent)
        }else{
            div.classList.remove('make-reply')
            div.classList.add('replies')
            makeComment(score, userImg, username, username, commentor, createdAt, span, content, replies, div)
        }

        img.remove()
        replyForm.remove()
    })
}


// Delete function
deleteBox = (item) =>{
    const main = document.querySelector('main')

    const alertBoxBg = document.createElement('div')
    alertBoxBg.classList.add('alertBox-bg')
    main.append(alertBoxBg)
    
    const alertBox = document.createElement('div')
    alertBox.classList.add('alertBox')
    alertBoxBg.append(alertBox)
    
    const h2 = document.createElement('h2')
    h2.innerHTML = 'Delete comment'
    alertBox.append(h2)
    
    const p = document.createElement('p')
    p.innerHTML = "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
    alertBox.append(p)
    
    const no = document.createElement('button')
    no.classList.add('no')
    no.innerHTML = 'No, cancel'
    alertBox.append(no)
    
    const yes = document.createElement('button')
    yes.classList.add('yes')
    yes.innerHTML = 'Yes, delete'
    alertBox.append(yes)
    
    no.addEventListener('click', ()=>{
        body.classList.remove('no-scroll')
        alertBoxBg.remove()
    })
    yes.addEventListener('click', ()=>{
        body.classList.remove('no-scroll')
        alertBoxBg.remove()
        item.remove()
    })
}


createForm = (box, span, p) =>{
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    box.append(form)
    
    const textarea = document.createElement('textarea')
    form.append(textarea)
    
    const button = document.createElement('button')
    button.setAttribute('type', 'submit')
    button.classList.add('submit')
    button.innerHTML = 'update'
    form.append(button)
    
    if(span !== undefined){
        textarea.innerHTML = p.innerHTML.replace(`<span class="replyTo">@${span}</span>`, "")
        p.setAttribute('style', 'display: none')
    }else{
        textarea.innerHTML = p.innerHTML
        p.setAttribute('style', 'display: none')
    }
    
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        
        if(span !== undefined){
            p.innerHTML = `<span class="replyTo">@${span}</span> ${textarea.value}`
            p.setAttribute('style', 'display: block')
        }else{
            p.innerHTML = textarea.value
            p.setAttribute('style', 'display: block')
        }

        form.remove()
    })
}


// Make comment section
sectionMaker = (data) =>{
    // Make all comments
    const comments = data.comments
    const user = data.currentUser.username
    const currentUser = data.currentUser

    for (let i=0; i < comments.length; i++) {
        commentMaker(currentUser, comments[i])
    }
    

    // User commentbox
    const userImg = document.querySelector('.user-commentbox > img')
    userImg.setAttribute('src', data.currentUser.image.png)
    userImg.setAttribute('alt', data.currentUser.username)

    // Submit
    const form = document.querySelector('.user-commentbox > form')
    const textarea = form.children[0]

    form.addEventListener('submit', (e)=>{
        e.preventDefault()

        if(textarea.value !== ''){
            const commentBox = document.querySelector('.comment-box')
            const div = document.createElement('div')
            commentBox.append(div)
            
            const score = 0
            const img = userImg.src
            const createdAt = 'Just now'
            const replyingTo = undefined
            const content = textarea.value
            const replies = ''
            
            textarea.value = ''
            makeComment(score, img, user, user, currentUser, createdAt, replyingTo, content, replies, div)
        }
    })
}