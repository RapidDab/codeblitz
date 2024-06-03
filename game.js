var t = [];
const div = document.createElement("div");
div.setAttribute("id", "word")
fetch("words.txt")
    .then(function (res) {
        return res.text();
    })
    .then(function (data) {
        let text = data.toString().split("\n");
        for (let i = 0; i < 25; i++) {
            let node2 = document.createTextNode(text[i] + " ");
            // node2.setAttribute("id", "word");
            div.appendChild(node2);
            t.push(text[i]);
        }
    });
const element = document.getElementById("maintext");
element.appendChild(div);


