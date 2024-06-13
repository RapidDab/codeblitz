class Game {
    constructor() {
        this.text = document.getElementById("maintext");
        this.window = window.getComputedStyle(this.text);
        this.language = document.getElementById("lang");
        this.typer = document.getElementById("typer");
        this.innerText = document.getElementsByTagName("p");
        this.timer = document.getElementById("timer");
        this.moveTyper = true;
        this.index =0;
        this.restartTyperLeft = this.typer.style.left;
        this.restartTyperTop = this.typer.style.top;

    }
    createMainText() {
        var t = [];
        let div = "";
        let p = ""
        let enter = 1; 
        let hieght = 0;
        fetch("words.txt")
            .then(function (res) {
                return res.text();
            })
            .then(function (data) {
                let text = data.toString().split("\n");
                let word = ""
                let newText = []
                let height = 0;
                let enter = 0;
                for (let i = 0; i < text.length; i++) {
                    if (text[i].includes("#") == true) {
                        for (let k = 0; k < text[i].split(" ").length; k++) {
                            newText.push(text[i].split(" ")[k])
                        }
                    } 
                    else if (text[i].includes("for")|| text[i].includes(">")) {
                        newText.push(text[i].toString())
                    }
                    word += text[i]
                } 
                console.log(newText)
                let index = 1;
                for (let i = 0; i < newText.length; i++) {
                    div = document.createElement("div");
                    div.setAttribute("id", "word");
                    if (newText[i] == "#") {
                        index = i + text[i].split(" ").length;
                    }
                    if (index > i){
                        div.style.position = "static";
                        div.style.display = "inline-block"
                    }
                    else {
                        height += 26;
                        enter +=1;
                    }
                    if (newText[i].includes(">")) {
                        div.style.left = "2em"
                    }
                    if (i != 0) {
                        div.style.top = `${1.5*enter}em`
                    }
                    let rect = window.getComputedStyle(div)
                     
                    for (let k = 0; k < newText[i].length; k++) {
                        if (newText[i][k] != undefined && newText[i][k] != ">") {
                           p = document.createElement("p");
                            p.style.display = "inline";
                            p.innerHTML = newText[i][k];
                            div.appendChild(p) 
                        }
                        // if (text[i][k] != undefined) {
                        //     p = document.createElement("p");
                        //      p.style.display = "inline";
                        //      p.innerHTML = text[i][k];
                        //      div.appendChild(p) 
                        //  }
                        
                    }
                    
                    p = document.createElement("p");
                    p.style.display = "inline";
                    p.innerHTML = "&nbsp;";
                    div.appendChild(p)
                    game.text.appendChild(div)
                }
            game.index = 0;
            game.innerText = document.getElementsByTagName("p");
            console.log(game.text.style.top)
            });
    }
    setUpAssets () {
        function resize() {
            game.language.style.top = `${game.window.top.split('px')[0]-70}px`
            game.typer.style.left = `${game.window.left.split('px')[0]-502}px`
            game.typer.style.top = `${game.window.top.split('px')[0]-15}px`
            game.restartTyperLeft = `${game.window.left.split('px')[0]-502}px`
            game.restartTyperTop = `${game.window.top.split('px')[0]-100}px`
            game.timer.style.top = `${game.window.top.split("px")[0]-138}px`;
            game.timer.style.left = `${game.window.left.split("px")[0]-500}px`

        }
        resize()
        window.addEventListener("resize", resize)
    }
}

const game = new Game();

game.createMainText();
game.setUpAssets();
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  
  function getCssStyle(element, prop) {
      return window.getComputedStyle(element, null).getPropertyValue(prop);a 
  }
  
  function getCanvasFont(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
    
    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }

function getTextHeight(text, font) {
// re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.height;
}

function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);a 
}

