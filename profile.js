import { FetchUser, FetchUserRepo } from './UserFetchFunction.js';
import API_KEY from './API_KEY.js';

/* Elements */
const profileInfo = document.querySelector('.profileInfo');
const profileStatus = document.querySelector('.profileStatus');
const reposContainer = document.querySelector('.reposContainer');

/* get Parameter */
const parameter = new URLSearchParams(window.location.search);

const userName = parameter.get('login');

window.addEventListener('pageshow', getUserInfo);

/* Fetch user information*/
async function getUserInfo() {
  const infoResponse = await FetchUser(userName, API_KEY);
  console.log(infoResponse);

  const repoResponse = await FetchUserRepo(userName, API_KEY);
  console.log(repoResponse);

  /* displaying Profile Info */
  profileInfo.innerHTML = `<div class="imageDiv" id="imageDiv" >
  <div class="imageTop"  >

      <h3 class="name">${infoResponse.name}</h3>
      <p class="login">${infoResponse.login}</p>
  </div>
</div>


<div class="infoDiv">
  <div class="profileHeading">
      <h2>${infoResponse.name}</h2>
      <div class="headingtag ht1">${infoResponse.type}</div>
      <div class="headingtag ht2" style=${
        infoResponse.hireable ?? 'display:none'
      }>${infoResponse.hireable && 'Hireable'}</div>
  </div>

  <p class="discreption">${infoResponse.bio ? infoResponse.bio : ''}</p>

  <a href='${
    infoResponse.html_url
  }'><button class="profileButton">VISIT GITHUB PROFILE</button></a>

  <div class="links">
      <div class="location link">
          <p class="linkTopic">Location</p>
          <h4>${infoResponse.location ? infoResponse.location : '-'}</h4>
      </div>
      <div class="website link"><p class="linkTopic">Website</p>
          <h4><a class="webA" href="${infoResponse.blog}">${
    infoResponse.blog ? infoResponse.blog : '-'
  }</h4></a></div>
      <div class="twitter link"><p class="linkTopic">Twitter</p>
          <h4>${
            infoResponse.twitter_username ? infoResponse.twitter_username : '-'
          }</h4></div>
      
  </div>
</div>`;
  const imageDiv = document.querySelector('#imageDiv');
  imageDiv.style.background = `url(${infoResponse.avatar_url})`;
  imageDiv.style.backgroundSize = 'cover';

  /* displaying Status */
  profileStatus.innerHTML = `<div class="status staus1">
  <div class="stat">
      <div class="linkTopic">Followers</div>
      <h1>${infoResponse.followers}</h1>
  </div>
  <img class="icon" src="./svg/users-solid.svg" alt="Users">
</div>
<div class="status status2">
  <div class="stat">
      <div class="linkTopic">Following</div>
      <h1>${infoResponse.following}</h1>
  </div>
  <img class="icon" src="./svg/user-group-solid.svg" alt="User">
</div>
<div class="status status3">
  <div class="stat">
      <div class="linkTopic">Public Repos</div>
      <h1>${infoResponse.public_repos}</h1>
  </div>
  <img class="icon" src="./svg/codepen-brands.svg" alt="Codepen">
</div>
<div class="status status4">
  <div class="stat">
      <div class="linkTopic">Public Gists</div>
      <h1>${infoResponse.public_gists}</h1>
  </div>
  <img class="icon" src="./svg/store-solid.svg" alt="Store">
</div>`;

  /* Displying repos */
  repoResponse.map((repo) => {
    reposContainer.innerHTML += `<div class="repoContainer">
        <a href="${repo.html_url}"><h5><img class="linkIcon" src="./svg/link-solid.svg" alt="Link">${repo.name}</h5></a>

        <div class="tags">
            <div class="headingtag rt1"><img class="tagIcon" src="./svg/eye-solid.svg" alt="Eye">${repo.watchers_count}</div>
            <div class="headingtag rt2"><img class="tagIcon" src="./svg/star-solid.svg" alt="Star">${repo.stargazers_count}</div>
            <div class="headingtag rt3"><img class="tagIcon infoIcon" src="./svg/info-solid.svg" alt="Info">${repo.open_issues}</div>
            <div class="headingtag rt4"><img class="tagIcon" src="./svg/utensils-solid.svg" alt="Utensils">${repo.forks}</div>
          </div>`;
  });
}
