const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const loadLevelWord = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => displayWord(data.data));
};

const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white py-10 text-center px-5 rounded-xl space-y-4">
      <h2>${word.word}</h2>
      <p>Meaning
        <span class="font-semibold">${word.meaning}</span>
        <div>${word.pronunciation}</div>
        <div class="flex justify-between items-center ">
          <button class="bg-blue hover:bg-[#85afed10] btn btn-primary"> <i class="fa-solid fa-info-circle"></i>
          </button>

        <button class="bg-blue hover:bg-[#85afed10] btn btn-primary "><i class="fa-solid fa-volume-high"></i> </button>
        </div>
      </p>

     </div>
   `;

    wordContainer.appendChild(card);
  });
};
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
        <button onclick="loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary w-52">
          <i class="fa-solid fa-book-open mr-2"></i> Lesson - ${lesson.level_no}
        </button>
        `;

    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
