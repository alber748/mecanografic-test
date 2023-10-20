import { chronometerIsRunning, counterErrors, counterSuccess, counts, initChronometer } from "./counter";

let dataRamdon : string [] = [];
let dataNew : string [] = [];

let controls = {
    errors: false,
    success: false,
}

export const clearApp = () => {
    const containerWords = document.querySelector('#container-words');

    counts.errors = 0;
    counts.success = 0;
    counts.complete = 0;
    counts.pulsaciones = 0;

    dataNew = [];
    dataRamdon = shuffleArray(dataRamdon);
    buildWordList(dataRamdon, containerWords!);

    const input : HTMLInputElement = document.querySelector('#text-word')!;
    input.disabled = false;

    const result = document.querySelector('#results')!;
    result.innerHTML = '';

    const cronometro : HTMLElement = document.getElementById("cronometro")!;
    cronometro.textContent = '1:00';

    controls.errors = false;
    controls.success = false;
}

export const App = async () => {
    const data = await getData('/src/assets/json/words.json');
    const containerWords = document.querySelector('#container-words');
    dataRamdon = shuffleArray(data);
    buildWordList(dataRamdon, containerWords!);

    const inputElement = document.querySelector('#text-word')!;

    inputElement.addEventListener('input', (e) => {

        if (e.target instanceof HTMLInputElement) {
            const valor = e.target.value;
            counts.pulsaciones += 1;
            const firstElement = document.querySelector('.first-item-class');
            if (valor && valor !== ' ') {
                if(valor.includes(' ')) {
                    nextWord(firstElement as HTMLElement);

                    if(!chronometerIsRunning){
                        initChronometer();
                    }

                    cleanInput();
                }else {
                    checkWord(valor);
                }
            }else {
                firstElement?.classList.remove('correct');
                firstElement?.classList.remove('error');
                cleanInput();
            }
        }
    });

    const button = document.querySelector('#clearBtn')!;

    button.addEventListener('click', () => {
        clearApp();
    })
}

const nextWord = (firstElement : HTMLElement) => {

    counts.complete += 1;
    const containerWords = document.querySelector('#container-words');

    if (controls.success) {
        counterSuccess();
        controls.success = false;
    }

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

    const firstElement = document.querySelector('.first-item-class');
    const actualWord = dataNew.length !== 0 ? dataNew[0] : dataRamdon[0];

    if(actualWord.startsWith(word)) {
        if(actualWord === word) {
            controls.success = true;
        }
    firstElement?.classList.remove('error');
    firstElement?.classList.add('correct');
    } else {
        firstElement?.classList.remove('correct');
        firstElement?.classList.add('error');
        counterErrors();
    }
}

const getData = async (url : string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const buildWordList = (data : string [], containerWords : Element) => {

    if(data.length < 90) {
        dataNew = data.concat(dataRamdon);
        console.log(data)
    }
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

