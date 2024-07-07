class Game {
    constructor() {
        this.text = document.getElementById("maintext");
        this.hiddenText = document.getElementById("hidden-text-top")
        this.window = window.getComputedStyle(this.text);
        this.language = document.getElementById("lang");
        this.typer = document.getElementById("typer");
        this.typerCss = window.getComputedStyle(this.typer)
        this.innerText = document.getElementsByTagName("p");
        this.timer = document.getElementById("timer");
        this.reset = document.getElementById("reset");
        this.WPM = document.getElementById("WPM");
        this.WPM_Num = document.getElementById("WPM-Num");
        this.animation = document.querySelector("div.animation");
        this.navbar = document.getElementById("navbar");
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
                                    if (text[i].length > maxWidth) {
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
                        div.style.left = `${2*index.length}em`
                    }
                    if (i != 0) {
                        div.style.top = `${1.5*enter}em`
                        enter +=1;
                    } else {
                        div.style.top = `${-1.5}em`
                        console.log(newText.length)

                    }
                    let rect = window.getComputedStyle(div)
                    for (let k = 0; k < newText[i].length; k++) {
                        if (newText[i][k] != undefined && newText[i][k] != ">"&& newText[i][k] != "") {
                           p = document.createElement("p");
                            p.style.display = "inline";
                            p.innerHTML = newText[i][k];
                            div.appendChild(p) 
                        }
                        
                    }
                    
                    p = document.createElement("p");
                    p.style.display = "inline";
                    p.innerHTML = "&nbsp;";
                    div.appendChild(p)
                    game.text.appendChild(div)
                }
            // text.index = 0;
            game.innerText = document.getElementsByTagName("p");
            game.maxWidth = maxWidth;
            game.text.style.left = "50%"
            game.typer.style.top = `${game.window.top.split('px')[0]-38}px`
            game.typer.style.left = `${game.innerText[0].getBoundingClientRect().left}px`

            if (maxWidth >= 66) {
                game.text.style.width = `${1000+((maxWidth-66)*10)}px`
                game.typer.style.left = `${game.innerText[0].getBoundingClientRect().left}px`
            }
            console.log(newText.length)
            if (newText.length <= 10) {
                game.text.style.top = "49%"
                game.text.style.bottom = "50%"
                game.text.style.left = "50%"
                game.typer.style.top = `${game.window.top.split('px')[0]-40}px`
                game.language.style.top = `${game.typer.style.top.split("px")[0]-70}px`
            }
            });
    }
    setUpAssets () {
        // function resize() {
            // game.language.style.top = `${game.window.top.split('px')[0]-70}px`
            // game.typer.style.left =  `${game.window.left.split('px')[0]-40}px`
            // game.typer.style.top = `${game.window.top.split('px')[0]-35}px`
            // game.restartTyperLeft = `${game.window.left.split('px')[0]-502}px`
            // game.restartTyperTop = `${game.window.top.split('px')[0]-100}px`
            // game.timer.style.top = `${game.window.top.split("px")[0]-138}px`;
            // game.timer.style.left = `${game.window.left.split("px")[0]-500}px`

            game.language.style.top = game.changePixelValue(game.window.top, 70)
            // game.typer.style.left = game.changePixelValue(game.window.left, 40)\
            game.typer.style.left = `${game.innerText[text.index].getBoundingClientRect().left}px`
            game.typer.style.top = `${game.window.top.split('px')[0]-38}px`
            game.restartTyperLeft = game.changePixelValue(game.window.left, 502)
            game.restartTyperTop = game.changePixelValue(game.window.top, 100)
            game.timer.style.top = game.changePixelValue(game.window.top, 138)
            game.timer.style.left = game.changePixelValue(game.window.left, 500)
        // }
        // resize()
    }
    pixelToNum(elementAtrribute) {
        return elementAtrribute.split("px")[0];
    }
    changePixelValue(elementAtrribute, num) {
        return `${elementAtrribute.split("px")[0]-num}px`
    }
    resetAssets() {
        game.createMainText();
        game.setUpAssets();
        game.typer.style.animationPlayState = "running"
        game.timer.style.opacity = "0";
        game.navbar.style.opacity = "1";
        game.language.style.opacity = "1";
        game.language.style.animationPlayState = "running";
        game.navbar.style.animationPlayState = "running";
        game.timer.style.animationPlayState = "running";
        game.WPM.style.opacity = "1";
        game.WPM_Num.style.opacity = "1";
        startGame = true;
        game.timer.innerHTML = "15"
        text.index = 0;
        game.text.style.opacity = "1";
        game.WPM.style.opacity = "0";
        game.WPM_Num.style.opacity = "0";
        game.typer.style.opacity = "1"
        game.reset.blur()
        tabBool = true
    }
    resetOpacity() {
        game.WPM.style.opacity = "1";
        game.WPM_Num.style.opacity = "1";
        game.WPM.innerHTML = `Wpm: ${((text.index/5)*4)}`
        game.timer.style.opacity = "0";
        game.navbar.style.opacity = "0";
        game.language.style.opacity = "0";
        game.text.style.opacity = "0";
        game.typer.style.opacity = "0"
    }
    switchWindowes() {
        game.animation.style.animation = "none";
        game.timer.style.opacity = "1";
        game.navbar.style.opacity = "0";
        game.language.style.opacity = "0";
        game.language.style.animationPlayState = "running";
        game.navbar.style.animationPlayState = "running";
        game.timer.style.animationPlayState = "running";
        game.animation.style.animationPlayState = "paused"
        tabBool = true
    }

}
class Text extends Game {
    constructor() {
        super();
        this.defaultColor = "#dad9d8"
    }
    getLeft() {
        return this.text.style.left;
    }
    getInnerText(index) {
        return this.innerText[index];
    }
    getInnerTextCor(gameElement) {
        return gameElement.getBoundingClientRect()
    }
    getInnerTextTop(gameElement) {
        return gameElement.getBoundingClientRect().top;
    }
    getInnerTextLeft(gameElement) {
        return gameElement.getBoundingClientRect().left;
    }
    getTextWidth(text, font) {
        const canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }
    getCssStyle(element, prop) {
        return window.getComputedStyle(element, null).getPropertyValue(prop);
    }
    
