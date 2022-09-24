let quote = document.querySelector(".quote");
let author = document.querySelector(".author");
let gen = document.querySelector(".gen");
let togg = document.querySelector(".togg");
let down = document.querySelector(".down");
let quotecon = document.querySelector(".quotecon");
let quoteTxt = {
  en: "",
  sr: "",
};
let currTxt = "en";
let quoteAPI = "https://programming-quotes-api.herokuapp.com/Quotes/random";

async function generateQuote() {
  let res = await fetch(quoteAPI);
  let json = await res.json();
  quote.textContent = `"${json.en}"`;
  author.textContent = `- ${json.author}`;
  quoteTxt.en = json.en;
  quoteTxt.sr = "";
  currTxt = "en";
}

async function toggleLanguage() {
  if (currTxt !== "en") {
    quote.textContent = `"${quoteTxt.en}"`;
    currTxt = "en";
    return;
  }
  if (quoteTxt.sr !== "") {
    quote.textContent = `"${quoteTxt.sr}"`;
    currTxt = "sr";
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "100e891407msha115ea8e9402e94p1edb54jsnab3266b8b56e",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    body: `[{"Text":"${quoteTxt.en}"}]`,
  };

  let res = await fetch(
    "https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=sr&api-version=3.0&profanityAction=NoAction&textType=plain",
    options
  );
  let json = await res.json();
  quoteTxt.sr = json[0].translations[0].text;
  quote.textContent = `"${quoteTxt.sr}"`;
  currTxt = "sr";
}

function downloadImage() {
  html2canvas(quotecon).then((canvas) => {
    let quoteImage = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "quote.png";
    link.href = "data:" + quoteImage;
    link.click();
  });
}

generateQuote();
