let nameofUser = document.querySelector(".nameofUser");
let imgofUser = document.querySelector(".imgofUser");

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

function userdatainsidenavee() {
  // userdatainsidenav.innerHTML = "";
  // let thename = document.createElement("span");
  if (localStorage.token) {
    nameofUser.innerHTML = JSON.parse(localStorage.getItem("userData")).name;
    if (isEmpty(JSON.parse(localStorage.getItem("userData")).profile_image)) {
      imgofUser.setAttribute("src", "../imgs/prof.png");
    } else {
      imgofUser.setAttribute(
        "src",
        JSON.parse(localStorage.getItem("userData")).profile_image
      );
    }
  }
}
userdatainsidenavee();
const userData = JSON.parse(localStorage.getItem("userData"));
console.log(userData);

const userImgImg = document.querySelector(".userImgImg");
const nameName = document.querySelector(".nameName");
const userNameName = document.querySelector(".userNameName");
const emailName = document.querySelector(".emailName");
const postsCountNumber = document.querySelector(".postsCountNumber");
const commentsCountNumber = document.querySelector(".commentsCountNumber");

function profileData() {
  if (isEmpty(userData.profile_image)) {
    userImgImg.setAttribute("src", "../imgs/prof.png");
  } else {
    userImgImg.setAttribute("src", userData.profile_image);
  }
  nameName.innerHTML = userData.name;
  userNameName.innerHTML = userData.username;
  emailName.innerHTML = userData.email;
  postsCountNumber.innerHTML = userData.posts_count;
  commentsCountNumber.innerHTML = userData.comments_count;
}
profileData();
