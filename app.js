const body = document.querySelector('body');


// navbar functionallity
const searchBtn = document.querySelector('.search-icon');
const searchContainer = document.querySelector('.search-container');
const closeBtn = document.querySelector('.close-btn');

searchBtn.addEventListener('click', () => {
    searchContainer.classList.add('active');
})

closeBtn.addEventListener('click', () => {
    searchContainer.classList.remove('active');
})

// API
const moviesSect = document.querySelector('.movies-sect');
let apiKey;

function createMovie(req) {
    const allMovies = req.data.results;
    for (let movie of allMovies) {
        const data = { ...movie };
        
        // creates movie card
        const movieCard = document.createElement('article');
        movieCard.classList.add('movie-card', 'p-0', 'm-3');
        moviesSect.append(movieCard);

        const poster = document.createElement('div');
        poster.classList.add('movie-poster');

        if (data.poster_path !== null) {
            poster.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="" class="img-fluid">`;
        } else {
            poster.innerHTML = '<img src="https://www.childlinethailand.org/wp-content/uploads/2021/04/N-A.jpeg" alt="" class="img-fluid">';
        }
        movieCard.append(poster);

        const caption = document.createElement('div');
        caption.classList.add('movie-caption', 'p-2', 'd-flex', 'justify-content-between', 'align-items-center');
        const text = document.createElement('b');
        text.classList.add('title', 'd-flex', 'align-items-center');
        caption.append(text);

        const rating = document.createElement('b');
        rating.classList.add('rating', 'ms-2');

        if (data.vote_average > 0) {
            rating.innerText = data.vote_average;
        } else {
            rating.innerText = 'N/A';
        }

        caption.append(rating);

        const infoBtn = document.createElement('button');
        infoBtn.classList.add('me-2', 'info-btn');
        infoBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>';
        infoBtn.addEventListener('click', () => {
            const allOVS = document.querySelectorAll('.overview');
            for (let ov of allOVS) {
                ov.classList.remove('show-overview');
            }
            overview.classList.add('show-overview');
        })
        text.append(infoBtn);
        text.append(data.title);
        movieCard.append(caption);

        const overview = document.createElement('div');
        overview.classList.add('overview', 'px-3', 'py-4', 'text-center');
        const container = document.createElement('div');
        container.classList.add('d-flex', 'justify-content-end');
        const ovClose = document.createElement('button');
        ovClose.classList.add('overview-close');
        ovClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg>';
        const ovTitle = document.createElement('h3');
        ovTitle.innerText = 'Overview';
        const ovText = document.createElement('p');

        container.append(ovClose);
        overview.append(container);
        overview.append(ovTitle);
        overview.append(ovText);
        movieCard.append(overview)

        const overviewText = data.overview.split(' ');

        if (overviewText.length > 45) {
            let newText = overviewText.slice(0, 45);
            newText = newText.join(' ');
            ovText.innerText = newText;
            const moreLink = document.createElement('button');
            moreLink.classList.add('moreLink');
            moreLink.append('more...');
            ovText.append(moreLink);

            // overview pop up
            const moreContainer = document.createElement('div');
            moreContainer.classList.add('more-container', 'px-3', 'py-4');


            // close functionallity
            const closeContainer = document.createElement('div');
            closeContainer.classList.add('d-flex', 'justify-content-end', 'mb-4');
            const moreClose = document.createElement('button');
            moreClose.classList.add('more-close');
            moreClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"          class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg>'
            closeContainer.append(moreClose);
            moreContainer.append(closeContainer);


            // movie title creation
            const overviewTitle = document.createElement('h2');
            overviewTitle.classList.add('text-center');
            overviewTitle.innerText = data.title;
            moreContainer.append(overviewTitle);

            // overview header created
            const overviewHead = document.createElement('h5');
            overviewHead.classList.add('text-center');
            overviewHead.innerText = 'Overview';
            moreContainer.append(overviewHead);

            // overview text
            const description = document.createElement('p');
            description.classList.add('text-center');
            description.innerText = data.overview;
            moreContainer.append(description);
            movieCard.append(moreContainer);

            // btn for pop up
            moreLink.addEventListener('click', () => {
                const allOVS = document.querySelectorAll('.overview');
                for (let ov of allOVS) {
                    ov.classList.remove('show-overview');
                }
                moreContainer.classList.add('show');
                body.classList.add('fixed');
            })


            // close btn for pop up
            moreClose.addEventListener('click', () => {
                moreContainer.classList.remove('show');
                body.classList.remove('fixed');
            })

        } else {
            ovText.innerText = data.overview;
        }

        ovClose.addEventListener('click', () => {
            overview.classList.remove('show-overview');
        })
    }
}

const reset = () => {
    const allMovies = document.querySelectorAll('.movie-card');
    for (let movie of allMovies) {
        movie.remove();
    }

    const errMsgs = document.querySelectorAll('.err-msg');
    for (let err of errMsgs) {
        err.remove();
    }
}
 
const displayErr = () => {
    const errMsg = document.createElement('p');
    errMsg.classList.add('text-center', 'text-white', 'display-5', 'err-msg');
    errMsg.innerText = "Sorry! Movies are unavalaible at this time!";
    body.append(errMsg);
}

const getTrending = async () => {

    reset();

    try {
        const req = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        if ((req.data.results).length === 0) {
            throw "movies unavailable at this time";
        } else {
            createMovie(req);
        }
    } catch (e) {
        console.log(e);
        displayErr();
    }
}

getTrending();

const logo = document.querySelector('.brand-name');
logo.addEventListener('click', () => {
    getTrending();
})

// form functionallity
const searchForm = document.querySelector('.search-form');
const searchInp = document.querySelector('.search-inp');
const search = searchInp.value;

const getResults = async (searchVal) => {
    try {
        const req = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchVal}&page=1&include_adult=false`);
        if ((req.data.results).length === 0) {
            throw "movies unavailable at this time";
        } else {
            return req;
        }
    } catch (e) {
        console.log(e);
    }
}

searchForm.addEventListener('submit', async e => {
    e.preventDefault();

    reset();

    try {
        const search = searchInp.value;
        const searchResults = await getResults(search);
        createMovie(searchResults);
    } catch (e) {
        console.log(e);
        displayErr();
    }

    searchInp.value = '';
    searchContainer.classList.remove('active');
    

})

// genre functionallity

const action = document.querySelector('#action');
const comedy = document.querySelector('#comedy');
const drama = document.querySelector('#drama');
const horror = document.querySelector('#horror');
const sciFi = document.querySelector('#sci-fi');
const romance = document.querySelector('#romance');
const documentary = document.querySelector('#documentary');
const family = document.querySelector('#family');


const genres = [
    {
        genre: action, 
        id: 28
    }, 
    {
        genre: comedy, 
        id: 35
    }, 
    {
        genre: drama, 
        id: 18
    }, 
    {
        genre: horror, 
        id: 27
    }, 
    {
        genre: sciFi,
        id: 878
    }, 
    {
        genre: romance, 
        id: 10749
    }, 
    {
        genre: documentary, 
        id: 99
    }, 
    {
        genre: family, 
        id: 10751
    }
];

const getMovieGenre = async (id) => {

    try {
        const req = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}`);
        if ((req.data.results).length === 0) {
            throw "movies unavailable at this time"
        } else {
            return req;
        }
    } catch (e) {
        console.log(e);
    }
}

for (let g of genres) {
    (g.genre).addEventListener('click', async () => {
       
        reset();

        try {
            const results = await getMovieGenre(g.id);
            createMovie(results);
        } catch (e) {
            console.log(e);
            displayErr();
        }
    })
}