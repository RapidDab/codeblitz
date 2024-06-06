class Game {
    constructor() {
        this.text = document.getElementById("maintext");
        this.window = window.getComputedStyle(this.text);
        this.language = document.getElementById("lang");
        this.typer = document.getElementById("typer");
    }
    createMainText() {
        var t = [];
        let div = "";
        let p = ""
        fetch("words.txt")
            .then(function (res) {
                return res.text();
            })
            .then(function (data) {
                let text = data.toString().split("\n");
                for (let i = 0; i < text.length; i++) {
                    div = document.createElement("div");
                    div.setAttribute("id", "word");
                    console.log(text[i]);
                    for (let k = 0; k < text[i].length; k++) {
                        console.log(text[i][k]);
                        p = document.createElement("p");
                        p.style.display = "inline";
                        p.innerHTML = text[i][k];
                        div.appendChild(p)
                    }
                    p = document.createElement("p");
                    p.style.display = "inline";
                    p.innerHTML = "&nbsp";                
                    div.appendChild(p)
                    game.text.appendChild(div)
                }
            //     // for (let i = 0; i < text.length; i++) {
            //     //     // let node2 = document.createTextNode(text[i] + " ");
            //     //     // div.appendChild(node2);
            //     //     // t.push(text[i]);
            //     // }
            });
        // this.text.appendChild(div);
    }
    setUpAssets () {
        function resize() {
            game.language.style.top = `${game.window.top.split('px')[0]-150}px`
            game.typer.style.left = `${game.window.left.split('px')[0]-500}px`
            game.typer.style.top = `${game.window.top.split('px')[0]-100}px`
        }
        resize()
        window.addEventListener("resize", resize)
    }
}

const game = new Game();

game.createMainText();
game.setUpAssets();

// game.text.children.style.fontSize = '25px';





