const pagination = document.getElementById('pagination');
const pages = document.getElementById('pages');
const url = 'https://randomuser.me/api/?results=100';
const posts={
    postPerPage:10,
    currentPage:1,
    results:null
}

window.addEventListener('load', () => {
    init()
})
const capStart=str=>str.charAt(0).toUpperCase();

const init = () => {
    console.log('ready');
    // fetch data from api
    fetch(url)
        .then((res) => res.json())
        .then(data => 
        {posts.results=data.results;
        console.log(data.results)
        loadPage(1)
        // catch is ability to catch the errors, in case of api is down
    }).catch(error=>console.log(error))
}

const loadPage=page=>{
    posts.currentPage=page
    let startPost=(posts.currentPage-1)*posts.postPerPage;
    let totalPages=Math.ceil(posts.results.length/ posts.postPerPage);
    // 60>56? 56: 50+10
    let endPost= startPost+posts.postPerPage>posts.results.length? posts.results.length :startPost+ posts.postPerPage;
    console.log(startPost)
    console.log(totalPages)
    posts.currentPage=page;
    pagination.innerHTML=`
        <h1>Page${posts.currentPage}</h1>
    `;
    pages.innerHTML=''
    // pages
    let pageOutput=document.createElement('div');
    for(let i=0; i<totalPages; i++){
        let span= document.createElement('span')
        span.textContent=i+1
        span.addEventListener('click', ()=>{ 
            loadPage(i+1);
        })
        span.classList.add("border", "p-2","text-info", "active")
        pageOutput.appendChild(span);
        pageOutput.classList.add("my-4")
        // console.log(i)
    }
    pages.appendChild(pageOutput)
    

    let userDetails= document.createElement('div')
    userDetails.classList.add("row", "justify-content-center")
    for(let i=startPost; i<endPost; i++){
        // console.log(posts.results[i]) 
        let display= document.createElement('div')
        display.innerHTML=`
            <img src=${posts.results[i].picture.medium} height="150" width="150" />
            <p class="font-weight-bold bg-light my-2">${posts.results[i].name.title}. ${posts.results[i].name.first} ${posts.results[i].name.last}</p>
            `;
        let details= document.createElement('div');

        details.innerHTML=`
            <p>
               Email: <b>${posts.results[i].email}</b>
            </p>
            <p>
                Cell: <b>${posts.results[i].cell}</b>
            </p>
            <p>
             City: <b>${posts.results[i].location.city}</b>
            </p>
        `
        details.classList.add("d-flex", "flex-column")
        display.classList.add("disp", "col-sm-12", "col-md-5", "col-xl-4")
        display.appendChild(details)
        userDetails.appendChild(display)
        pagination.appendChild(userDetails)   
    }
    console.log(posts.results[0].picture.medium)
}