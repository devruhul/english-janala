// get the button and add a click event listener

const loadLessonsBtn = () => {
  const button = document.getElementById("load-lessons-btn");
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayLessons(data.data);
    });
};
loadLessonsBtn();

// display the data in the ui
const displayLessons = (lessons) => {
  const lessonsContainer = document.getElementById("lessons-container");
  const lessonsList = document.getElementById("lessons-list");
  lessons.map((lesson) => {
    const lessonDiv = document.createElement("div");
    lessonDiv.classList.add("lesson");
    lessonDiv.innerHTML = ` <h3>${lesson.name}</h3> <p>${lesson.description}</p> `;
    lessonsList.appendChild(lessonDiv);
  });
};
