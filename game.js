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
        this.maxWidth = 0;

    }
    createMainText() {
        var t = [];
        let div = "";
        let p = ""
        let enter = 1; 
        let hieght = 0;
        let maxWidth = 0;
        fetch("words.txt")
            .then(function (res) {
                return res.text();
            })
            .then(function (data) {
                let textFromTxt = data.toString().split("###");
                let random = Math.floor(Math.random() * textFromTxt.length)
                
                let text = textFromTxt[parseInt(random)].split("\n")
                let word = ""
                let newText = []
                let height = 0;
                let enter = 0;
                for (let i = 0; i < text.length; i++) {
                    if (i != 0) {
                        if (text[i][0] == " ") {
                            let k = 0;
                            let bool = true;
                            while (bool) {
                                if (text[i][k] != " ") {
                                    let tab = ""
                                    for (let q = 0; q < k/4; q++) {
                                        tab += ">"
                                    }
                                    // let fontSize = getTextWidth(text[i], getCanvasFont(game.innerText[0]))
                                    if (text[i].length > maxWidth) {
                                        // const fontSize = getTextWidth(text[i], getCanvasFont(game.innerText[0]))
                                        // console.log(fontSize)
                                        maxWidth = text[i].length
                                    }
                                    newText.push(tab + text[i].slice(k).toString())
                                    bool = false
                                }
                                k+=1;
                            }
                        }
                        else if (text[i][0] != " ") {
                            if (text[i].length > maxWidth) {
                                maxWidth = text[i].length
                            }
                            newText.push(text[i].toString())
                        }
                        
                    }
                }
                console.log(maxWidth) 
                let index = 1;
                for (let i = 0; i < newText.length; i++) {
                    div = document.createElement("div");
                    div.setAttribute("id", "word");
                    if (newText[i].includes(">")) {
                        let q = -1
                        let index = []
                        while ((q = newText[i].indexOf(">", q + 1)) != -1) {
                            index.push(q)
                        }
                        // console.log(index)
                        div.style.left = `${2*index.length}em`
                    }
                    if (i != 0) {
                        div.style.top = `${1.5*enter}em`
                        enter +=1;
                    } else {
                        div.style.top = `${-1.5}em`
                        console.log(newText.length)

                    }
                    // console.log(1.5*enter)
                    let rect = window.getComputedStyle(div)
                    for (let k = 0; k < newText[i].length; k++) {
                        if (newText[i][k] != undefined && newText[i][k] != ">"&& newText[i][k] != "") {
                            // console.log(newText[i][k]) 
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
            // console.log(game.text.style.top)
            game.maxWidth = maxWidth;
            if (maxWidth >= 66) {
                game.text.style.width = `${1000+((maxWidth-66)*10)}px`
                game.typer.style.left = `${game.innerText[game.index].getBoundingClientRect().left}px`
            }
            console.log(newText.length)
            if (newText.length < 6) {
                game.text.style.top = "45%"
                game.typer.style.top = `${game.innerText[game.index].getBoundingClientRect().top}px`
                // game.typer.style.top = "50%"
            }
            // game.text.style.top = "40%"
            console.log("After ", enter)
            // game.text.style.top = `${}em`
            game.typer.style.left = `${game.innerText[game.index].getBoundingClientRect().left}px`
            // game.typer.style.top =
            // console.log(game.innerText[0].getBoundingClientRect())
            });
    }
    setUpAssets () {
        function resize() {
            game.language.style.top = `${game.window.top.split('px')[0]-70}px`
            game.typer.style.left = `${game.innerText[game.index].getBoundingClientRect().left}px`
            game.typer.style.top = `${game.window.top.split('px')[0]-35}px`
            game.restartTyperLeft = `${game.window.left.split('px')[0]-502}px`
            game.restartTyperTop = `${game.window.top.split('px')[0]-100}px`
            game.timer.style.top = `${game.window.top.split("px")[0]-138}px`;
            game.timer.style.left = `${game.window.left.split("px")[0]-500}px`

        }
        resize()
        window.addEventListener("resize", resize)
        // game.text.style.width = game.maxWidth*2
        // console.log(game.maxWidth)

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
function newLine (gameIndex, key) {
    let firstElemement = game.innerText[l].getBoundingClientRect();
    let top = firstElemement.top;
    let left = firstElemement.left;
    // console.log(game.innerText[gameIndex+1])
    let nextElemement = game.innerText[gameIndex+1].getBoundingClientRect();
    let nextTop = nextElemement.top;
    let nextLeft = nextElemement.left;
    if (top != nextTop) {
        if (key != " ") {
            game.typer.style.top = `${(nextTop-2)}px`
            game.typer.style.left = `${left}px`
            let i = game.index;
                // while (true) {
                //     // console.log(game.innerText[i+5].getBoundingClientRect().left)s
                //     // console.log(left)
                //     if (game.innerText[i].innerHTML != " ") {
                //         const space = getTextWidth(" ", getCanvasFont(game.innerText[i]));
                //         console.log(nextLeft + (space*4));
                //         game.typer.style.left = left + (space); 
                //         break
                //     }
                //     i+=1
                // }
            l = gameIndex+1
            return true
        }
    } else {
        return false
    }
}
// console.log(game.text)
let copy = animation.style.animation;
if (game.moveTyper === true ) {
    window.addEventListener("keydown", (e) => {
        animation.style.animation = "none";
        game.timer.style.opacity = "1";
        navbar.style.opacity = "0";
        game.language.style.opacity = "0";
        game.language.style.animationPlayState = "running";
        navbar.style.animationPlayState = "running";
        game.timer.style.animationPlayState = "running";
        keyPressed.push(e.key)
        game.typer.style.transitionDuration = "0s";
        let copy = game.typer.style.left;
        console.log("Tab", game.innerText[game.index].innerHTML)
        for (let i = 0; i < keyPressed.length; i++) {
            // console.log(keyPressed[i])
            if (keyPressed[i] == game.innerText[game.index].innerHTML) {
                const fontSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                game.innerText[game.index].style.color = "#dad9d8";
                game.innerText[game.index].style.opacity = "0.7";
                game.innerText[game.index].style.backgroundColor = "#373C3F"
                game.typer.style.left = `${windo.left.split('px')[0]-(-fontSize)}px`;
                game.index +=1;
                break;
            }
            else if (keyPressed[i] == "Backspace") {
                console.log(game.innerText[game.index-1].innerHTML)
                if (game.innerText[game.index-1].innerHTML != "&nbsp;") {
                    game.index -=1;
                    game.innerText[game.index].style.opacity = "1";
                    game.innerText[game.index].style.color = "#dad9d8";
                    const backSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                    game.typer.style.left = `${windo.left.split('px')[0]-(backSize)}px`;
                    break;
                }
            }
            else if (keyPressed[i] == " " && newLine(game.index, keyPressed[i]) == false) {
                if (game.innerText[game.index].innerHTML == "&nbsp;") {
                    // game.innerText[game.index].style.color = "#735454"
                    game.innerText[game.index].style.backgroundColor = "#373C3F"
                    // game.innerText[game.index].style.opacity = "0.7";
                    const space = getTextWidth(" ", getCanvasFont(game.innerText[game.index]));
                    game.typer.style.left = `${windo.left.split('px')[0]-(-space)}px`
                    game.index +=1;
                }
                break;
            }
            else if (keyPressed[i] == "Enter") {
                newLine(game.index, keyPressed[i])
                game.index +=1;
                let k = game.index-1;
                while (true) {
                    if (game.innerText[k+1].innerHTML != " ") {
                        game.index = k+1;
                        // console.log(game.innerText[k+1].innerHTML)
                        break;
                    }
                    k+=1
                }
                break;
            }
            else if (keyPressed[i] == "Tab" && (game.innerText[game.index-2].innerHTML == ":" || game.innerText[game.index-2].innerHTML == "{")) {
                // console.log(game.innerText[game.index-6].innerHTML)
                let i = game.index;
                while (true) {
                    if (game.innerText[i].innerHTML != " ") {
                        let left = game.typer.style.left
                        game.typer.style.left = `${left.split("px")[0]-(-45)}px`
                        game.index =i;
                        break;
                    }
                    i+=1
                }
                break;
            }
            // else if (keyPressed[i] == "Backspace" && game.innerText[game.index+1].innerHTML == ":") {
            //     // console.log(game.innerText[game.index-6].innerHTML)
            //     let i = game.index;
            //     while (true) {
            //         if (game.innerText[i].innerHTML != " ") {
            //             let left = game.typer.style.left
            //             game.typer.style.left = `${left.split("px")[0]-(-45)}px`
            //             game.index =i;
            //             break;
            //         }
            //         i+=1
            //     }
            //     break;
            // }
            else {
               if (keyPressed[i] != "Shift" && keyPressed[i] != "Enter" && keyPressed[i] != "Tab" && keyPressed[i] != "Backspace") {
                if (game.innerText[game.index].innerHTML != "&nbsp;") {
                    game.innerText[game.index].style.color = "#969696"
                    game.innerText[game.index].style.backgroundColor ="#735454"
                    const errorFontSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                    game.typer.style.left = `${windo.left.split('px')[0]-(-errorFontSize)}px`; 
                    game.index +=1;
                    break;  
                }
            }   
            }
            //  console.log("Tab", game.innerText[game.index-1].innerHTML)
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





