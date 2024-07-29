document.addEventListener("DOMContentLoaded", function () {
  fetchTopPosts();
});

const bannerContainer = document.getElementById("owl-banner");

const fetchTopPosts = () => {
  fetch("/api/posts?page=1&limit=6", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const { success, message, data: responseData } = data;
      if (success && responseData.length) {
        for (const post of responseData) {
          const parser = new DOMParser();
          const currentElement = addSlide(post);
          const doc = parser.parseFromString(currentElement, "text/html");
          bannerContainer.appendChild(doc);
        }
      } else {
        let i = 0;
        while (i < 6) {
          const parser = new DOMParser();
          const currentElement = getDefaultSlide();
          const doc = parser.parseFromString(currentElement, "text/html");
          bannerContainer.appendChild(doc);
          i++;
        }
        showPopup({ message: "Failed to fetch!", type: "Failed", show: true });
        setTimeout(() => {
          showPopup({ message: "", type: "", show: false });
        }, 3000);
      }
    })
    .catch((error) => {
      const currentElement = getDefaultSlide();
      bannerContainer.innerHTML += currentElement;
      showPopup({ message: error?.message, type: "Failed", show: true });
      setTimeout(() => {
        showPopup({ message: null, type: null, show: false });
      }, 3000);
    });
};

function showPopup({ message, type, show }) {
  window.sessionStorage.setItem("showPopup", show);
  window.sessionStorage.setItem("popupType", type);
  window.sessionStorage.setItem("popupMessage", message);
}

function addSlide(post) {
  return `
    <div class="item">
          <img src="${post.media}" alt="">
          <div class="item-content">
            <div class="main-content">
              <div class="meta-category">
                <span>${post.category.name}</span>
              </div>
              <a href="./post.html?id=${post.id}">
                <h4>${post.title}</h4>
              </a>
              <ul class="post-info">
                <li><a href="#">${post.createdBy}</a></li>
                <li><a href="#">${post.createdAt}</a></li>
                <li><a href="#">${
                  post.comments?.length > 1
                    ? post.comments.length + " Comments"
                    : post.comments.length + " Comment"
                }</a></li>
              </ul>
            </div>
          </div>
        </div>
    `;
}

function getDefaultSlide() {
  return `
      <div class="item">
          <img src="./assets/images/banner-item-01.jpg" alt="">
          <div class="item-content">
            <div class="main-content">
              <div class="meta-category">
                <span>Fashion</span>
              </div>
              <a href="./post.html">
                <h4>Morbi dapibus condimentum</h4>
              </a>
              <ul class="post-info">
                <li><a href="#">Admin</a></li>
                <li><a href="#">May 12, 2020</a></li>
                <li><a href="#">12 Comments</a></li>
              </ul>
            </div>
          </div>
        </div>
  `;
}
