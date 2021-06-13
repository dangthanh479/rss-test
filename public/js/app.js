
const url = 'https://vnexpress.net/rss/suc-khoe.rss';

const getData = function() {
    feednami.load(url, function (result) {
        if (result.error) {
            console.log(result.error)
        }
        else {
            let news = result.feed.entries.sort((a, b) => {
                return new Date(b.pubDate) - new Date(a.pubDate);
            }).slice(0, 20)
            render(news)
        }
    })
}
getData();



function render(array) {
    for (let news of array) {

        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const inner = document.createElement('div')
        const time = document.createElement('p')
        const a = document.createElement('a')

        div.classList.add('item', 'col-md-6', 'col-12')

        h3.innerHTML = news.title
        inner.innerHTML = news.description
        time.innerHTML = new Date(news.pubDate)
        a.innerText = 'More'
        a.href = news.link

        div.appendChild(h3)
        div.appendChild(time)
        div.appendChild(inner)
        div.appendChild(a)
        document.querySelector('.articles').append(div)

        document.querySelectorAll('a').forEach(link => {
            link.setAttribute('target', '_blank')
        })
    }
}

document.querySelector('#formFilter').addEventListener('submit' , (e) => {
    e.preventDefault();
    const startDay = document.querySelector('#startDay').value
    const endDay = document.querySelector('#endDay').value

    if(startDay == '' && endDay == '') {
        alert('Enter Start date & End date')
    }
    else {
        feednami.load(url, function (result) {
            if (result.error) {
              console.log(result.error)
            }
            else {
                const newsFilter = result.feed.entries.filter((news) => {
                    return new Date(news.pubDate).getTime() > new Date(startDay).getTime() && new Date(news.pubDate).getTime() < new Date(endDay).getTime();
                })
                const articles = newsFilter.sort((a,b) => {
                    return new Date(b.pubDate) - new Date(a.pubDate);
                }).slice(0,20)
                document.querySelector('.articles').innerHTML = ''
                render(articles)
            }
          })
    }
})



// setInterval(function updateData(){
//     document.querySelector('.articles').innerHTML = '';
//     getData();
// },5000);