document.addEventListener("DOMContentLoaded", function () {
  fetchCategories();
});

const modalHTML = `
  <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
    <div class="modal-dialog pt-5">
      <div class="modal-content mt-5">
        <div class="modal-header">
          <h5 class="modal-title" id="categoryModalLabel">Add Category</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
         <section class="contact-us">
              <div class="container">
                <div class="row" style="display: flex; align-items: center; justify-content: center;">
                  <div id="form-container" class="col-lg-10">
                    <div id="response"></div>
                    <div class="">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="sidebar-item contact-form">
                            <div class="sidebar-heading">
                              <h2 style="color: #fff;">LOGIN</h2>
                            </div>
                            <div class="content">
                              <form id="contact">
                                <div class="row" style="display: flex; justify-content: center; align-items: center;">
                                  <div class="col-12">
                                    <fieldset>
                                    <input name="name" type="text" id="name" placeholder="Category name" required>
                                    </fieldset>
                                  </div>
                                  <div class="col-12">
                                    <fieldset>
                                      <textarea name="description" type="text" id="description"
                                        placeholder="Category description" required rows="2"></textarea>
                                    </fieldset>
                                  </div>
                                  <div class="col-9">
                                    <fieldset>
                                      <select id="icon" onchange="selectIcon(event)">
                                        <option value="globe">Globe</option>
                                        <option value="hotel">Hotel</option>
                                        <option value="user">User</option>
                                        <option value="cog">Cog</option>
                                        <option value="newspaper">Newspaper</option>
                                        <option value="laptop">Laptop</option>
                                        <option value="heartbeat">Heartbeat</option>
                                        <option value="book">Book</option>
                                        <option value="utensils">Utensils</option>
                                        <option value="football-ball">Football</option>
                                        <option value="film">Film</option>
                                        <option value="flask">Flask</option>
                                        <option value="dog">Animal</option>
                                        <option value="money-bill-wave">Money</option>
                                        <option value="plane">Plane</option>
                                        <option value="paint-brush">Paint Brush</option>
                                        <option value="tshirt">T-shirt</option>
                                        <option value="music">Music</option>
                                        <option value="balance-scale">Scale</option>
                                        <option value="tree">Tree</option>
                                        <option value="spa">Spa</option>
                                        <option value="briefcase">Briefcase</option>
                                        <option value="car">Car</option>
                                        <option value="home">Home</option>
                                        <option value="gamepad">Gamepad</option>
                                      </select>
                                    </fieldset>
                                  </div>
                                  <div id="selectedIcon" class="col-3">
                                    <i class="fa fa-3x fa-globe text-primary mb-4"></i>
                                  </div>
                                  <div class="col-lg-12">
                                    <fieldset>
                                      <button type="button" id="form-submit" class="main-button" style="color: #fff;"
                                        onclick="doSave()">Save</button>
                                    </fieldset>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>
      </div>
    </div>
  </div>
`;
let icon = "";

function showModal() {
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modal-container";
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = modalHTML;

  $("#categoryModal").modal("show");
}

function closeModal() {
  const modalContainer = document.getElementById("modal-container");
  if (modalContainer) {
    $("#categoryModal").modal("hide");
    modalContainer.innerHTML = "";
  }
}

const selectIcon = (e) => {
  const selectedIconContainer = document.getElementById("selectedIcon");
  console.log("VAL ", e.target.value);
  selectedIconContainer.innerHTML = `<i class="fa fa-3x fa-${e.target.value} text-primary mb-4"></i>`;
  icon = e.target.value;
};

document.getElementById("showModalButton").addEventListener("click", showModal);

const doSave = () => {
  const responseContainer = document.getElementById("response");
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  if (!name) {
    responseContainer.innerHTML = "Category name is required!";
    responseContainer.style.backgroundColor = "red";
    responseContainer.style.color = "#fff";
    return;
  }
  if (!description) {
    responseContainer.innerHTML = "Category description is required!";
    responseContainer.style.backgroundColor = "red";
    responseContainer.style.color = "#fff";
    return;
  }
  responseContainer.innerHTML = "";
  responseContainer.style.backgroundColor = "";
  responseContainer.style.color = "";

  saveCategory({ name, description, icon: icon || "globe" });
};

const saveCategory = ({ name, description, icon }) => {
  const responseContainer = document.getElementById("response");
  const token = localStorage.getItem("token");
  fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description, icon }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { success, message } = data;
      if (success) {
        responseContainer.innerHTML = message || "Success!";
        fetchCategories();
        closeModal();
      } else {
        responseContainer.innerHTML = data.message || "Login failed!";
      }
    })
    .catch((error) => {
      responseContainer.innerHTML = "Login failed!";
      console.error("Error:", error);
    });
};

const fetchCategories = () => {
  const categoryContainer = document.getElementById("categoryContainer");
  const token = localStorage.getItem("token");
  fetch("/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("DATA => ", data);
      const { success, message, data: categories } = data;
      if (success) {
        categoryContainer.innerHTML = "";
        for (const category of categories) {
          categoryContainer.innerHTML += `
        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="service-item rounded pt-3">
            <div class="p-4">
              <i class="fa fa-3x fa-${category.icon} text-primary mb-4"></i>
              <h5>${category.name}</h5>
              <p>${category.description}</p>
            </div>
          </div>
        </div>
        `;
        }
      } else {
        responseContainer.innerHTML = message || "Login failed!";
      }
    })
    .catch((error) => {
      responseContainer.innerHTML = "Login failed!";
      console.error("Error:", error);
    });
};
