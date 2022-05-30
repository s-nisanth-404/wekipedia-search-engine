const searchBtn = document.querySelector(".search-btn");
const searchText = document.querySelector(".search-input");

searchText.onkeydown = enter;
searchBtn.addEventListener("click", () => search());

function enter(e) {
  if (e.keyCode == 13) {
    return search();
  } else {
    return;
  }
}
async function search() {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${searchText.value}`
  );
  const data = await response.json();
  console.log(data);

  document.querySelector(".result-title").innerText = data.title;
  document.querySelector(".result-description").innerText = data.description;
  document.querySelector(".result-about").innerHTML = data.extract_html;
  document.querySelector(".originalimage-source").src =
    data.originalimage.source;
}

const talk = document.querySelector(".mic");
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const Recognition = new SpeechRecognition();

talk.addEventListener("click", () => {
  Recognition.start();
});

Recognition.onresult = (event) => {
  console.log(event);
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  searchText.value = transcript;
  search();
};