function getCanvasFont(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}
let windo = window.getComputedStyle(game.typer);
let keyPressed = [];
let restartKeys = ['Tab', 'Enter'];
let l = 0
const animation = document.querySelector("div.animation");
let navbar = document.getElementById("navbar");
let startGame = true;
// animation.addEventListener("animationiteration", () => {
//     console.log("hello")
//     animation.animationPlayState = "paused"
// });
let sec = 15;
function timer () {
    setInterval(() => {
        game.timer.innerHTML = sec.toString();
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}
let copy = animation.style.animation;
if (game.moveTyper === true ) {
    window.addEventListener("keydown", (e) => {
        console.log(game.timer.style.opacity)
        animation.style.animation = "none";
        game.timer.style.opacity = "1";
        navbar.style.opacity = "0";
        game.language.style.opacity = "0";
        game.language.style.animationPlayState = "running";
        navbar.style.animationPlayState = "running";
        game.timer.style.animationPlayState = "running";
        console.log(game.timer.innerHTML)
        keyPressed.push(e.key)
        game.typer.style.transitionDuration = "0s";
        let copy = game.typer.style.left;
        for (let i = 0; i < keyPressed.length; i++) {
            if (keyPressed[i] == game.innerText[game.index].innerHTML) {
                const fontSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                game.innerText[game.index].style.color = "#dad9d8";
                game.innerText[game.index].style.opacity = "0.7";
                game.typer.style.left = `${windo.left.split('px')[0]-(-fontSize)}px`;
                game.index +=1;
                break;
            }
            else if (keyPressed[i] == "Backspace") {
                if (game.innerText[game.index-1].innerHTML != "&nbsp;") {
                    game.index -=1;
                    game.innerText[game.index].style.opacity = "1";
                    game.innerText[game.index].style.color = "#dad9d8";
                    const backSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                    game.typer.style.left = `${windo.left.split('px')[0]-(backSize)}px`;
                    break;
                }
            }
            else if (keyPressed[i] == " ") {
                if (game.innerText[game.index].innerHTML == "&nbsp;") {
                    game.innerText[game.index].style.color = "#735454"
                    game.innerText[game.index].style.opacity = "0.7";
                    const space = getTextWidth(" ", getCanvasFont(game.innerText[game.index]));
                    game.typer.style.left = `${windo.left.split('px')[0]-(-space)}px`
                    game.index +=1;
                    let firstElemement = game.innerText[l].getBoundingClientRect();
                    let top = firstElemement.top;
                    let left = firstElemement.left;

                    let nextElemement = game.innerText[game.index+1].getBoundingClientRect();
                    let nextTop = nextElemement.top;
                    let nextLeft = nextElemement.left;
                    if (top != nextTop) {
                        game.typer.style.top = `${(nextTop-2)}px`
                        game.typer.style.left = `${left}px`
                        l = game.index;
                    }
                }
                break;
                
            }
            if (game.innerText[game.index].innerHTML != "&nbsp;") {
                game.innerText[game.index].style.color = "#735454"
                const errorFontSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                game.typer.style.left = `${windo.left.split('px')[0]-(-errorFontSize)}px`; 
                game.index +=1;
                break;  
            }
                  
            }
            keyPressed = [];
            if (JSON.stringify(keyPressed) == JSON.stringify(restartKeys)){
                for(let i = 0; i < game.innerText.length-4; i++) {
                    game.innerText[i].innerHTML = "";
                }
                game.createMainText();
                game.typer.style.left = game.restartTyperLeft
                game.typer.style.top = game.restartTyperTop
                game.setUpAssets()
            }
        
        
    });
}
window.addEventListener("keypress", () => {
    if (startGame == true) {
        console.log("hello")
        timer();
    }
    startGame = false;
    
})
let flickerKeyFrame = new KeyframeEffect(
    game.typer,
    [{opacity: [1, 0, 1]}],
    {duration: 30, iterations: 3}
);
window.addEventListener("keyup", (e) => {
    // keyPressed = [];
    setTimeout(() => {
        animation.style.animation = copy;
    }, 1000)
})
// console.log(game.allText);
// console.log(innerText[0]);
// for (const value in innerText.values()) {
//     console.log(value);as
// }
// game.text.children.style.fontSize = '25px';





