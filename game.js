class Game {
    constructor() {
        this.text = document.getElementById("maintext");
        this.hiddenText = document.getElementById("hidden-text-top")
        this.window = window.getComputedStyle(this.text);
        this.language = document.getElementById("lang");
        this.typer = document.getElementById("typer");
        this.instructions = document.getElementById("instructions")
        this.instructionsEnter = document.getElementById("instructions-enter")
        this.typerCss = window.getComputedStyle(this.typer)
        this.innerText = document.getElementsByTagName("p");
        this.timer = document.getElementById("timer");
        this.reset = document.getElementById("reset");
        this.WPM = document.getElementById("WPM");
        this.WPM_Num = document.getElementById("WPM-Num");
        this.animation = document.querySelector("div.animation");
        this.navbar = document.getElementById("navbar");
        this.loading = document.getElementById("loading")
        this.moveTyper = true;
        this.index = 0;
        this.restartTyperLeft = this.typer.style.left;
        this.restartTyperTop = this.typer.style.top;
        this.maxWidth = 0;
        this.tabBool = true
        this.incorrectText = 0;
        this.nonValid = ["Alt", "CapLock", "Control", "F1", "F2", "F3", "F4", "F5",
                         "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Hyper", "Meta", "NumLock", 
                         "Shift", "Super", "SymbolLock", "ArrowDown", "ArrowLeft", 
                         "ArrowRight", "ArrowUp", "End", "Home", "PageDown", "PageUp", "BackSpace",
                         "Insert", "Delete"]

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
                game.typer.style.opacity = "0";
                game.timer.style.opacity = "0"
                // game.timer.style.animationPlayState = "paused";
                // this.animation.style.animation = "none"
                let textFromTxt = data.toString().split("###");
                let random = Math.floor(Math.random() * textFromTxt.length)
                let text = textFromTxt[parseInt(random)].split("\n")
                let newText = []
                let enter = 0;
                function inner(i, list) {
                    if (i >= list.length) {
                        return;
                    } else {
                        if (list[i][0] == " ") {
                            function outer(k) {
                                if (list[i][k] != " ") {
                                    newText.push(">".repeat((k / 4)) + list[i].slice(k).toString())
                                } else {
                                    outer(k + 1)
                                }
                            }
                            outer(0)
                        }
                        else if (list[i][0] != " ") {
                            if (list[i].length > maxWidth) {
                                maxWidth = list[i].length
                            }
                            newText.push(list[i].toString())
                        }
                        inner(i + 1, list);
                    }
                    return i;
                }
                inner(1, text)
                console.log(newText)
                let index = 1;
                while (newText.length == 0) {
                    let textFromTxt = data.toString().split("###");
                    let random = Math.floor(Math.random() * textFromTxt.length)
                    let text = textFromTxt[parseInt(random)].split("\n")
                    inner(1, text)
                }
                function makeDivs(i) {
                    if (i >= newText.length) {
                        return;
                    } else {
                        div = document.createElement("div");
                        div.setAttribute("id", "word");
                        if (newText[i].includes(">") && newText[i].includes("->") == false) {
                            let q = 0;
                            for (let k = 0; k < newText[i].length; k++) {
                                if (newText[i][k] == ">") {
                                    q += 1
                                }
                            }
                            div.style.left = `${2 * q}em`
                        }
                        if (i != 0) {
                            div.style.top = `${1.5 * enter}em`
                            enter += 1;
                        } else {
                            div.style.top = `${-1.5}em`
                        }
                        function makePara(k) {
                            if (k >= newText[i].length) {
                                p = document.createElement("p");
                                p.style.display = "inline";
                                p.innerHTML = "&nbsp;";
                                div.appendChild(p)
                                game.text.appendChild(div)
                            } else {
                                if (newText[i][k] != undefined && newText[i][k] != ">" && newText[i][k] != "") {
                                    if (newText[i][k] == "-" && newText[i][k + 1] == ">") {
                                        p = document.createElement("p");
                                        p.style.display = "inline";
                                        p.innerHTML = newText[i][k];
                                        div.appendChild(p)
                                    }
                                    p = document.createElement("p");
                                    p.style.display = "inline";
                                    p.innerHTML = newText[i][k];
                                    div.appendChild(p)
                                }
                                makePara(k + 1);
                            }
                            return k;
                        }
                        makePara(0)
                        makeDivs(i + 1)
                    }
                    return i;
                }
                makeDivs(0);
                // text.index = 0;
                game.innerText = document.getElementsByTagName("p");
                game.maxWidth = maxWidth;
                game.text.style.width = `${1000 + (game.maxWidth * 3)}px`
                game.text.style.left = "50%"
                game.typer.style.left = `${game.innerText[0].getBoundingClientRect().left}px`
                // game.typer.style.top = `${game.innerText[0].getBoundingClientRect().top - 4}px`
                if (maxWidth >= 55) {
                    game.text.style.width = `${1000 + ((maxWidth - 66) * 10)}px`
                    game.typer.style.left = `${game.innerText[0].getBoundingClientRect().left}px`
                }
                if (newText.length <= 10 && newText.length > 6) {
                    game.text.style.top = "43%"
                    game.text.style.left = "50%"
                    // game.typer.style.left = `${game.innerText[0].getBoundingClientRect().left}px`
                    game.typer.style.top = `${game.innerText[0].getBoundingClientRect().top - 3}px`
                    game.language.style.top = `${game.typer.style.top.split("px")[0] - 70}px`
                }
                else if (newText.length <= 6) {
                    game.text.style.top = "50%"
                    game.text.style.left = "50%"
                    // game.typer.style.left = `${game.innerText[0].getBoundingClientRect().left}px`
                    game.typer.style.top = `${game.innerText[0].getBoundingClientRect().top - 4}px`
                    game.language.style.top = `${game.typer.style.top.split("px")[0] - 70}px`
                } else {
                    game.language.style.top = game.changePixelValue(game.window.top, 70)
                }
                game.instructions.style.top = `${game.innerText[0].getBoundingClientRect().top}px`
                game.instructions.style.left = `${game.innerText[0].getBoundingClientRect().left - 200}px`
                if ((game.innerText[0].getBoundingClientRect().left - 200) < 0) {
                    game.instructions.style.left = `${game.innerText[0].getBoundingClientRect().left}px`
                    game.instructions.style.top = `${game.innerText[0].getBoundingClientRect().top-30}px`
                    game.instructions.innerHTML = "type to start"
                }
                // game.typer.style.opacity = "1"
            });
    }
    setUpAssets() {
        game.restartTyperLeft = game.changePixelValue(game.window.left, 502)
        game.restartTyperTop = game.changePixelValue(game.window.top, 100)
        game.timer.style.top = game.changePixelValue(game.window.top, 138)
        game.timer.style.left = game.changePixelValue(game.window.left, 500)
    }
    pixelToNum(elementAtrribute) {
        return elementAtrribute.split("px")[0];
    }
    changePixelValue(elementAtrribute, num) {
        return `${elementAtrribute.split("px")[0] - num}px`
    }
    resetAssets() {
        game.createMainText();
        game.setUpAssets();
        game.typer.style.animationPlayState = "running"
        game.timer.style.opacity = "0";
        game.navbar.style.opacity = "1";
        game.language.style.opacity = "1";
        game.WPM.style.opacity = "0";
        game.WPM_Num.style.opacity = "0";
        game.text.style.opacity = "1";
        // game.instructions.style.opacity = "1"
        game.language.style.animationPlayState = "running";
        game.navbar.style.animationPlayState = "running";
        game.timer.style.animationPlayState = "paused";
        startGame = true;
        // game.timer.innerHTML = "15"
        text.index = 0;
        game.reset.blur()
        game.tabBool = true
    }
    resetOpacity() {
        game.WPM.style.opacity = "1";
        game.WPM_Num.style.opacity = "1";
        game.WPM.innerHTML = `Wpm: ${Math.round(((text.index / 5) * 4))}`
        game.WPM.innerHTML += "&nbsp;".repeat(4)
        game.WPM.innerHTML += `Accuracy: ${Math.round(((text.index - text.incorrectText) / text.index) * 100)}%`
        game.timer.style.opacity = "0";
        game.navbar.style.opacity = "0";
        game.language.style.opacity = "0";
        game.text.style.opacity = "0";
        game.typer.style.opacity = "0"
        game.instructions.style.opacity = "0";
    }
    switchWindowes() {
        function fade(element) {
            var op = 1;  // initial opacity
            var timer = setInterval(function () {
                if (op <= 0.1){
                    clearInterval(timer);
                    element.style.display = 'none';
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.4;
            }, 20);
        }
        this.animation.style.animation = "none";
        this.timer.style.opacity = "1";
        this.navbar.style.opacity = "0";
        this.language.style.opacity = "0";
        fade(game.instructions)
        this.language.style.animationPlayState = "running";
        this.navbar.style.animationPlayState = "running";
        this.timer.style.animationPlayState = "running";
        this.animation.style.animationPlayState = "paused"
        game.tabBool = true
        text.index = 0;
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
        return window.getComputedStyle(element, null).getPropertyValue(prop); a
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
    setBackgroundColor(color) {
        this.innerText[this.index].style.backgroundColor = color;
    }


}
class Typer extends Text {
    constructor() {
        super()
        this.firstElementIndex = 0;
        this.enterNum = 0;
        this.firstLine = true
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
    newLine(gameIndex, key, canMove) {

        let firstElemement = this.getInnerTextCor(this.getInnerText(this.firstElementIndex));
        let top = firstElemement.top;
        let left = firstElemement.left;
        let nextElemement = this.getInnerTextCor(this.getInnerText(gameIndex + 1));
        let nextTop = nextElemement.top;
        let nextLeft = nextElemement.left;
        if (top != nextTop && text.index != 0) {
            if (key != " " && text.index != 0) {
                if (this.firstLine == true) {
                    console.log(this.enterNum)
                    game.instructionsEnter.style.left = `${game.typer.getBoundingClientRect().left+15}px`
                    game.instructionsEnter.style.top = `${game.typer.getBoundingClientRect().top-3}px`
                    game.instructionsEnter.style.opacity = "0.85";
                }
                if (canMove == true) {
                     this.setLeft(`${left}px`)
                    if (nextLeft < left && text.index != 0) {
                        this.setLeft(`${nextLeft}px`)
                    }
                    this.setTransition("all 28ms linear")
                    if (game.text.childElementCount >= 10) {

                        if (this.enterNum+1 >= Math.round(game.text.childElementCount/2)) {
                            game.text.style.top = `${game.text.getBoundingClientRect().top - 30}px`
                        } else {
                            this.setTop(`${nextTop - 3.5}px`)
                        }
                    } else {
                        this.setTop(`${nextTop - 3.5}px`)
                    }
                    

                    this.enterNum += 1;
                    this.firstLine = false
                    this.firstElementIndex = gameIndex + 1
                    text.index += 1;
                }
                this.firstLine = false
                return true
            }
        } else {
            return false
        }
    }
    TabTrue(gameIndex) {
        if (gameIndex > 0) {
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
let keyPressed = [];
let startGame = true;

let enter = 0;
window.addEventListener("keydown", (e) => {
})
window.addEventListener("resize", () => {
    game.typer.style.left = `${game.innerText[text.index].getBoundingClientRect().left}px`
    game.typer.style.top = `${game.window.top.split('px')[0] - 35}px`
    game.instructions.style.top = `${game.window.top.split('px')[0] - 35}px`
    game.instructions.style.left = `${game.innerText[0].getBoundingClientRect().left - 200}px`
    game.instructionsEnter.style.left = `${game.typer.getBoundingClientRect().left+15}px`
    game.instructionsEnter.style.top = `${game.typer.getBoundingClientRect().top-3}px`
    game.timer.style.left = game.changePixelValue(game.window.left, 500)


    document.body.style.overflow = 'hidden';
})
let copy = game.animation.style.animation;
var sec = null;
let timer = null
game.reset.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        for (let i = 0; i < game.innerText.length - 4; i++) {
            game.innerText[i].innerHTML = ""
        }
        let child = game.text.lastElementChild;
        while (game.text.lastElementChild) {
            game.text.removeChild(game.text.lastElementChild);
        }
        clearInterval(timer);
        game.typer.style.opacity = "0";
        game.timer.style.opacity = "0"

        game.resetAssets();
        game.instructions.style.opacity = "1"
        game.instructionsEnter.style.opacity = "0"
    }
})
let op = 1;
game.reset.addEventListener("click", (e) => {
    op = 1;
    for (let i = 0; i < game.innerText.length - 4; i++) {
        game.innerText[i].innerHTML = ""
    }
    let child = game.text.lastElementChild;
    while (game.text.lastElementChild) {
        game.text.removeChild(game.text.lastElementChild);
    }
    clearInterval(timer);
    game.resetAssets();
})
const wait = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay))

