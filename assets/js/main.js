 const data = {
	currentUser: {
		image: {
			png: "assets/images/avatars/image-juliusomo.png",
			webp: "assets/images/avatars/image-juliusomo.webp",
		},
		username: "juliusomo",
	},
	comments: [
		{
			parent: 0,
			id: 1,
			content:
				"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
			createdAt: "1 month ago",
			score: 12,
			user: {
				image: {
					png: "./assets/images/avatars/image-amyrobson.png",
					webp: "./assets/images/avatars/image-amyrobson.webp",
				},
				username: "amyrobson",
			},
			replies: [],
		},
		{
			parent: 0,
			id: 2,
			content:
				"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
			createdAt: "2 weeks ago",
			score: 5,
			user: {
				image: {
					png: "assets/images/avatars/image-maxblagun.png",
					webp: "assets/images/avatars/image-maxblagun.webp",
				},
				username: "maxblagun",
			},
			replies: [
				{
					parent: 2,
					id: 1,
					content:
						"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
					createdAt: "1 week ago",
					score: 4,
					replyingTo: "maxblagun",
					user: {
						image: {
							png: "assets/images/avatars/image-ramsesmiron.png",
							webp: "assets/images/avatars/image-ramsesmiron.webp",
						},
						username: "ramsesmiron",
					},
				},
				{
					parent: 2,
					id: 1,
					content:
						"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
					createdAt: "2 days ago",
					score: 2,
					replyingTo: "ramsesmiron",
					user: {
						image: {
							png: "assets/images/avatars/image-juliusomo.png",
							webp: "assets/images/avatars/image-juliusomo.webp",
						},
						username: "juliusomo",
					},
				},
			],
		},
	],
};  

    /* envia template comentarios para armazenamento navegador*/
    document.addEventListener("DOMContentLoaded", function () {
	if (!localStorage.getItem("dados")) {
         localStorage.setItem("dados", JSON.stringify(data));
    } 

   /*  const dados = JSON.parse(localStorage.getItem("dados"));
    console.log(dados); */

    /* comentarios iniciais */
    const initComments = () => {
        const commentsWrapper = document.querySelector('.comments-wrp')
        commentsWrapper.textContent = ''
        const dados = JSON.parse(localStorage.getItem("dados"));
       
        /* acessa cada elemento do objeto data */
        dados.comments.forEach(element => {
            //clona template
            const template = document.querySelector('.comment-template')
            var commentNode = template.content.cloneNode(true);
            commentNode.querySelector('.usr-name').textContent = element.user.username;
            commentNode.querySelector('.usr-img').src = element.user.image.png
            commentNode.querySelector('.score-number').textContent = element.score
            commentNode.querySelector(".cmnt-at").textContent = element.createdAt;
            commentNode.querySelector(".c-body").textContent = element.content;
            commentNode.querySelector('.delete').addEventListener('click', () => modal(element))
            
             if (element.user.username == dados.currentUser.username) {
                commentNode.querySelector(".comment").classList.add("this-user");
            } 
            commentsWrapper.append(commentNode)
        })
        
    }

    const deleteComment = (comment) => {
        const dados = JSON.parse(localStorage.getItem("dados"));
        dados.comments = dados.comments.filter(commentData => commentData.content != comment.content)
            //console.log("comentarios", dados.comments)
        
        localStorage.setItem("dados", JSON.stringify(dados));
        
        initComments()
    }

    const modal = (comment = false) => {
        
        const modal = document.querySelector('.modal-wrp')

         if (comment) { 
            modal.addEventListener('click', (e) => {
               
                if (e.target.classList == 'yes') {

                    deleteComment(comment)
                    modal.classList.add('invisible')
                }
                if (e.target.classList == 'no') {
                    modal.classList.add('invisible')
                }
             }) 
            
            modal.classList.toggle('invisible')
           
        } 

    }
    
    const addComment = (e) => {
        const element = e.target.previousElementSibling;
        console.log(element.value)
         const initialData = {
            parent: 0,
            id: 1,
            content:
                "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            createdAt: "1 month ago",
            score: 12,
            user: {
                image: {
                    png: "assets/images/avatars/image-juliusomo.png",
                    webp: "assets/images/avatars/image-juliusomo.webp",
                  },
                  username: "juliusomo"
            }, 
           
        }
        if (element.value) {
            initialData.content = element.value
            const dados = JSON.parse(localStorage.getItem("dados"));
            dados.comments.push(initialData)
            localStorage.setItem("dados", JSON.stringify(dados))
            element.value = ''
            initComments()
        }    
    }

    const sendBtn = document.querySelector('.bu-primary')

    sendBtn.addEventListener('click', (e) => addComment(e))
    initComments()

});









