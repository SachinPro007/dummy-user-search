const getUserName = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const usersContainer = document.querySelector(".container");
let usersData;
// fecthing users data
async function myCustomFetcher(url, option) {
    usersContainer.insertAdjacentHTML("beforeend", loader());
    const res = await fetch(url, option);
    if (!res.ok) {
        throw new Error(`Network response was not ok - status: ${res.status}`);
    }
    let data = await res.json();
    usersData = data.users;
    return data.users;
}
// single user card UI
function userCard(user) {
    usersContainer.insertAdjacentHTML("beforeend", `<div class="profile-container">

          <div class="profile-wrapper">

            <div class="profile-card">
              <div class="fav-icon">
                <i class="far fa-heart"></i>
              </div>

              <!-- Profile-Picture -->
              <img src="${user.profile_picture}" alt="profile pics">

              <h2>${user.first_name} ${user.last_name}</h2>
              <h4>${user.job}</h4>

              <p>Lorem ipsum dolor sit amet conse adipisicing elit. Odit omnis odio tenetur eveniet soluta numquam
                deleniti sequi dolore nostrum sit.</p>

              <!-- Social Icons -->
              <div class="icons">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-behance"></i>
                <i class="fab fa-linkedin-in"></i>
              </div>

              <!-- Profile Button -->
              <a href="/">View Profile</a>

            </div>

          </div>

        </div>`);
}
// display user data in UI or Loop
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((usersInfo) => {
        usersContainer.innerHTML = "";
        usersInfo.slice(0, 20).map((user) => {
            userCard(user);
        });
    });
}
// default function call
fetchUserData("https://api.slingacademy.com/v1/sample-data/users?limit=100");
// let perform search fun
formSubmit.addEventListener("keyup", (e) => {
    e.preventDefault();
    let value = getUserName.value.toLowerCase();
    let filterUsers = usersData.filter((user) => {
        if (value) {
            usersContainer.innerHTML = "";
            return (user.first_name.toLowerCase().includes(value) ||
                user.last_name.toLowerCase().includes(value));
        }
        else {
            usersContainer.innerHTML = "";
            return usersData;
        }
    });
    if (filterUsers.length === 0) {
        usersContainer.insertAdjacentHTML("beforeend", `<p class="message">No matching users found</p>`);
    }
    filterUsers.slice(0, 20).map((user) => {
        userCard(user);
    });
});
// loader Ui
function loader() {
    return (`<div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>`);
}
export {};
