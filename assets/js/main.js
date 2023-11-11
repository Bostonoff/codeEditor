const dm = document.getElementsByClassName("CodeMirror-line");

const htmlEditor = CodeMirror(document.querySelector(".html-code"), {
  lineNumbers: true,
  tabSize: 4,
  mode: "xml",
});
const cssEditor = CodeMirror(document.querySelector(".css-code"), {
  lineNumbers: true,
  tabSize: 4,
  mode: "css",
});
const jsEditor = CodeMirror(document.querySelector(".js-code"), {
  lineNumbers: true,
  tabSize: 4,
  mode: "javascript",
});

// Function to save editor values to local storage
function saveEditorValues() {
  localStorage.setItem("htmlEditorValue", htmlEditor.getValue());
  localStorage.setItem("cssEditorValue", cssEditor.getValue());
  localStorage.setItem("jsEditorValue", jsEditor.getValue());
}

// Function to load editor values from local storage
function loadEditorValues() {
  htmlEditor.setValue(localStorage.getItem("htmlEditorValue") || "");
  cssEditor.setValue(localStorage.getItem("cssEditorValue") || "");
  jsEditor.setValue(localStorage.getItem("jsEditorValue") || "");
}

document.querySelector("#run-button").addEventListener("click", function () {
  let htmlCode = htmlEditor.getValue();
  let cssCode = "<style>" + cssEditor.getValue() + "</style>";
  let jsCode = "<scri" + "pt>" + jsEditor.getValue() + "</scri" + "pt>";

  let previewWindow =
    document.querySelector("#show-code").contentWindow.document;
  previewWindow.open();
  previewWindow.write(htmlCode + cssCode + jsCode);
  previewWindow.close();

  // Save editor values to local storage
  saveEditorValues();
});

// Load saved editor values from local storage
loadEditorValues();
var maximizeBtn = document.getElementById("maximizeBtn");
var minimizeBtn = document.getElementById("minimizeBtn");

maximizeBtn.addEventListener("click", function () {
  // Maximize window
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    // IE/Edge
    document.documentElement.msRequestFullscreen();
  }

  // Change icons
  maximizeBtn.classList.add("d-none");
  minimizeBtn.classList.remove("d-none");
});

minimizeBtn.addEventListener("click", function () {
  // Minimize window
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    // Chrome, Safari and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // IE/Edge
    document.msExitFullscreen();
  }

  // Change icons
  minimizeBtn.classList.add("d-none");
  maximizeBtn.classList.remove("d-none");
});

function downloadCode(filename, code) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(code)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
document
  .querySelector("#html-download-icon")
  .addEventListener("click", function () {
    var htmlCode = htmlEditor.getValue();
    downloadCode("index.html", htmlCode);
  });

document
  .querySelector("#css-download-icon")
  .addEventListener("click", function () {
    var cssCode = cssEditor.getValue();
    downloadCode("index.css", cssCode);
  });

document
  .querySelector("#js-download-icon")
  .addEventListener("click", function () {
    var jsCode = jsEditor.getValue();
    downloadCode("main.js", jsCode);
  });

function downloadProject() {
  // Get the values from the CodeMirror editors
  var htmlCode = htmlEditor.getValue();
  var cssCode = cssEditor.getValue();
  var jsCode = jsEditor.getValue();

  // Create the file contents
  var fileContents =
    "<html>\n" +
    "<head>\n" +
    "<style>\n" +
    cssCode +
    "</style>\n" +
    "</head>\n" +
    "<body>\n" +
    htmlCode +
    "<script>\n" +
    jsCode +
    "</script>\n" +
    "</body>\n" +
    "</html>";

  // Create a Blob object with the file contents
  var blob = new Blob([fileContents], { type: "text/html" });

  // Create a temporary <a> element to trigger the download
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "project.html";
  link.click();

  // Clean up the temporary <a> element
  link.remove();
}
var downloadButton = document.getElementById("download-button");
downloadButton.addEventListener("click", downloadProject);

var newProjectButton = document.getElementById("newProjectButton");
newProjectButton.addEventListener("click", function () {
  createNewDocument();
});

