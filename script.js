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
        span.classList.add("border", "p-2","text-info")
        pageOutput.appendChild(span);
        pageOutput.classList.add("my-4")
        console.log(i)
    }
    pages.appendChild(pageOutput)
    

    // pagination.innerHTML=""
    for(let i=startPost; i<endPost; i++){
        // console.log(posts.results[i]) 
        let display= document.createElement('div')
        display.innerHTML=`<img src=${posts.results[i].picture.medium} height="150" /><p> ${posts.results[i].name.first}</p>`;
        display.classList.add("disp")
        pagination.appendChild(display)   
    }
    console.log(posts.results[0].picture.medium)
}