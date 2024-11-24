var WebsitName = document.getElementById("WebsitName");
var WebsiteURL = document.getElementById("WebsiteURL");

var WebsitLest;
if (localStorage.getItem("Websits") == null) {
  WebsitLest = [];
} else {
  WebsitLest = JSON.parse(localStorage.getItem("Websits"));
  desplay();
}

function validateURL(url) {
  var regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
}

function addWebsit() {
  if (
    WebsitLest.some(
      (object) =>
        object.WebsitName.toLowerCase() === WebsitName.value.toLowerCase()
    )
  ) {
    alert("Site already added! Please enter another name");
    return;
  }

  var url = WebsiteURL.value;
  if (!validateURL(url)) {
    Swal.fire({
      icon: "error",
      title: "Site  Url is not valid, Please follow the rules below :",
      html: `Site URL must be a valid one. Please follow these rules:
      <ul class=" text-start">
        <li>The URL must start with <strong>http://</strong> or <strong>https://</strong></li>
        <li>The URL should not contain any spaces.</li>
        <li>Ensure the URL points to a valid web address (e.g., example.com).</li>
        <li>The URL should not have special characters like <strong>&lt;, &gt;, ?, #, %, etc.</strong></li>
      </ul>`,
      confirmButtonColor: "#d33",
      confirmButtonText: "Got it!",
    });
    return;
  }

  var wibsit = {
    WebsitName: WebsitName.value,
    linkWebsit: WebsiteURL.value,
  };

  WebsitLest.push(wibsit);
  clerinput();
  localStorage.setItem("Websits", JSON.stringify(WebsitLest));
  desplay();
}

function clerinput() {
  WebsitName.value = null;
  WebsiteURL.value = null;
}

function desplay() {
  var cartona = "";
  for (i = 0; i < WebsitLest.length; i++) {
    cartona += ` <tr>
                <td>${i + 1}</td>
                <td>${WebsitLest[i].WebsitName}</td>
                <td>
                  <button class="btn btn-visit btn-success" data-index="0">
                          <i class="fa-solid fa-eye pe-2"></i><a target="_blank" href="${
                            WebsitLest[i].linkWebsit
                          }">Visit</a>
                  </button>
                </td>
                <td class="Delete">
                  <button onclick="deletSite(${i})" class="btn btn-delete pe-2 btn-danger" data-index="0">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
              </tr>`;
  }

  document.getElementById("tebl").innerHTML = cartona;
}

function deletSite(deleted) {
  WebsitLest.splice(deleted, 1);
  desplay();
  localStorage.setItem("Websits", JSON.stringify(WebsitLest));
}
