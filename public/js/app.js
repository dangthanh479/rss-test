console.log('abc')

const FEED_URL = `https://vnexpress.net/rss/suc-khoe.rss`;

fetch(FEED_URL, )
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data);
    const items = data.querySelectorAll("item");
    let html = ``;
    html += `<h2>${data.querySelector("title").innerHTML}</h2>`;
    html += `<p>${data.querySelector("description").innerHTML}</p>`;
    html += `<div class="feeds">`;
    items.forEach(el => {
        html += `
        <article>
          <h3>
            <a href="${el.querySelector("link").innerHTML}" target="_blank">
              ${el.querySelector("title").innerHTML}
            </a>
          </h3>
        </article>
      `;
    });
    document.getElementById('content').insertAdjacentHTML("beforeend", html);
  });

