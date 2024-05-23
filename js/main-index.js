// Token
let token = "";

// UserData
let userData = "";

// Endpoint
const url = "https://tarmeezacademy.com/api/v1";

// Log In Data
let loginUsernameInput = document.querySelector(".loginUsernameInput");
let loginPasswordInput = document.querySelector(".loginPasswordInput");

// Log In BTN
let btnToSendDataToLogIn = document.querySelector(".loginImBtn");

// Sign Up Data
let signUpUsernameInput = document.querySelector(".regesUserName");
let signUpPasswordInput = document.querySelector(".regesPassword");
let signUpNameInput = document.querySelector(".regesName");
let signUpEmailInput = document.querySelector(".regesEmail");

// Sign Up BTN
let btnToSendDataToSignUp = document.querySelector(".signUpImBtn");

// The Container Of Posts
let theContainerOfPosts = document.querySelector("#theContainerOfPosts");

ifTokenInLocal();

function ifTokenInLocal() {
  if (localStorage.token) {
    token = localStorage.token;
    userData = JSON.parse(localStorage.userData);
    // dNoneHomeAndDBlockPosts();
    // window.open("../html/posts.html", "_self");
    window.location.href = "../html/posts.html";
  }
  return;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("signUpImBtn")) {
    signUp();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("loginImBtn")) {
    logIn();
  }
});

function signUp() {
  let formData = new FormData();
  formData.append("username", `${signUpUsernameInput.value}`);
  formData.append("password", `${signUpPasswordInput.value}`);
  formData.append("image", document.getElementById("prfImg").files[0]);
  formData.append("name", `${signUpNameInput.value}`);
  formData.append("email", `${signUpEmailInput.value}`);
  axios
    .post(`${url}/register`, formData)
    .then((response) => {
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      token = response.data.token;
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      userData = response.data.user;

      // Clear inputs
      signUpUsernameInput.value = "";
      signUpPasswordInput.value = "";
      signUpNameInput.value = "";
      signUpEmailInput.value = "";
      ifTokenInLocal();
    })
    .catch((error) => {
      document.body.style.position = "relative";
      let aleee = document.createElement("div");
      aleee.innerHTML = `<div class="alert alert-danger theAlert position-absolute  end-0" role="alert" style="z-index:9999; top:90vh">
         ${error.response.data.message}
        </div>`;

      document.body.appendChild(aleee);
      setTimeout(function () {
        document.querySelector(".theAlert").style.display = "none";
      }, 2000);
      console.log(error.response.data.message);
    });
  return;
}

function logIn() {
  let params = {
    username: `${loginUsernameInput.value}`,
    password: `${loginPasswordInput.value}`,
  };
  axios
    .post(`${url}/login`, params)
    .then((response) => {
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      token = response.data.token;
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      userData = response.data.user;
      // Clear inputs
      loginUsernameInput.value = "";
      loginPasswordInput.value = "";

      ifTokenInLocal();
    })
    .catch((error) => {
      document.body.style.position = "relative";
      let aleee = document.createElement("div");
      aleee.innerHTML = `<div class="alert alert-danger theAlert position-absolute  end-0" role="alert" style="z-index:9999; top:90vh">
         ${error.response.data.message}
        </div>`;

      document.body.appendChild(aleee);
      setTimeout(function () {
        document.querySelector(".theAlert").style.display = "none";
      }, 2000);
      console.log(error.response.data.message);
    });
  return;
}

let allLisInMainNave = document.querySelectorAll(".mainnaveul li a");
let contentbody = document.querySelector(".contentbody");
let forcommingsoon = document.querySelector(".forcommingsoon");
forcommingsoon.style.display = "none";
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("comingsoon")) {
    contentbody.style.display = "none";
    forcommingsoon.style.display = "block";
    allLisInMainNave.forEach(function (li) {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("homepage")) {
    contentbody.style.display = "block";
    forcommingsoon.style.display = "none";
    allLisInMainNave.forEach(function (li) {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
  }
});
