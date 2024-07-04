class Game {
    constructor() {
        this.text = document.getElementById("maintext");
        this.hiddenText = document.getElementById("hidden-text-top")
        this.window = window.getComputedStyle(this.text);
        this.language = document.getElementById("lang");
        this.typer = document.getElementById("typer");
        this.innerText = document.getElementsByTagName("p");
        this.timer = document.getElementById("timer");
        this.reset = document.getElementById("reset");
        this.WPM = document.getElementById("WPM");
        this.WPM_Num = document.getElementById("WPM-Num");
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
            game.text.style.left = "50%"
            game.typer.style.top = `${game.window.top.split('px')[0]-38}px`
            game.typer.style.left = `${game.innerText[game.index].getBoundingClientRect().left}px`
            if (maxWidth >= 66) {
                game.text.style.width = `${1000+((maxWidth-66)*10)}px`
                game.typer.style.left = `${game.innerText[game.index].getBoundingClientRect().left}px`
            }
            console.log(newText.length)
            if (newText.length <= 10) {
                // console.log(game.text.style.getBoundingClientRect())
                game.text.style.top = "49%"
                game.text.style.bottom = "50%"
                game.text.style.left = "50%"
                // game.language.style.top = 
                game.typer.style.top = `${game.window.top.split('px')[0]-40}px`
                game.language.style.top = `${game.typer.style.top.split("px")[0]-70}px`
            }
            // game.text.style.top = "40%"
            // console.log("After ", enter)
            // game.text.style.top = `${}em`
            // console.log(game.text.getBoundingClientRect())fopr
            // game.typer.style.top =
            // console.log(game.innerText[0].getBoundingClientRect())
            });
    }
    setUpAssets () {
        function resize() {
            game.language.style.top = `${game.window.top.split('px')[0]-70}px`
            game.typer.style.left =  `${game.window.top.split('px')[0]-40}px`
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
document.body.style.overflow = 'hidden';

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

let enter = 0;
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
            game.typer.style.left = `${left}px`
            if (nextLeft < left) {
                game.typer.style.left = `${nextLeft}px`
                // console.log("NewLine1")
            }
            if (enter >= 1) {
                game.text.style.transition = "all 28ms linear"
                game.typer.style.top = `${game.innerText[gameIndex+1].getBoundingClientRect().top}px`
                // console.log("NewLine2")
                // game.text.style.top = `${game.window.top.split('px')[0]-35}px`
                // game.typer.style.top = `${game.typer.style.top - (-game.typer.getBoundingClientRect().height)}`
            }
            else {
                // console.log(game.innerText[gameIndex+1].getBoundingClientRect(), game.typer.style.top, nextTop)
                // game.innerText[gameIndex+1].innerHTML
                game.typer.style.top = `${game.innerText[gameIndex+1].getBoundingClientRect().top}px`
                // console.log("NewLine")
            }
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
            enter += 1;
            l = gameIndex+1
            return true
        }
    } else {
        return false
    }
}
function TabTrue(gameIndex) {
    if (gameIndex > 0) {
        if ((game.innerText[gameIndex].getBoundingClientRect().left - parseInt(game.typer.style.left.split("px")[0])) >= 5) {
            return false
        } else {
            return true;
        }
    } else {
        return true
    }
    
}
window.addEventListener("keydown", (e) => {
    if (e.key == "Tab"){
        e.preventDefault()
        game.reset.focus()
    }
    // if (game.reset.on)
    
})
// console.log(game.text)
let tabBool = true
let copy = animation.style.animation;
var sec = null;
let timer = null
// let timer = null;
game.reset.addEventListener("keydown", (e) => {
    // console.log("hello")
    if (e.key == "Enter") {
        console.log("done")
        for (let i = 0; i < game.innerText.length-4; i++) {
            game.innerText[i].innerHTML = ""
        }
        let child = game.text.lastElementChild;
        while (game.text.lastElementChild) {
            game.text.removeChild(game.text.lastElementChild);
        }
        clearInterval(timer);
        game.createMainText();
        game.setUpAssets();
        game.typer.style.animationPlayState = "running"
        game.timer.style.opacity = "0";
        navbar.style.opacity = "1";
        game.language.style.opacity = "1";
        game.language.style.animationPlayState = "running";
        navbar.style.animationPlayState = "running";
        game.timer.style.animationPlayState = "running";
        game.WPM.style.opacity = "1";
        game.WPM_Num.style.opacity = "1";
        startGame = true;
        game.timer.innerHTML = "15"
        game.index = 0;
        game.text.style.opacity = "1";
        game.WPM.style.opacity = "0";
        game.WPM_Num.style.opacity = "0";
        game.typer.style.opacity = "1"
        game.reset.blur()
        tabBool = true
    }
})
window.addEventListener("keydown", (e) => {
    if (game.index == 0 && (e.key != "Enter" && e.key != "Shift" && e.key != "Control" && e.key != "F5")) {
        // game.timer.innerHTML = "15"
        if (startGame == true) {
           var sec = new Date();
            //sec  = sec.getTime();
            let interval = 1000;
            sec.setSeconds(sec.getSeconds() + 15);
            timer = setInterval(function () {
                this.interval = 1000;
                let now = new Date();
                let expected = (Math.round((sec - now.getTime() - this.interval)/1000)*1000)
                let t = (Math.round((sec - now.getTime())/1000)*1000);
                // console.log(t, expected)
                let seconds = Math.floor((t%(1000*60))/1000)
                
                game.timer.innerHTML = seconds.toString()
                // if (--timer < 0) {
                //     timer = duration
                // }
                if (seconds <= 0) {
                    clearInterval(timer);
                    game.WPM.style.opacity = "1";
                    game.WPM_Num.style.opacity = "1";
                    game.WPM.innerHTML = `Wpm: ${((game.index/5)*4)}`
                    game.timer.style.opacity = "0";
                    navbar.style.opacity = "0";
                    game.language.style.opacity = "0";
                    game.text.style.opacity = "0";
                    game.typer.style.opacity = "0"
                    // game.reset.style.opacity = "0"
                }
                
            }, 1000);
        }
        startGame = false;
    }
}) 
let timer1 = null;
let timeKey = []
let transitiong = false
game.typer.addEventListener("transitionend", () => {
    transitiong = false
    // console.log(transitiong)
})
game.typer.addEventListener("transitionstart", ()=> {
    transitiong = true;
    // console.log(transitiong)
})
function timeToClose(list) {
    if (list.length > 1) {
        // console.log(list[1], list[0])
        return (truncateDecimals((list[1] - list[0])*1000)/1000) < 0.010
    } else {
        return true
    }
    
}
truncateDecimals = function (number) {
    return Math[number < 0 ? 'ceil' : 'floor'](number);
}
let copyTyper = null;
// navbar.style.opacity = "1";
if (game.moveTyper === true ) {
    window.addEventListener("keydown", (e) => {
        if (e.key != "Control" && e.key != "F5") {

        
        let timePress = new Date()
        keyPressed.push(e.key)
        console.log(e.key)
        timeKey.push(parseFloat(timePress.getSeconds()+ "."+timePress.getMilliseconds()))
        if (game.index == 0 && e.key != "Tab" && e.key != "Enter") {
            animation.style.animationPlayState = "paused"
            game.typer.style.opacity = "1"
            game.timer.style.opacity = "1";
            navbar.style.opacity = "0";
            game.language.style.opacity = "0";
            game.language.style.animationPlayState = "running";
            navbar.style.animationPlayState = "running";
            game.timer.style.animationPlayState = "running";
            tabBool = true
            // game.typer.style.transitionDuration = "0s";
        }
        // let copy = game.typer.style.left;
            // if (e.key == "Tab" && game.index == 0){
            //     e.preventDefault()
            //     game.reset.focus()
            // }
        // console.log("Tab", game.innerText[game.index].innerHTML)
            // console.log(e.key)
            if (e.key == game.innerText[game.index].innerHTML && tabBool) {
                const fontSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                game.innerText[game.index].style.color = "#dad9d8";
                game.innerText[game.index].style.opacity = "0.7";
                game.innerText[game.index].style.backgroundColor = "#373C3F"
                game.typer.style.left = `${windo.left.split('px')[0]-(-fontSize)}px`;
                game.index +=1;
            }
            else if (e.key == "Backspace") {
                // console.log(game.innerText[game.index-1].innerHTML)
                if (game.innerText[game.index-1].innerHTML != "&nbsp;") {
                    game.index -=1;
                    game.innerText[game.index].style.opacity = "1";
                    game.innerText[game.index].style.color = "#dad9d8";
                    const backSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                    game.typer.style.left = `${windo.left.split('px')[0]-(backSize)}px`;
                    
                }
            }
            else if (e.key == " " && newLine(game.index, e.key) == false) {
                if (game.innerText[game.index].innerHTML == "&nbsp;") {
                    // game.innerText[game.index].style.color = "#735454"
                    game.innerText[game.index].style.backgroundColor = "#373C3F"
                    // game.innerText[game.index].style.opacity = "0.7";
                    const space = getTextWidth(" ", getCanvasFont(game.innerText[game.index]));
                    game.typer.style.left = `${windo.left.split('px')[0]-(-space)}px`
                    game.index +=1;
                }
            }
            else if (e.key == "Enter") {
                newLine(game.index, e.key)
                game.index +=1;
                let k = game.index-1;
                // while (true) {
                //     if (game.innerText[k+1].innerHTML != " ") {
                //         game.index = k+1;
                //         // console.log(game.innerText[k+1].innerHTML)
                //     }
                //     k+=1
                // }
                
            }
            else if (e.key == "Tab" && tabBool == false && game.index !=0) {
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
                
            }
            // else if (e.key == "Backspace" && game.innerText[game.index+1].innerHTML == ":") {
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
               if (e.key != "Shift" && e.key != "Enter" && e.key != "Tab" && e.key != "Backspace"){
                if (game.innerText[game.index].innerHTML != "&nbsp;") {
                    game.innerText[game.index].style.color = "#969696"
                    game.innerText[game.index].style.backgroundColor ="#735454"
                    // if (timeToClose(timeKey) === false) {
                      const errorFontSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                        game.typer.style.left = `${windo.left.split('px')[0]-(-errorFontSize)}px`; 
                        game.index +=1;  
                    // } else {
                        // for (let i in timeKey) {
                            // const errorFontSize = getTextWidth(game.innerText[game.index].innerHTML, getCanvasFont(game.innerText[game.index]));
                            // game.typer.style.left = `${windo.left.split('px')[0]-(-errorFontSize)}px`; 
                            // game.index +=1;
                        // }
                    // }
                    
                      
                }
            }   
            }
        }
            //  console.log("Tab", game.innerText[game.index-1].innerHTML)
            if (game.index > 0) {
                tabBool = TabTrue(game.index)
            }
            
            // console.log(tabBool)
            const buffer = getTextWidth(game.innerText[game.index-1].innerHTML, getCanvasFont(game.innerText[game.index-1]));
            copyTyper = `${windo.left.split('px')[0]-(-buffer)}px`; 
            if (game.innerText[game.index].getBoundingClientRect().left !=  copyTyper) {
                game.typer.style.left = `${game.innerText[game.index].getBoundingClientRect().left}px`; 
            }
            // console.log(copyTyper, game.innerText[game.index].getBoundingClientRect().left)
            
        
        
    });
}
window.addEventListener("keyup", (e) =>{
    timeKey = [];
    // console.log(timeKey)
    // if (keyPressed.includes("Tab") && keyPressed.includes("Enter")) {
    //     for (let i = 0; i < game.innerText.length-4; i++) {
    //         game.innerText[i].innerHTML = ""
    //     }
    //     let child = game.text.lastElementChild;
    //     while (game.text.lastElementChild) {
    //         game.text.removeChild(game.text.lastElementChild);
    //       }
    //     clearInterval(timer);
    //     game.createMainText();
    //     game.setUpAssets();
    //     animation.style.animation = "none";
    //     game.timer.style.opacity = "0";
    //     navbar.style.opacity = "1";
    //     game.language.style.opacity = "1";
    //     game.language.style.animationPlayState = "running";
    //     navbar.style.animationPlayState = "running";
    //     game.timer.style.animationPlayState = "running";
    //     startGame = true;
    //     game.timer.innerHTML = "15"
    //     game.index = 0;
    
    if (timeKey.length > 1 ) {
        // console.log(timeKey, truncateDecimals((timeKey[1] - timeKey[0])*1000)/1000)
        if ((truncateDecimals((timeKey[1] - timeKey[0])*1000)/1000) < 0.010) {
            // for (let i = 0; i >= 2; i++) {
                console.log(timeKey, truncateDecimals((timeKey[1] - timeKey[0])*1000)/1000)
                game.typer.style.transitionDuration = "0s"
                const buffer = getTextWidth(game.innerText[game.index+1].innerHTML, getCanvasFont(game.innerText[game.index+1]));
                game.typer.style.left = `${windo.left.split('px')[0]-(-buffer)}px`; 
            // }
            
            
        }
        // game.typer.style.transitionDuration = "23ms"
        // if(timeKey[1] - timeKey[0] < 0.010) {
        //     const buffer = getTextWidth(game.innerText[game.index-i].innerHTML, getCanvasFont(game.innerText[game.index-i]));
        //     game.typer.style.left = `${windo.left.split('px')[0]-(-buffer)}px`; 
        // }
    }
    keyPressed = [];
    
});
let flickerKeyFrame = new KeyframeEffect(
    game.typer,
    [{opacity: [1, 0, 1]}],
    {duration: 30, iterations: 3}
);
// console.log(game.allText);
// console.log(innerText[0]);
// for (const value in innerText.values()) {
//     console.log(value);as
// }
// game.text.children.style.fontSize = '25px';





