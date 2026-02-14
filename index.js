const createElemens = (arr = []) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return `<span class="btn btn-sm btn-ghost">No synonyms</span>`;
  }
  const htmlElement = arr.map((el) => `<span class="btn btn-sm">${el}</span>`);
  return htmlElement.join(" ");
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const loadLevelWord = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const clickedBtn = document.getElementById(`lesson-${id}`);
      const allButtons = document.querySelectorAll("#level-container button");
      allButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
      clickedBtn.classList.add("active");

      displayWord(data.data);
    });
};

const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
     <div
        class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
      <img src="./assets/alert-error.png" alt="Empty Lesson" class="mx-auto w-16 h-16" />
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white py-10 text-center px-5 rounded-xl space-y-4">
      <h2>${word.word ? word.word : "No word available"}</h2>
      <p>Meaning
        <span class="font-semibold">${word.meaning ? word.meaning : "No meaning available"}</span>
        <div>${word.pronunciation ? word.pronunciation : "No pronunciation available"}</div>
        <div class="flex justify-between items-center ">
          <button onclick="loadWordDetails('${word.id}')" class="bg-blue hover:bg-[#85afed10] btn btn-primary"> <i class="fa-solid fa-info-circle"></i>
          </button>

        <button class="bg-blue hover:bg-[#85afed10] btn btn-primary "><i class="fa-solid fa-volume-high"></i> </button>
        </div>
      </p>

     </div>
   `;

    wordContainer.appendChild(card);
  });
};

const loadWordDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`,
  );
  const data = await response.json();
  const details = data?.data || {};
  displayWordDetails(details);
};
const displayWordDetails = (word) => {
  const wordDetailsContainer = document.getElementById(
    "word-details-container",
  );
//   const synonyms = Array.isArray(word.synonyms) ? word.synonyms : [];
  wordDetailsContainer.innerHTML = `
  <div class="">
            <h3 class="font-bold text-lg" id="word-title">
              ${word.word || "No word"}  (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation || "N/A"})
            </h3>
          </div>
        <div class="">
            <h3 class="font-bold text-lg" id="word-meaning">Meaning:</h3>
            <p>${word.meaning || "No meaning found"}</p>
          </div>

           <div class="">
            <h3 class="font-bold text-lg" id="word-meaning">Examples:</h3>
            <p>${word.sentence || "No example found"}</p>
          </div>
          <div class="">
            <h3 class="font-bold text-lg" id="word-synonym">Synonym:</h3>
            <div class="">${createElemens(word.synonyms || [])}</div>
          </div>`

  const modal = document.getElementById("my_modal_5");
  modal.showModal();
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
        <button id="lesson-${lesson.level_no}" onclick="loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary w-52">
          <i class="fa-solid fa-book-open mr-2"></i> Lesson - ${lesson.level_no}
        </button>
        `;

    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();

window.loadLevelWord = loadLevelWord;
window.loadWordDetails = loadWordDetails;
