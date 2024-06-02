alertlogin();
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

ifNoTokenInLocal();

getPosts(20);

//

// /////////////////////////////////////////////////
// here will get 50 post but at first i will get just 20 post and every time i reach end by scroll i will get another 10 post
function appendPostToContainer(post) {
  let postUsername = post.author.name;
  let postUserimg = isEmpty(post.author.profile_image)
    ? "../imgs/prof.png"
    : post.author.profile_image;
  let postTitle = post.title || "";
  let postBody = post.body || "";
  let postImg = post.image || "";
  let postCreated_at = post.created_at;

  theContainerOfPosts.innerHTML += `
    <div class="card mb-5" style="width: 40rem; max-width:100%">
      <div class="userInfo p-3 d-flex justify-content-start align-items-center">
        <img class="postUserimg" src=${postUserimg} alt="" style="width: 50px; height: 50px; border-radius: 50%;">
        <h5 class="postUsername" style="padding-left: 10px;">${postUsername}</h5>
      </div>
      <img src=${postImg} class="card-img-top p-2 postImg" alt="">
      <div class="card-body">
        <h5 class="card-title postTitle">${postTitle}</h5>
        <p class="card-text postBody">${postBody}</p>
        <hr>
        <div class="comment d-flex justify-content-start align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
            <path fill="#493489" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/>
          </svg>
          <p class="card-text ms-2"><small class="text-body-secondary postCreated_at">Last updated ${postCreated_at}</small></p>
        </div>


        <div class="row" style="display: flex; flex-direction: column; padding: 10px 15px;"> 
        <button class="addComment" value="${post.id}" style="border: 1px solid black; background-color: transparent; border-radius: 6px 6px;
        padding: 5px 10px;">add comments</button>
        
        <p class="card-text ms-2 " style=" display: flex; margin-top: 10px;margin-bottom: 10px; justify-content: space-between; align-items: center;">
        <button class="showComments" value="${post.id}" style="border: 1px solid black; background-color: transparent; border-radius: 6px 6px; padding: 5px 10px; margin-left: 5px;">show ${post.comments_count} comments</button>
        
       
        </p>
        

        <form>
        <div class="mb-3">
          <label for="commentText" class="form-label">Comment Text</label>
          <input type="text" class="form-control commentBodyText" id="commentText" aria-describedby="emailHelp">
        </div>
        
      </form>


        </div>



      </div>
    </div>
  `;
}

let loadingPosts = false;

window.addEventListener("scroll", function () {
  if (!loadingPosts && isBottomOfPage()) {
    loadingPosts = true;
    addNewPosts();
    thelimit += 10;
  }
});

function isBottomOfPage() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
}
let thelimit = 30;
function addNewPosts() {
  let offset = theContainerOfPosts.children.length;
  if (offset != thelimit) {
    let load = document.createElement("div");
    load.innerHTML = `<div class="d-flex justify-content-center position-fixid top-50 start-50">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
    document.body.appendChild(load);
    setTimeout(() => {
      load.style.display = "none";
    }, 2500);
  }
  axios
    .get(`${url}/posts?limit=${thelimit}&offset=${offset}`)
    .then((response) => {
      const posts = response.data.data;
      let aftetsli = posts.slice(offset, offset + 10);
      for (const post of aftetsli) {
        appendPostToContainer(post);
      }
      loadingPosts = false;
      console.log(posts);
    })
    .catch((error) => {
      console.log(error);
      loadingPosts = false;
    });
}

// /////////////////////////////////////////////////

//
// function check if user have pic or no
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

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
        // postImg = post.image;
        postImg = post.image;
        if (isEmpty(post.image)) {
          postImg = "";
        }
        postCreated_at = post.created_at;

        if (isEmpty(post.author.profile_image)) {
          postUserimg = "../imgs/prof.png";
        } else {
          postUserimg = post.author.profile_image;
        }
        if (post.title != null) {
          postTitle = post.title;
        }
        if (post.body != null) {
          postBody = post.body;
        }
        //
        if (postImg !== "") {
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

<div class="row" style="display: flex; flex-direction: column; padding: 10px 15px;"> 
<p class="card-text ms-2 " style=" display: flex; margin-top: 10px;margin-bottom: 10px; justify-content: space-between; align-items: center;">
<button class="addComment" value="${post.id}" style="border: 1px solid black; background-color: transparent; border-radius: 6px 6px;
padding: 5px 10px;">add comments</button>

<button class="showComments" value="${post.id}" style="border: 1px solid black; background-color: transparent; border-radius: 6px 6px;
padding: 5px 10px;margin-left: 5px; ">show ${post.comments_count} comments</button>


</p>


<form>
<div class="mb-3">
  <label for="commentText" class="form-label">Comment Text</label>
  <input type="text" class="form-control commentBodyText" id="commentText" aria-describedby="emailHelp">
</div>

</form>


</div>
            </div>
          </div>
          `;
        } else {
          theContainerOfPosts.innerHTML += `
          <div class="card mb-5" style="width: 40rem; max-width:100%">
            <div class="userInfo p-3 d-flex justify-content-start align-items-center">

              <img class="postUserimg" src=${postUserimg} alt="" style="width: 50px; height: 50px; border-radius: 50%;">

              <h5 class="postUsername" style="padding-left: 10px;">${postUsername}</h5>
            </div>
            <div class="card-body">
              <h5 class="card-title postTitle">${postTitle}</h5>
              <p class="card-text postBody">${postBody}</p>
              <hr>
              <div class="comment  d-flex justify-content-start align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#493489" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>
                <p class="card-text ms-2"><small class="text-body-secondary postCreated_at">Last updated ${postCreated_at}</small></p>
                </div>

<div class="row" style="display: flex; flex-direction: column; padding: 10px 15px;"> 
<p class="card-text ms-2 " style=" display: flex; margin-top: 10px;margin-bottom: 10px; justify-content: space-between; align-items: center;">
<button class="addComment" value="${post.id}" style="border: 1px solid black; background-color: transparent; border-radius: 6px 6px;
padding: 5px 10px;">add comments</button>

<button class="showComments" value="${post.id}" style="border: 1px solid black; background-color: transparent; border-radius: 6px 6px;
padding: 5px 10px;">show ${post.comments_count} comments</button>


</p>


<form>
<div class="mb-3">
  <label for="commentText" class="form-label">Comment Text</label>
  <input type="text" class="form-control commentBodyText" id="commentText" aria-describedby="emailHelp">
</div>

</form>


</div>
            </div>
          </div>
          `;
        }

        //
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return;
}
function ifNoTokenInLocal() {
  if (!localStorage.token) {
    window.open("../index.html", "_self");
    token = localStorage.token;
  }
  return;
}

