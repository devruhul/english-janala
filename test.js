const createElemens = (arr) => {
    const htmlElement = arr.map(el => `<span>${el}</span>`);
    console.log(htmlElement.join(" "));
};

const synonyms = ["hello", "hi", "hey"];
createElemens(synonyms);