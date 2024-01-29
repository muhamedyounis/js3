var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addWebsiteBtn = document.getElementById("addWebsiteBtn");
var regexName = /^([a-zA-Z\s]){3,15}$/;
var regexWebsite =
  /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
var websitesList = [];
var localData = JSON.parse(localStorage.getItem("websitesList"));
var validateNameInput;
var validateUrlInput;
var nameAlert = document.getElementById("nameAlert");
var urlAlert = document.getElementById("urlAlert");

if (localData != null) {
  websitesList = localData;
  displayWebsites();
}

function validateName() {
  if (regexName.test(siteName.value)) {
    validateNameInput = true;
    siteName.classList.add("is-valid");
    nameAlert.classList.add("d-none");
    siteName.classList.remove("is-invalid");
  } else {
    validateNameInput = false;
    siteName.classList.add("is-invalid");
    nameAlert.classList.remove("d-none");
    siteName.classList.remove("is-valid");
  }
}
function validateUrl() {
  if (regexWebsite.test(siteUrl.value)) {
    validateUrlInput = true;
    siteUrl.classList.add("is-valid");
    urlAlert.classList.add("d-none");
    siteUrl.classList.remove("is-invalid");
  } else {
    validateUrlInput = false;
    siteUrl.classList.add("is-invalid");
    urlAlert.classList.remove("d-none");
    siteUrl.classList.remove("is-valid");
  }
}

function addWebsite() {
  if (validateNameInput && validateUrlInput) {
    var website = {
      name: siteName.value,
      link: siteUrl.value,
    };
    websitesList.push(website);
    localStorage.setItem("websitesList", JSON.stringify(websitesList));
    clearInputs();
    displayWebsites();
  } else {
    alert("Retype your info!");
  }
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "http://";
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

function displayWebsites() {
  var tableBody = "";
  for (i = 0; i < websitesList.length; i++) {
    tableBody += `<tr>
        <td>${i}</td>
        <td>${websitesList[i].name}</td>
        <td><a href="${websitesList[i].link}" class="btn visit-btn" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button class="btn delete-btn" onclick="deleteEntry(${i})"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
    </tr>`;
  }
  document.getElementById("bookmarksContainer").innerHTML = tableBody;
}

function deleteEntry(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("websitesList", JSON.stringify(websitesList));
  displayWebsites();
}
