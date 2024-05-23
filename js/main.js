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

// Home Page Befor LogIn Or SignUp
let homePageBeforLogInOrSignUp = document.querySelector(
  ".homePageBeforLogInOrSignUp"
);

// Home Page After LogIn Or SignUp
let homePageAfterLogInOrSignUp = document.querySelector(
  ".homePageAfterLogInOrSignUp"
);
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer 104937|h6WICTyVt6tUuAcAv9zpVh9boFF14ZoST1jQTUhz`;

ifNoTokenInLocal();
ifTokenInLocal();

// Start Sign Up
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("signUpImBtn")) {
    signUp();
  }
});
// End Sign Up

// Start Log In
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("loginImBtn")) {
    logIn();
  }
});
// End Log In

// Function Sign Up
function signUp() {
  let params = {
    username: `${signUpUsernameInput.value}`,
    password: `${signUpPasswordInput.value}`,
    name: `${signUpNameInput.value}`,
    email: `${signUpEmailInput.value}`,
  };
  axios
    .post(`${url}/register`, params)
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

// Function Log In
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

// Function Get posts
function getPosts(limit) {
  axios
    .get(`${url}/posts?limit=${limit}`)
    .then((response) => {
      const posts = response.data.data;
      theContainerOfPosts.innerHTML = "";
      for (const post of posts) {
        let postUsername = "";
        let postUserimg = "";
        let postTitle = "";
        let postBody = "";
        let postImg = "";
        let postCreated_at = "";
        postUsername = post.author.name;
        postImg = post.image;
        postCreated_at = post.created_at;
        if (post.author.profile_image != {}) {
          postUserimg = post.author.profile_image;
        }
        if (post.title != null) {
          postTitle = post.title;
        }
        if (post.body != null) {
          postBody = post.body;
        }
        theContainerOfPosts.innerHTML += `
        <div class="card mb-5" style="width: 40rem; max-width:100%">
          <div class="userInfo p-3 d-flex justify-content-start align-items-center">
            <img class="postUserimg" src=${postUserimg} alt="" style="width: 50px; height: 50px; border-radius: 50%;">
            <h5 class="postUsername" style="padding-left: 10px;">${postUsername}</h5>
          </div>
          <img  src=${postImg} class="card-img-top p-2 postImg" alt="">
          <div class="card-body">
            <h5 class="card-title postTitle">${postTitle}</h5>
            <p class="card-text postBody">${postBody}</p>
            <hr>
            <div class="comment  d-flex justify-content-start align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#493489" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>
              <p class="card-text ms-2"><small class="text-body-secondary postCreated_at">Last updated ${postCreated_at}</small></p>
            </div>
          </div>
        </div>
        `;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return;
}

// Function for Display None The Home Page And Nav Bar and Display Block the Nav Bar And Posts
// function dNoneHomeAndDBlockPosts() {

//   homePageBeforLogInOrSignUp.style = "display: none";
//   homePageAfterLogInOrSignUp.style = "display: block";
//   return;
// }

// Function for Display None The Home Page And Nav Bar and Display Block the Nav Bar And Posts
// function dBlockHomeAndDNonePosts() {
//   homePageAfterLogInOrSignUp.style = "display: none";
//   homePageBeforLogInOrSignUp.style = "display: block";
//   return;
// }

// Funcion check if token in localstorge
function ifTokenInLocal() {
  if (localStorage.token) {
    token = localStorage.token;
    userData = JSON.parse(localStorage.userData);
    // dNoneHomeAndDBlockPosts();
    window.open("../html/posts.html", "_self");
    getPosts(20);
  }
  return;
}
// ifTokenInLocal();

// Funcion check if no token in localstorge
function ifNoTokenInLocal() {
  if (!localStorage.token) {
    // dBlockHomeAndDNonePosts();
    window.open("../index.html", "_self");
  }
  return;
}
// ifNoTokenInLocal();

// Start Log Out
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("logOutImBtn")) {
  }
});
// End Log Out

// Function Log Out
// function logOut() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userData");
//   token = "";
//   userData = "";
//   ifNoTokenInLocal();
//   return;
// }
// logOut();
// window.location.reload();

const logout = document.querySelector(".logout");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("logout")) {
    logOut();
  }
});
// Function Log Out
// function logOut() {
//   axios
//     .post(`${url}/logout`, {
//       headers: {
//         "X-Custom-Header": "value",
//         Authorization: `${localStorage.token}`,
//       },
//     })
//     .then((response) => {
//       console.log(response);

//       localStorage.removeItem("token");
//       localStorage.removeItem("userData");
//       token = "";
//       userData = "";
//       ifNoTokenInLocal();
//       location.reload(true);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return;
// }

function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  token = "";
  userData = "";
  ifNoTokenInLocal();
}

// function userdatainsidenav

let nameofUser = document.querySelector(".nameofUser");
let imgofUser = document.querySelector(".imgofUser");

function userdatainsidenavee() {
  // userdatainsidenav.innerHTML = "";
  // let thename = document.createElement("span");
  if (localStorage.token) {
    nameofUser.innerHTML = JSON.parse(localStorage.getItem("userData")).name;
    imgofUser.setAttribute(
      "src",
      JSON.parse(localStorage.getItem("userData")).profile_image
    );
  }
}
userdatainsidenavee();

//

//
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
