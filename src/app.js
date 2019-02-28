import { http } from "./http";
import { ui } from "./ui";

// GET posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Listen for SUBMIT/ADD post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// SUBMIT/ADD post
function submitPost() {
  // Pick up data from input form fields and store them
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body
  };

  // Validate input
  if (title === "" || body === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    //LAST STEP // Check for ID // IF ID VALUE IS NOT THERE that means that we are IN ADD POST STATE
    if (id === "") {
      // Create post / Send data to json-server, and then create post from UI.showPosts
      http
        .post("http://localhost:3000/posts", data)
        .then(() => {
          ui.showAlert("Post added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // ELSE if IT IS THERE that means that we are in UPDATE POST / PUT REQUEST
      http.put(`http://localhost:3000/posts/${id}`, data).then(() => {
        ui.showAlert("Post changed", "alert alert-success");
        ui.changeFormState("add");
        getPosts();
      });
    }
  }
}

// Listen for DELETE EVENT

document.querySelector("#posts").addEventListener("click", deletePost);

// DELETE post
function deletePost(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    let id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("Post removed", "alert alert-success");
          getPosts();
        })
        .catch(err => console.log(err));

      // Remove from UI
      const parent = e.target.parentNode.parentNode.parentNode;
      parent.remove();
    }
  }

  e.preventDefault();
}

// Listen for EDIT state
document.querySelector("#posts").addEventListener("click", enableEdit);

// Enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    // Fill form with current post
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Listen for CANCEL

document.querySelector(".card-form").addEventListener("click", cancelEdit);

// Cancel edit state function

function cancelEdit(e) {
  e.preventDefault();

  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
}
