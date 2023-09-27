const fromText = document.querySelector(".form-text");
const toText = document.querySelector(".to-text")
selectTag = document.querySelectorAll("select");
exchangeIcon = document.querySelector(".exchange");
translateBtn = document.querySelector("button");
icons = document.querySelectorAll(".row i");

//function start....
selectTag.forEach((tag , id ) => {
    for (const country_code in countries) {
        // selecting english by default as FROM language and urdu as To language
        let selected;
         if(id == 0 && country_code == "en-GB"){
            selected = "selected";
         }else if(id == 1 && country_code == "ur-PK"){
            selected = "selected";
         }
        let option = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);  //Adding options tag inside select tag
    }
});

//exchange button function.....
exchangeIcon.addEventListener("click",() => {
      let tempText = fromText.value;
      tempLang = selectTag[0].value;
      fromText.value = toText.value;
      selectTag[0].value = selectTag[1].value;
      toText.value = tempText;
      selectTag[1].value = tempLang;
});


//translation funcnalities.....
translateBtn.addEventListener("click",() => {
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    //Import URL for translate
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        // console.log(data);
        toText.value = data.responseData.translatedText;
    });
});
//let'a add the functinalities of voice and copy 
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
      if(target.classList.contains("fa-copy")){
        if(target.id == "from"){
           navigator.clipboard.writeText(fromText.value);
        }else{
           navigator.clipboard.writeText(toText.value);
        }
      }else{
         let utterance;
        if(target.id == "from"){
            utterance = new SpeechSynthesisUtterance(fromText.value);
             utterance.lang = selectTag[0].value;
         }else{
            utterance = new SpeechSynthesisUtterance(toText.value);
             utterance.lang = selectTag[1].value;
         }
         speechSynthesis.speak(utterance);
      }
    });
})