function createNewDocument() {
  // Clear editors
  htmlEditor.setValue("");
  cssEditor.setValue("");
  jsEditor.setValue("");
  // Create new section
  var newSection = document.createElement("section");
  newSection.classList.add("row", "all-div");

  // Create new columns
  var newHTMLColumn = createNewColumn("html-code bg-dark col-lg-4");
  var newCSSColumn = createNewColumn("css-code bg-dark col-lg-4");
  var newJSColumn = createNewColumn("js-code bg-dark col-lg-4");

  // Append columns to the section
  newSection.appendChild(newHTMLColumn);
  newSection.appendChild(newCSSColumn);
  newSection.appendChild(newJSColumn);

  // Append new section to the body
  document.body.appendChild(newSection);

  // Create new window with empty editors
  openNewWindow();
}

function createNewColumn(className) {
  var columnDiv = document.createElement("div");
  columnDiv.classList.add(className);

  var innerDiv = document.createElement("div");
  innerDiv.classList.add("p-0", "pt-3");

  var pTag = document.createElement("p");
  pTag.classList.add("mb-0", "rounded-top");

  innerDiv.appendChild(pTag);
  columnDiv.appendChild(innerDiv);

  return columnDiv;
}

function openNewWindow() {
  var newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <html>
      <head>
        <title>New Project</title>
        <style>
          .show-code {
            height: 100vh;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <section class="row all-div">
          <div class="html-code bg-dark col-lg-4">
            <div class="p-0 pt-3">
              <p
                class="mb-0 rounded-top"
                style="box-shadow: 0px 0px 20px 5px #ff5500"
              >
                <i class="fa-solid fa-code"></i>HTML
                <a href="#" id="html-download-icon"><i class="fa-solid fa-download"></i></a>
              </p>
            </div>
          </div>
          <div class="css-code bg-dark col-lg-4">
            <div class="p-0 pt-3">
              <p
                class="mb-0 rounded-top"
                style="box-shadow: 9px -3px 20px 5px #00a4ff"
              >
                <i class="fa-brands fa-css3 fa-lg"></i>Css
                <a href="#" id="css-download-icon"
                  ><i class="fa-solid fa-cart-arrow-down" style="color: #005eff"></i
                ></a>
              </p>
            </div>
          </div>
          <div class="js-code bg-dark col-lg-4">
            <div class="p-0 pt-3">
              <p
                class="mb-0 rounded-top"
                style="box-shadow: 9px -3px 20px 5px #e5ff00"
              >
                <i class="fab fa-js fa-lg"></i>javascript
                <a href="#" id="js-download-icon"
                  ><i class="fa-solid fa-cloud-arrow-down"></i
                ></a>
              </p>
            </div>
          </div>
        </section>
        <div class="main-header text-center">
          <button id="run-button"><i class="fas fa-redo-alt"></i>Run</button>
          <div class="column" style="height: 100vh">
            <iframe class="show-code" id="show-code"></iframe>
          </div>
        </div>
        <script>
          const htmlEditor = CodeMirror(document.querySelector(".html-code"), {
            lineNumbers: true,
            tabSize: 4,
            mode: "xml",
          });
          const cssEditor = CodeMirror(document.querySelector(".css-code"), {
            lineNumbers: true,
            tabSize: 4,
            mode: "css",
          });
          const jsEditor = CodeMirror(document.querySelector(".js-code"), {
            lineNumbers: true,
            tabSize: 4,
            mode: "javascript",
          });  </script>
          </body>
        </html>
      `);
}

// Function to save editor values to local storage
function saveEditorValues() {
  localStorage.setItem("htmlEditorValue", htmlEditor.getValue());
  localStorage.setItem("cssEditorValue", cssEditor.getValue());
  localStorage.setItem("jsEditorValue", jsEditor.getValue());
}

// Function to load editor values from local storage
function loadEditorValues() {
  htmlEditor.setValue(localStorage.getItem("htmlEditorValue") || "");
  cssEditor.setValue(localStorage.getItem("cssEditorValue") || "");
  jsEditor.setValue(localStorage.getItem("jsEditorValue") || "");
}

document.querySelector("#run-button").addEventListener("click", function () {
  let htmlCode = htmlEditor.getValue();
  let cssCode = "<style>" + cssEditor.getValue() + "</style>";
  let jsCode = "<scri" + "pt>" + jsEditor.getValue() + "</scri" + "pt>";

  let previewWindow =
    document.querySelector("#show-code").contentWindow.document;
  previewWindow.open();
  previewWindow.write(htmlCode + cssCode + jsCode);
  previewWindow.close();

  // Save editor values to local storage
  saveEditorValues();
});

// Load saved editor values from local storage
loadEditorValues();