function fade(element) {
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer)
            element.style.display = 'none'
        }
        element.style.opacity = op;
        element.style.filter = 'alpa(opacity=' + op * 100 + ")";
        op -= op * 0.4;
    }, 50);
}
document.addEventListener("DOMContentLoaded", () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => fade(game.loading))
}


)
window.addEventListener("keydown", (e) => {
    if (text.index == 0 && (e.key != "Enter" && e.key != "Shift" && e.key != "Control" && e.key != "F5")) {
        if (startGame == true) {
            var sec = new Date();
            let interval = 1000;
            sec.setSeconds(sec.getSeconds() + 15);
            timer = setInterval(function () {
                this.interval = 1000;
                let now = new Date();
                let expected = (Math.round((sec - now.getTime() - this.interval) / 1000) * 1000)
                let t = (Math.round((sec - now.getTime()) / 1000) * 1000);
                let seconds = Math.floor((t % (1000 * 60)) / 1000)

                game.timer.innerHTML = seconds.toString()
                if (seconds <= 0) {
                    clearInterval(timer);
                    game.instructions.style.opacity = "0";
                    game.timer.style.opacity = "0";
                    game.typer.style.opacity = "0";
                    game.resetOpacity();
                }

            }, 1000);
        }

        startGame = false;
    } if (e.key == "Tab" && text.index == 0) {
        e.preventDefault()
        game.reset.focus()
    }
})
let timer1 = null;
let timeKey = []
let transitiong = false
game.typer.addEventListener("transitionend", () => {
    transitiong = false
})
game.typer.addEventListener("transitionstart", () => {
    transitiong = true;
})
let copyTyper = null;
if (game.moveTyper === true) {
    window.addEventListener("keydown", (e) => {
        if (game.nonValid.includes(e.key) == false) {
            let timePress = new Date()
            keyPressed.push(e.key)
            e.preventDefault()
            typer.setTransition("all 28ms linear")
            game.typer.style.opacity = "1";
            // console.log(game.reset.onfocus)
            // game.instructions.style.opacity = "0"
            timeKey.push(parseFloat(timePress.getSeconds() + "." + timePress.getMilliseconds()))
            if (text.index == 0 && game.nonValid.includes(e.key) == false && e.key != "Enter" && e.key != "Tab") {
                game.timer.style.animationPlayState = "running";
                game.switchWindowes()
            }
            if (text.index > 0) {
                game.tabBool = typer.TabTrue(text.index)
            }
            if (e.key == game.innerText[text.index].innerHTML && game.tabBool == true) {
                const fontSize = text.getTextWidth(game.innerText[text.index].innerHTML, text.getCanvasFont(game.innerText[text.index]));
                text.setColor()
                text.setOpacity("0.7")
                text.setBackgroundColor("#373C3F")
                typer.setLeft(game.changePixelValue(game.typerCss.left, -fontSize))
                text.index += 1;
            }
            else if (e.key == "Backspace") {
                if (game.innerText[text.index - 1].innerHTML != "&nbsp;") {
                    text.index -= 1;
                    text.setOpacity("1")
                    text.setColor("#dad9d8")
                    const backSize = text.getTextWidth(game.innerText[text.index].innerHTML, text.getCanvasFont(game.innerText[text.index]));
                    typer.setLeft(game.changePixelValue(game.typerCss.left, backSize))
                }
            }
            else if (e.key == " " && typer.newLine(text.index, e.key, true) == false) {
                if (game.innerText[text.index].innerHTML == "&nbsp;") {
                    game.innerText[text.index].style.backgroundColor = "#373C3F"
                    text.setBackgroundColor("#373C3F")
                    const space = text.getTextWidth(" ", getCanvasFont(game.innerText[text.index]));
                    game.typer.style.left = `${game.typerCss.left.split('px')[0] - (-space)}px`
                    typer.setLeft(game.changePixelValue(game.typerCss.left, space))
                    text.index += 1;
                }
            }
            else if (e.key == "Enter") {
                typer.newLine(text.index, e.key, true)
                // game.instructionsEnter.style.opacity = "0"
                function fade(element) {
                    var op = 1;  // initial opacity
                    var timer = setInterval(function () {
                        if (op <= 0.1){
                            clearInterval(timer);
                            element.style.display = 'none';
                        }
                        element.style.opacity = op;
                        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                        op -= op * 0.4;
                    }, 20);
                }
                fade(game.instructionsEnter)
                game.typer.style.transition = "none"
                let k = text.index - 1;

            }
            else if (e.key == "Tab" && game.tabBool == true) {
                game.reset.focus()
            }
            else if (e.key == "Tab" && game.tabBool == false && text.index != 0) {
                let i = text.index;
                while (true) {
                    if (game.innerText[i].innerHTML != " ") {
                        let left = game.typer.style.left
                        game.typer.style.left = `${left.split("px")[0] - (-45)}px`
                        text.index = i;
                        break;
                    }
                    i += 1
                }
            }
            else {
                if (e.key != "Shift" && e.key != "Enter" && e.key != "Tab" && e.key != "Backspace" && game.tabBool) {
                    if (game.innerText[text.index].innerHTML != "&nbsp;") {
                        game.innerText[text.index].style.color = "#969696"
                        game.innerText[text.index].style.backgroundColor = "#735454"
                        const errorFontSize = text.getTextWidth(game.innerText[text.index].innerHTML, text.getCanvasFont(game.innerText[text.index]));
                        game.typer.style.left = `${game.typerCss.left.split('px')[0] - (-errorFontSize)}px`;
                        text.index += 1;
                        text.incorrectText += 1;
                    }
                }
            }
            typer.newLine(text.index, e.key, false)
        }
        const buffer = text.getTextWidth(game.innerText[text.index].innerHTML, text.getCanvasFont(game.innerText[text.index]));
        copyTyper = typer.getLeft().split("px")[0];
        if ((Math.round(game.innerText[text.index].getBoundingClientRect().left) != Math.round(copyTyper)) &&
            (Math.round(game.innerText[text.index].getBoundingClientRect().left) - Math.round(copyTyper)) < 40 && text.index != 0) {
            typer.setLeft(`${game.innerText[text.index].getBoundingClientRect().left}px`)
        }
    });
}
window.addEventListener("keyup", (e) => {
    timeKey = [];
});
let flickerKeyFrame = new KeyframeEffect(
    game.typer,
    [{ opacity: [1, 0, 1] }],
    { duration: 30, iterations: 3 }
);





