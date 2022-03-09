/*
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:

Nel file js avete un array di oggetti che rappresentano ciascun post.
Ogni post contiene le informazioni necessarie per stampare la relativa card:
id del post (numero progressivo da 1 a n),
nome autore,
foto autore,
data in formato americano (mm-gg-yyyy),
testo del post,
immagine (non tutti i post devono avere una immagine),
numero di likes.

Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

BONUS

1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/



/*
Logica del programma principale:

PER OGNI post nell'array dei post

	creare l'elemento DOM del post (elemento inizialmente vuoto)

	popolare l'elemento appena creato con i valori specifici al post

		SE il post ha l'immagine profilo
			ALLORA mettere l'immagine profilo
			ALTRIMENTI mettere le iniziali del nome

		SE il post è nell'array dei likes
			ALLORA dare la classe opportuna al bottone Like

		dare l'eventListener al bottone Like affinchè reagisca al click

		appendere l'elemento al container nel DOM


*********************************************************************************************

Logica del bottone Like:

Determino l'id del post sul quale si è cliccato il bottone Like

Usando l'id seleziono l'oggetto dall'array dei post

SE il post ha il like (facendo il controllo sulla classe del bottone Like)
	ALLORA tolgo la classe dal bottone e aggiorno l'oggetto nell'array dei post
	ALTRIMENTI aggiungo la classe al bottone e decremento i like nell'oggetto dall'array dei post
*/


const arrLikedIds = [1, 3]; // array che contiene gli id dei post a cui l'utente ha fatto like

const arrPosts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola Giovanni",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const eleContainer = document.getElementById('container'); // selezione del container nel quale aggiungere i post

// inseriamo i post nel container DOM
for (let index in arrPosts) {
	renderPost(arrPosts[index]);
}



/* FUNCTION DEFINITIONS */

function renderPost(objPost) {
	const elePost = document.createElement('div');
	elePost.classList.add('post');
	elePost.dataset.postid = objPost.id;

	elePost.innerHTML = `
		<div class="post__header">
			<div class="post-meta">
				<div class="post-meta__icon">
					${getProfilePicHtml(objPost)}
				</div>
				<div class="post-meta__data">
					<div class="post-meta__author">${objPost.author.name}</div>
					<div class="post-meta__time">${dateFromIsoToItalian(objPost.created)}</div>
				</div>
			</div>
		</div>
		<div class="post__text">${objPost.content}</div>
		<div class="post__image">
			<img src="${objPost.media}" alt="">
		</div>
		<div class="post__footer">
			<div class="likes js-likes">
				<div class="likes__cta">
					<a class="like-button js-like-button ${arrLikedIds.includes(objPost.id) ? 'like-button--liked': ''}" href="#">
						<i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
						<span class="like-button__label">Mi Piace</span>
					</a>
				</div>
				<div class="likes__counter">
					Piace a <b class="js-likes-counter">${objPost.likes}</b> persone
				</div>
			</div>
		</div>
	`;

	elePost.querySelector('.js-like-button').addEventListener('click', toggleLike);

	eleContainer.append(elePost);
}



function toggleLike(event) {
	event.preventDefault(); // blocco del comportamento di default dei link
	const btnLike = this; // giusto per dare al this un nome un più significativo
	const elePost = btnLike.closest('.post'); // ricerca del container più vicino con classe .post (perchè è a questi elementi che abbiamo dato il data-postid)
	const postId = parseInt(elePost.dataset.postid);
	const eleCounter = elePost.querySelector('.js-likes-counter');

	// ricerca del post nell'array usando l'id
	let indexLikedPost = 0;
	while (postId != arrPosts[indexLikedPost].id) {
		indexLikedPost++;
	}
	const objPost = arrPosts[indexLikedPost];

	// determinazione se il click è di aggiunta like o di rimozione like
	if (btnLike.classList.contains('like-button--liked')) {
		removeLike(btnLike, objPost);
	} else {
		addLike(btnLike, objPost);
	}

	// aggiornamento del contatore dei like nel DOM
	eleCounter.innerHTML = objPost.likes;
}



function removeLike(btnLikeArgument, objPostArgument) {
	btnLikeArgument.classList.remove('like-button--liked');

	objPostArgument.likes--;
	const index = arrLikedIds.indexOf(objPostArgument.id);
	arrLikedIds.splice(index, 1);

	console.log(arrLikedIds)
	console.table(arrPosts)
}



function addLike(btnLikeArgument, objPostArgument) {
	btnLikeArgument.classList.add('like-button--liked');

	objPostArgument.likes++;
	arrLikedIds.push(objPostArgument.id);

	console.log(arrLikedIds)
	console.table(arrPosts)
}



function getProfilePicHtml(objPost) {
	if (objPost.author.image == null) {
		let arrNameParts = objPost.author.name.split(' ');
		let initials = '';
		for (let index in arrNameParts) {
			initials += arrNameParts[index][0].toUpperCase();
		}
		return `<div class="profile-pic-default"><span>${initials}</span></div>`;
	} else {
		return `<img class="profile-pic" src="${objPost.author.image}" alt="${objPost.author.name}"></img>`;
	}
}



function dateFromIsoToItalian(originalDate) {
	return originalDate.split('-').reverse().join('/')
}
