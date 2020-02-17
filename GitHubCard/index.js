let cards = document.querySelector(".cards");
const viewing = document.getElementById("viewing");
const nav = document.querySelector("nav");
document.querySelector("button.back").onclick = reset;
const usernames = [
  "bigknell",
  "dustinmyers",
  "jackskim",
  "justsml",
  "luishrd",
  "tetondan",
  "tmshkr"
];

function reset() {
  nav.style.visibility = null;
  clearCards();
  usernames.forEach(username => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(({ data }) => {
        const card = createCard(data);
        cards.appendChild(card);
      })
      .catch(err => {
        console.log(err.response.data.message);
        cards.innerHTML = `<label>${err.response.data.message}</label>`;
      });
  });
}

function createCard(props) {
  const ce = document.createElement.bind(document);

  const card = ce("div");
  const img = card.appendChild(ce("img"));
  const info = card.appendChild(ce("div"));
  const name = info.appendChild(ce("h3"));
  const username = info.appendChild(ce("p"));
  const location = info.appendChild(ce("p"));
  const profileLink = info.appendChild(ce("p"));
  const followers = info.appendChild(ce("p"));
  const following = info.appendChild(ce("p"));
  const bio = info.appendChild(ce("p"));
  const graph = card.appendChild(ce("div"));
  const showGraph = graph.appendChild(ce("button"));

  card.className = `card`;
  info.className = "card-info";
  name.className = "name";
  username.className = "username";
  graph.className = `calendar ${props.login}`;
  showGraph.innerText = "Show Graph";

  img.src = props.avatar_url;
  props.name && (name.innerText = props.name);
  username.innerText = props.login;
  props.location && (location.innerText = `Location: ${props.location}`);
  profileLink.innerHTML = `Profile: <a href="${props.html_url}">${props.html_url}</a>`;
  props.bio && (bio.innerText = `Bio: ${props.bio}`);

  showGraph.onclick = function() {
    new GitHubCalendar(`.${props.login}.calendar`, props.login, {
      responsive: true
    });
  };

  if (props.followers) {
    followers.innerHTML = `Followers: <a href="https://api.github.com/users/${props.login}/followers">${props.followers}</a>`;
    followers.children[0].onclick = function(e) {
      e.preventDefault();
      getUsers(e.target.href)
        .then(followers => {
          nav.style.visibility = "visible";
          viewing.innerText = `${props.login}: followers`;
          clearCards();
          followers.forEach(f => {
            cards.appendChild(createCard(f));
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
          cards.innerHTML = `<label>${err.response.data.message}</label>`;
        });
    };
  }

  if (props.following) {
    following.innerHTML = `Following: <a href="https://api.github.com/users/${props.login}/following">${props.following}</a>`;
    following.children[0].onclick = function(e) {
      e.preventDefault();
      getUsers(e.target.href)
        .then(following => {
          nav.style.visibility = "visible";
          viewing.innerText = `${props.login}: following`;
          clearCards();
          following.forEach(f => {
            cards.appendChild(createCard(f));
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
          cards.innerHTML = `<label>${err.response.data.message}</label>`;
        });
    };
  }

  return card;
}

function getUsers(url) {
  return axios.get(url).then(({ data }) => data);
}

function clearCards() {
  document.body.scrollTop = 0;
  const clone = cards.cloneNode(false);
  cards.parentNode.replaceChild(clone, cards);
  cards = clone;
}

reset();
