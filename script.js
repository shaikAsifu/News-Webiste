const api_key = "c64dcee754664a18a460b61e863d6bb2";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("World"));
function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${api_key}`);
        const data = await res.json();
        console.log(data);
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardscontainer = document.getElementById('cards-container');
    const newscardTemplate = document.getElementById('template-news-card');

    cardscontainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardclone = newscardTemplate.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        cardscontainer.appendChild(cardclone);
    });
}

function fillDataInCard(cardclone, article) {
    const newsimg = cardclone.querySelector('#news-images');
    const newstitle = cardclone.querySelector('#news-title');
    const newssource = cardclone.querySelector('#news-source'); // Fixed the typo here
    const newsdesc = cardclone.querySelector('#news-desc');

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    newssource.innerHTML = `${article.source.name} . ${date}`;
    cardclone.firstElementChild.addEventListener('click', ()=> window.open(article.url,"_blank"));

}
let curselect=null;
function OnNavitem(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curselect?.classList.remove('active');
    curselect = navItem;
    curselect.classList.add('active')
}
const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');
searchbutton.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query)
    curselect?.classList.remove('active');
})
