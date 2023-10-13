let dataRamdon : string [] = [];
let dataNew : string [] = [];

export const App = async () => {
    const data = await getData('/src/assets/json/words.json');
    const containerWords = document.querySelector('#container-words');
    dataRamdon = shuffleArray(data);
    buildWordList(dataRamdon, containerWords!);

    const inputElement = document.querySelector('#text-word')!;

    inputElement.addEventListener('input', (e) => {
        if (e.target instanceof HTMLInputElement) {
            const valor = e.target.value;
            if(valor) {
                checkWord(valor)
            }
        }
    })
}

const nextWord = () => {
    const containerWords = document.querySelector('#container-words');
    const firstElement = document.querySelector('.first-item-class');

    if (firstElement) {
        
        firstElement.classList.remove('first-item-class');
        firstElement.nextElementSibling?.classList.add('first-item-class');
        
        if (dataNew.length === 0) {
            dataNew = dataRamdon.filter((word, index) => index !== 0);
        }else {
            dataNew = dataNew.filter((word, index) => index !== 0);
        }
        buildWordList(dataNew, containerWords!)
    }
}

const cleanInput = () => {
    const input : HTMLInputElement = document.querySelector('#text-word')!;
    input.value = '';
}

const checkWord = (word : string) => {
    debugger
    const actualWord = dataNew.length !== 0 ? dataNew[0] : dataRamdon[0];

    if(word === actualWord) {
        nextWord();
        setTimeout(() => {
            cleanInput(); 
        }, 200);
    }}

const getData = async (url : string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const buildWordList = (data : string [], containerWords : Element) => {
    const wordListItems = data.map((word, index) => {
    const isFirstElement = index === 0;
    const additionalClass = isFirstElement ? 'first-item-class' : '';

    return `<li class="list-group-item word ${additionalClass}" style="margin:3px;" data-name="${word}">${word}</li>`;
}).join('');
    containerWords.innerHTML = wordListItems;
}

const shuffleArray = (array : any [] )=> {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