const logout = document.querySelector(".logout");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("logout")) {
    logOut();
  }
});

function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  token = "";
  userData = "";
  ifNoTokenInLocal();
}

let nameofUser = document.querySelector(".nameofUser");
let imgofUser = document.querySelector(".imgofUser");

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

function alertlogin() {
  document.body.style.position = "relative";
  let aleee = document.createElement("div");
  aleee.innerHTML = `<div class="alert alert-success theAlert container fixed-bottom  " role="alert" style="z-index:9999; width:fit-content">
         Log In Successfully
        </div>`;

  document.body.appendChild(aleee);
  setTimeout(function () {
    document.querySelector(".theAlert").style.display = "none";
  }, 3000);
}

// start btn create post

document.addEventListener("click", (e) => {
  if (e.target.id === "btnCreatePost") {
    createPostAndGetPostsAgain();
  }
});

// function TO Create post
function createPostAndGetPostsAgain() {
  const token = localStorage.token;
  let formData = new FormData();
  formData.append("title", document.getElementById("post-title").value);
  formData.append("body", document.getElementById("post-body").value);
  if (document.getElementById("post-img").files[0]) {
    formData.append("image", document.getElementById("post-img").files[0]);
  }
  console.log(token);
  console.log(formData);
  let theHeaders = {
    authorization: token,
  };
  axios
    .post(`${url}/posts`, formData, { headers: theHeaders })
    .then((response) => {
      console.log(response);
      document.getElementById("closecreate").click();
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

// end btn create post

// update profile

// function updateProfile() {
//   let formData = new FormData();
//   formData.append("image", "../imgs/profpic.jpg");
//   axios.put(`${url}/updatePorfile`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       authorization: localStorage.token,
//     },
//   });
// }
// updateProfile();
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("showComments")) {
    // console.log("good");
    // console.log(e.target.value);
    let commentId = e.target.value;
    let btn = e.target;
    axios
      .get(`${url}/posts/${commentId}`)
      .then((response) => {
        let commentsArray = response.data.data.comments;

        let parent = e.target.parentElement.parentElement;

        if (commentsArray.length > 0) {
          // console.log(commentsArray);
          btn.setAttribute("disabled", "");

          for (const comment of commentsArray) {
            console.log(comment);
            let commentProfileImgUrl = comment.author.profile_image;
            console.log(commentProfileImgUrl);
            let commentProfileName = comment.author.name;
            console.log(commentProfileName);
            let commentBody = comment.body;
            console.log(commentBody);
            // console.log(e.target.parentElement.parentElement);
            if (isEmpty(commentProfileImgUrl)) {
              commentProfileImgUrl = "../imgs/prof.png";
            }
            parent.innerHTML += `<div style="display:flex; margin-bottom: 5px; background-color: #f9f9f9; padding: 10px 15px; border: 1px solid gray; border-radius: 10px 10px; margin-top: 5px;">
            <div style="margin-right:5px">
              <img style ="width: 50px; height: 50px; border-radius: 50%;"src="${commentProfileImgUrl}" alt="" srcset="">
            </div>

            <div>
            <div style="font-weight:bold">${commentProfileName}</div>
            <div>Comment: ${commentBody}</div>
            </div>

            </div>`;
          }
        } else {
          btn.setAttribute("disabled", "");
          let parent = e.target.parentElement.parentElement;

          parent.innerHTML += `<div style="display:flex; margin-bottom: 5px; background-color: #f9f9f9; padding: 10px 15px; border: 1px solid gray; border-radius: 10px 10px; margin-top: 5px;">
            <div style="font-weight:bold">This Post Have No Comment</div>
            </div>`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
let commentId = "";
//
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("addComment") &&
    document.getElementById("commentText").value !== ""
  ) {
    commentId = e.target.value;
    let btn = e.target;
    btn.setAttribute("disabled", "");
    ass();
  }
});

function ass() {
  let params = {
    body: `${document.getElementById("commentText").value}`,
  };
  let theHeaders = {
    authorization: localStorage.token,
  };

  axios
    .post(`${url}/posts/${commentId}/comments`, params, {
      headers: theHeaders,
    })
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
