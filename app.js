//UI
const userlist = document.querySelector(".userlist");
const usersHead = document.createElement("h4");
usersHead.textContent = "USERS";
userlist.appendChild(usersHead);

const form = document.forms["addUser"];
const inputName = form.elements["name"];
const inputEmail = form.elements["userEmail"];
const inputUserName = form.elements["userName"];
const inputPhone = form.elements["phone"];
const inputWebsite = form.elements["website"];
const addBtn = document.querySelector("button");

//Functions
function getUsers(method, url, cb) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  xhr.addEventListener("load", () => {
    const resBody = JSON.parse(xhr.responseText);
    cb(resBody);
  });

  xhr.send();
}

getUsers("GET", "https://jsonplaceholder.typicode.com/users", res => {
  console.log(res);
  renderUsers(res);
});

function renderUsers(users) {
  const ol = document.createElement("ol");
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.setAttribute("data-toggle", "collapse");
    li.setAttribute("data-target", `#user_${user.id}`);
    li.setAttribute("aria-expanded", "true");

    const collapse = document.createElement("div");
    collapse.classList.add("collapse");
    collapse.setAttribute("id", `user_${user.id}`);

    const collapseCard = document.createElement("div");
    collapseCard.classList.add("card", "card-body", "p-1");

    const userListTitle = document.createElement("h6");
    userListTitle.classList.add("card-title", "mb-1");
    userListTitle.textContent = "User info";

    const infoUserName = document.createElement("p");
    infoUserName.classList.add("card-subtitle", "text-muted", "user-name");
    infoUserName.textContent = `Username: ${user.username}`;
    const infoEmail = document.createElement("p");
    infoEmail.classList.add("card-subtitle", "text-muted", "user-email");
    infoEmail.textContent = `Email: ${user.email}`;
    const infoPhone = document.createElement("p");
    infoPhone.classList.add("card-subtitle", "text-muted", "user-phone");
    infoPhone.textContent = `Phone: ${user.phone}`;
    const infoWebsite = document.createElement("p");
    infoWebsite.classList.add("card-subtitle", "text-muted", "user-website");
    infoWebsite.textContent = `Website: ${user.website}`;

    collapseCard.appendChild(userListTitle);
    collapseCard.appendChild(infoUserName);
    collapseCard.appendChild(infoEmail);
    collapseCard.appendChild(infoPhone);
    collapseCard.appendChild(infoWebsite);

    collapse.appendChild(collapseCard);

    ol.appendChild(li);
    ol.appendChild(collapse);
  });

  userlist.appendChild(ol);
}

{
  /* 
<li data-toggle="collapse" data-target="#hide" aria-expanded="true">Fukin`Collapse</li>

<div class="user-info collapse" id="hide">
  <div class="card card-body">
    <h6 class="card-title mb-1">User info</h4>
      <p class="card-subtitle text-muted user-name">Username</p>
      <p class="card-subtitle text-muted user-email">Email</p>
      <p class="card-subtitle text-muted user-phone">Phone</p>
      <p class="card-subtitle text-muted user-website">Website</p>
  </div>
</div>
*/
}

// function addUser()

function postUser(method, url, body, cb) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("load", () => {
    const resBody = JSON.parse(xhr.responseText);
    cb(resBody);
  });
  xhr.send(JSON.stringify(body));
}
