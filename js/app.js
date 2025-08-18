window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js')
      console.log('Service worker register success', reg)
    } catch (e) {
      console.log('Service worker register fail')
    }
  }

  await loadPosts()
})


async function loadPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11')
  const data = await res.json()

  const container = document.querySelector('#posts')
  container.innerHTML = data.map(toCard).join('\n')
}

function toCard(post) {
  return `
    <div class="card">
      <div class="card-title">
        ${post.title}
      </div>
      <div class="card-body">
        ${post.body}
      </div>
    </div>
  `
}

let installButton = document.getElementById('install');
let closeButton = document.getElementById('close')
let modal = document.getElementById("modal");


closeButton.addEventListener('click', () => {
  modal.style.display = "none";
})


let installEvent = null;
window.addEventListener('beforeinstallprompt', function (e) {

  alert("load")
  modal.style.display = "block";
  e.preventDefault();
  installEvent = e;
});

let installed = false;
installButton.addEventListener('click', async function () {
  modal.style.display = "none";
  installEvent.prompt();
  let result = await that.prompt.userChoice;
  if (result && result.outcome === 'accepted') {
    installed = true;
  }
})