    getCanvasFont(el = document.body) {
    const fontWeight = this.getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = this.getCssStyle(el, 'font-size') || '16px';
    const fontFamily = this.getCssStyle(el, 'font-family') || 'Times New Roman';
    
    return `${fontWeight} ${fontSize} ${fontFamily}`;
    }

    getTextHeight(text, font) {
        const canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.height;
    }
    
    getCssStyle(element, prop) {
        return window.getComputedStyle(element, null).getPropertyValue(prop);a 
    }
    
    getCanvasFont(el = document.body) {
        const fontWeight = this.getCssStyle(el, 'font-weight') || 'normal';
        const fontSize = this.getCssStyle(el, 'font-size') || '16px';
        const fontFamily = this.getCssStyle(el, 'font-family') || 'Times New Roman';
    
        return `${fontWeight} ${fontSize} ${fontFamily}`;
    }
    setColor() {
        this.innerText[this.index].style.color = this.defaultColor;
    }
    setColor(color) {
        this.innerText[this.index].style.color = color;
    }
    setOpacity(opacity) {
        this.innerText[this.index].style.opacity = opacity;
    }


}
class Typer extends Text{
    constructor() {
        super()
        this.firstElementIndex = 0;
        this.enterNum = 0;
    }
    gerInnerHTML(gameElement) {
        return gameElement.innerHTML
    }
    getTop() {
        return this.typer.style.top;
    }
    getLeft() {
        return this.typer.style.left
    }
    setLeft(left) {
        this.typer.style.left = left;
    }
    setTop(top) {
        this.typer.style.top = top;
    }
    setTransition(transition) {
        this.typer.style.transition = transition
    }
    newLine (gameIndex, key) {
        let firstElemement = this.getInnerTextCor(this.getInnerText(this.firstElementIndex));
        let top = firstElemement.top;
        let left = firstElemement.left;
        let nextElemement = this.getInnerTextCor(this.getInnerText(gameIndex+1));
        let nextTop = nextElemement.top;
        let nextLeft = nextElemement.left;
        if (top != nextTop) {
            if (key != " ") {
                this.setLeft(`${left}px`)
                console.log(this.innerText[gameIndex+1])
                if (nextLeft < left) {
                   this.setLeft(`${nextLeft}px`)
                }
                this.setTransition("all 28ms linear")
                this.setTop(`${nextTop}px`)
                
                this.enterNum  += 1;
                this.firstElementIndex = gameIndex+1
                return true
            }
        } else {
            return false
        }
    }
    TabTrue(gameIndex) {
        if (gameIndex > 0) {
            // console.log(this.innerText[gameIndex].getBoundingClientRect().left - parseInt(this.typer.style.left.split("px")[0]))
            if ((this.innerText[gameIndex].getBoundingClientRect().left - parseInt(this.typer.style.left.split("px")[0])) >= 5) {
                return false
            } else {
                return true;
            }
        } else {
            return true
        }
        
    }

}
class Font {
}


