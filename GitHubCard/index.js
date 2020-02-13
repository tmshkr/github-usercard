import config from "./config.js";
/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
// axios.get("https://api.github.com/users/tmshkr").then(({ data }) => {
//   const card = createCard(data);
//   console.log(data);
//   cards.appendChild(card);
// });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const cards = document.querySelector(".cards");

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const usernames = [
  // "bigknell",
  // "dustinmyers",
  // "jackskim",
  // "justsml",
  // "luishrd",
  // "tetondan",
  "tmshkr"
];

usernames.forEach(username => {
  axios
    .get(`https://api.github.com/users/${username}`, config)
    .then(({ data }) => {
      const card = createCard(data);
      cards.appendChild(card);
    });
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
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

  card.className = "card";
  info.className = "card-info";
  name.className = "name";
  username.className = "username";

  img.src = props.avatar_url;
  name.innerText = props.name;
  username.innerText = props.login;
  props.location && (location.innerText = `Location: ${props.location}`);
  profileLink.innerHTML = `Profile: <a href="${props.html_url}">${props.html_url}</a>`;
  followers.innerHTML = `Followers: <a href="https://api.github.com/users/${props.login}/followers">${props.followers}</a>`;
  following.innerHTML = `Following: <a href="https://api.github.com/users/${props.login}/following">${props.following}</a>`;
  props.bio && (bio.innerText = `Bio: ${props.bio}`);

  followers.children[0].onclick = function(e) {
    e.preventDefault();
    getUsers(e.target.href).then();
  };
  following.children[0].onclick = function(e) {
    e.preventDefault();
    getUsers(e.target.href);
  };

  return card;
}

function getUsers(url) {
  return axios.get(url).then(({ data }) => console.log(data));
}

function renderCards() {
  const clone = cards.cloneNode(false);
  cards.parentNode.replaceChild(clone, cards);
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
