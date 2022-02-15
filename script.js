import FetchUsers from './UsersFetchFunction.js';
import API_KEY from './API_KEY.js';

/*Elements*/
const input = document.querySelector('.input');
const cardsContainer = document.querySelector('.cardsContainer');

/* Event listeners */
input.addEventListener('input', onInputChange);

/* Initial Load */
function initialLoad() {
  console.log(input.value);
  if (input.value.length > 0) {
    onInputChange(input.vlaue);
  }
}
window.addEventListener('pageshow', initialLoad);

/* Functions */
async function onInputChange(e) {
  if (input.value.length > 0) {
    const data = await FetchUsers(input.value, API_KEY);
    cardsContainer.innerHTML = '';
    /* Displaying fetched users card */
    data.items.map((item) => {
      cardsContainer.innerHTML += `<div class="card">
      <img
      class="cardImage"
      src=${item.avatar_url}
      alt="User Image"
      />
      <h3 class="cardHeading">${item.login}</h3>
        <a href=${`./profile.html?login=${item.login}`} class='cardLink'><button class="button cardButton">Visit Profile</button></a>
        </div>`;
    });
  } else {
    cardsContainer.innerHTML = '';
  }
}