const game = new Game();
const typer = new Typer();
const text = new Text();

game.createMainText();
game.setUpAssets();
document.body.style.overflow = 'hidden';
// let windo = window.getComputedStyle(game.typer);
let keyPressed = [];
// let restartKeys = ['Tab', 'Enter'];
let startGame = true;

let enter = 0;
window.addEventListener("keydown", (e) => {
})
window.addEventListener("resize", () => {
    game.setUpAssets();
    // const buffer = text.getTextWidth(game.innerText[text.index+1].innerHTML, text.getCanvasFont(game.innerText[text.index+1])); 
    document.body.style.overflow = 'hidden';
} )
let tabBool = true
let copy = game.animation.style.animation;
var sec = null;
let timer = null
game.reset.addEventListener("keydown", (e) => {
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
        game.resetAssets();
    }
})
window.addEventListener("keydown", (e) => {
    if (text.index == 0 && (e.key != "Enter" && e.key != "Shift" && e.key != "Control" && e.key != "F5")) {
        if (startGame == true) {
           var sec = new Date();
            let interval = 1000;
            sec.setSeconds(sec.getSeconds() + 30);
            timer = setInterval(function () {
                this.interval = 1000;
                let now = new Date();
                let expected = (Math.round((sec - now.getTime() - this.interval)/1000)*1000)
                let t = (Math.round((sec - now.getTime())/1000)*1000);
                let seconds = Math.floor((t%(1000*60))/1000)
                
                game.timer.innerHTML = seconds.toString()
                if (seconds <= 0) {
                    clearInterval(timer);
                    game.resetOpacity();
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
})
game.typer.addEventListener("transitionstart", ()=> {
    transitiong = true;
})
let copyTyper = null;
if (game.moveTyper === true ) {
    window.addEventListener("keydown", (e) => {
        if (e.key != "Control" && e.key != "F5") {
        let timePress = new Date()
        keyPressed.push(e.key)
        // console.log(e.key)
        timeKey.push(parseFloat(timePress.getSeconds()+ "."+timePress.getMilliseconds()))
        if (text.index == 0 && e.key != "Tab" && e.key != "Enter") {
            // game.animation.style.animationPlayState = "paused"
            // game.typer.style.opacity = "1"
            game.switchWindowes()
        }
            // if ((Math.round(game.innerText[text.index].getBoundingClientRect().left) - Math.round(typer.getLeft().split("px")[0])) > 40) {
            //     tabBool = false;
            // }
            if (text.index > 0) {
                tabBool = typer.TabTrue(text.index)
                console.log(tabBool)
            }
            if (e.key == game.innerText[text.index].innerHTML && tabBool == true) {
                const fontSize = text.getTextWidth(game.innerText[text.index].innerHTML, text.getCanvasFont(game.innerText[text.index]));
                text.setColor()
                text.setOpacity("0.7")
                // game.innerText[text.index].style.opacity = "0.7";
                game.innerText[text.index].style.backgroundColor = "#373C3F"
                // game.typer.style.left = `${game.typerCss.left.split('px')[0]-(-fontSize)}px`;
                typer.setLeft(game.changePixelValue(game.typerCss.left, -fontSize))
                text.index +=1;
            }
            else if (e.key == "Backspace") {
                if (game.innerText[text.index-1].innerHTML != "&nbsp;") {
                    text.index -=1;
                    game.innerText[text.index].style.opacity = "1";
                    game.innerText[text.index].style.color = "#dad9d8";
                    const backSize = text.getTextWidth(game.innerText[text.index].innerHTML, text.getCanvasFont(game.innerText[text.index]));
                    game.typer.style.left = `${game.typerCss.left.split('px')[0]-(backSize)}px`;
                    
                }
            }
            else if (e.key == " " && typer.newLine(text.index, e.key) == false) {
                if (game.innerText[text.index].innerHTML == "&nbsp;") {
                    game.innerText[text.index].style.backgroundColor = "#373C3F"
                    const space = text.getTextWidth(" ", getCanvasFont(game.innerText[text.index]));
                    game.typer.style.left = `${game.typerCss.left.split('px')[0]-(-space)}px`
                    text.index +=1;
                }
            }
            else if (e.key == "Enter") {
                typer.newLine(text.index, e.key)
                text.index +=1;
                let k = text.index-1;
                
            }
            else if (e.key == "Tab" && tabBool == false && text.index !=0) {
                let i = text.index;
                while (true) {
                    if (game.innerText[i].innerHTML != " ") {
                        let left = game.typer.style.left
                        game.typer.style.left = `${left.split("px")[0]-(-45)}px`
                        text.index =i;
                        break;
                    }
                    i+=1
                }
            }
            else {
               if (e.key != "Shift" && e.key != "Enter" && e.key != "Tab" && e.key != "Backspace" && tabBool){
                if (game.innerText[text.index].innerHTML != "&nbsp;") {
                    game.innerText[text.index].style.color = "#969696"
                    game.innerText[text.index].style.backgroundColor ="#735454"
                      const errorFontSize = text.getTextWidth(game.innerText[text.index].innerHTML, text.getCanvasFont(game.innerText[text.index]));
                        game.typer.style.left = `${game.typerCss.left.split('px')[0]-(-errorFontSize)}px`; 
                        text.index +=1;  
                }
            }   
            }
        }   
            const buffer = text.getTextWidth(game.innerText[text.index].innerHTML, text.getCanvasFont(game.innerText[text.index]));
            copyTyper = typer.getLeft().split("px")[0]; 
            // console.log(( Math.round(copyTyper) - Math.round(game.innerText[text.index].getBoundingClientRect().left)) )
            if (e.key == "Tab" && tabBool == true ){
                e.preventDefault()
                game.reset.focus()
            }
            if ((Math.round(game.innerText[text.index].getBoundingClientRect().left) != Math.round(copyTyper)) &&
            (Math.round(game.innerText[text.index].getBoundingClientRect().left) - Math.round(copyTyper)) < 40) {
                // tabBool = true
                // game.typer.style.left = `${game.innerText[text.index].getBoundingClientRect().left}px`;
                console.log("hello")
                typer.setLeft(`${game.innerText[text.index].getBoundingClientRect().left}px`)
            }
    });
}
window.addEventListener("keyup", (e) =>{
    timeKey = [];
    // if (timeKey.length > 1 ) {
    //     if ((truncateDecimals((timeKey[1] - timeKey[0])*1000)/1000) < 0.010) {
    //             console.log(timeKey, truncateDecimals((timeKey[1] - timeKey[0])*1000)/1000)
    //             game.typer.style.transitionDuration = "0s"
    //             const buffer = text.getTextWidth(game.innerText[text.index+1].innerHTML, text.getCanvasFont(game.innerText[text.index+1]));
    //             // game.typer.style.left = `${game.typerCss.left.split('px')[0]-(-buffer)}px`; 
    //             typer.setLeft(game.changePixelValue(game.typerCss.left, -buffer))            
    //     }
    // }
    // keyPressed = [];
    
});
// window.addEventListener("keyup", (e) => {
//     // keyPressed = [];
//     setTimeout(() => {
//         game.animation.style.animation = copy;
//     }, 1000)
// })
let flickerKeyFrame = new KeyframeEffect(
    game.typer,
    [{opacity: [1, 0, 1]}],
    {duration: 30, iterations: 3}
);





