class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.card = document.querySelector(".card");
    this.postsContainer = document.querySelector(".postsContainer");
  }

  // Show all posts
  showPosts(posts) {
    let output = "";
    posts.forEach(post => {
      output += `<div class="card mb-3">
        <div class="card-body">
        <h4 class="card-title">${post.title}</h4>
        <p class="card-text">${post.body}</p>
        <a href="#" class="edit card-link" data-id="${post.id}">
        <i class="fa fa-pencil"></i></a>
        <a href="#" class="delete card-link" data-id="${post.id}">
        <i class="fa fa-remove"></i></a>
        </div>
        </div>
        `;
    });
    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    div.className = className;
    div.textContent = message;
    this.card.appendChild(div);
    // this.postsContainer.insertBefore(div, this.post);

    // Remove alert div after 2 sec
    setTimeout(() => {
      div.remove();
      // this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear all fields
  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  // Clear ID hidden value
  clearIdInput() {
    this.idInput.value = "";
  }

  // Change form state
  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block mb-2";

      // Create Cancel button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-danger btn-block";
      button.textContent = "Cancel";
      document.querySelector(".card-form").appendChild(button);
    } else {
      this.postSubmit.textContent = "Post it";
      this.postSubmit.className = "post-submit btn btn-primary btn-block mb-2";

      // Remove cancel button if it is there
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }
      // Clear ID from hidden field
      this.clearIdInput();
      // Clear fields
      this.clearFields();
    }
  }
}

export const ui = new UI();
