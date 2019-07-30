//UI
const userContainer = document.querySelector(".userlist");
const usersHead = document.createElement("h4");
usersHead.textContent = "USERS";
userContainer.appendChild(usersHead);

const form = document.forms["addUser"];
const inputName = form.elements["name"];
const inputEmail = form.elements["userEmail"];
const inputUserName = form.elements["userName"];
const inputPhone = form.elements["phone"];
const inputWebsite = form.elements["website"];
const addBtn = document.querySelector("button");

const userList = document.createElement("ol");
userList.classList.add("list-group");

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
  renderUsers(res);
});

userContainer.addEventListener("click", e => {
  const { target } = e;
  target.classList.toggle("active");
});

function renderUsers(users) {
  users.forEach(user => {
    let li = listUserTemplate(user);
  });

  return userList;
}

function listUserTemplate(user) {
  let li = document.createElement("li");
  li.textContent = user.name;
  li.setAttribute("data-toggle", "collapse");
  li.setAttribute("data-target", `#user_${user.id}`);
  li.setAttribute("aria-expanded", "true");
  li.classList.add("list-group-item", "list-group-item-action");

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

  userList.appendChild(li);
  userList.appendChild(collapse);

  userContainer.appendChild(userList);
}

form.addEventListener("submit", onSubmitHandler);

function onSubmitHandler(e) {
  e.preventDefault();
  const nameValue = inputName.value;
  const emailValue = inputEmail.value;
  const userNameValue = inputUserName.value;
  const phoneValue = inputPhone.value;
  const websiteValue = inputWebsite.value;

  if (
    !nameValue ||
    !emailValue ||
    !userNameValue ||
    !phoneValue ||
    !websiteValue
  ) {
    alert(`Enter all user data`);
    return;
  }

  let newUser = {
    name: `${nameValue}`,
    email: `${nameValue}`,
    username: `${userNameValue}`,
    phone: `${phoneValue}`,
    website: `${websiteValue}`
  };

  postUser(
    "POST",
    "https://jsonplaceholder.typicode.com/users",
    newUser,
    res => {
      listUserTemplate(res);
    }
  );
  form.reset();
}

function postUser(method, url, newUser, cb) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("load", () => {
    const resBody = JSON.parse(xhr.responseText);
    cb(resBody);
  });
  xhr.send(JSON.stringify(newUser));
}
