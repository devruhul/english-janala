const renderEmptyWordsMessage = () => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = `
    <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
      <p class="text-xl font-medium text-gray-400">কোনো শব্দ পাওয়া যায়নি</p>
      <h2 class="font-bold text-3xl">অন্য একটি Lesson Select করুন।</h2>
    </div>
  `;
};

const removeActiveButtonState = () => {
  const buttons = document.querySelectorAll(".lesson-btn");
  buttons.forEach((button) => button.classList.remove("active"));
};

const displayWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (!words || words.length === 0) {
    renderEmptyWordsMessage();
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl p-6 space-y-3 shadow";
    card.innerHTML = `
      <h3 class="text-2xl font-bold">${word.word || "N/A"}</h3>
      <p class="text-gray-500">Meaning / Pronunciation</p>
      <p class="text-lg font-medium">${word.meaning || "No meaning"} / ${word.pronunciation || "N/A"}</p>
    `;
    wordContainer.appendChild(card);
  });
};

const loadLevelWords = (levelNo) => {
  fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`)
    .then((response) => response.json())
    .then((data) => {
      displayWords(data.data);
    });
};

const loadLevelButtons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => {
      const buttonContainer = document.getElementById("lessons-list");
      buttonContainer.innerHTML = "";

      data.data.forEach((level) => {
        const button = document.createElement("button");
        button.id = `btn-level-${level.level_no}`;
        button.className = "btn btn-outline btn-primary lesson-btn";
        button.textContent = `Lesson - ${level.level_no}`;

        button.addEventListener("click", () => {
          removeActiveButtonState();
          button.classList.add("active");
          loadLevelWords(level.level_no);
        });

        buttonContainer.appendChild(button);
      });
    });
};

loadLevelButtons();
