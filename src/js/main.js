(() => {"use strict";



const VOCABS = {
    "Hiragana basic": [
        ["a",  "あ"],["i",  "い"],["u",  "う"],["e",  "え"],["o",  "お"],
        ["ka", "か"],["ki", "き"],["ku", "く"],["ke", "け"],["ko", "こ"],
        ["sa", "さ"],["shi", "し"],["su", "す"],["se", "せ"],["so", "そ"],
        ["ta", "た"],["chi", "ち"],["tsu", "つ"],["te", "て"],["to", "と"],
        ["na", "な"],["ni", "に"],["nu", "ぬ"],["ne", "ね"],["no", "の"],
        ["ha", "は"],["hi", "ひ"],["fu", "ふ"],["he", "へ"],["ho", "ほ"],
        ["ma", "ま"],["mi", "み"],["mu", "む"],["me", "め"],["mo", "も"],
        ["ya", "や"],            ["yu", "ゆ"],            ["yo", "よ"],
        ["ra", "ら"],["ri", "り"],["ru", "る"],["re", "れ"],["ro", "ろ"],
        ["wa", "わ"],                                    ["wo", "を"],
        ["n",  "ん"]
    ],
    "Katakana basic": [
        ["a",  "ア"],["i",  "イ"],["u",  "ウ"],["e",  "エ"],["o",  "オ"],
        ["ka", "カ"],["ki", "キ"],["ku", "ク"],["ke", "ケ"],["ko", "コ"],
        ["sa", "サ"],["shi", "シ"],["su", "ス"],["se", "セ"],["so", "ソ"],
        ["ta", "タ"],["chi", "チ"],["tsu", "ツ"],["te", "テ"],["to", "ト"],
        ["na", "ナ"],["ni", "ニ"],["nu", "ヌ"],["ne", "ネ"],["no", "ノ"],
        ["ha", "ハ"],["hi", "ヒ"],["fu", "フ"],["he", "ハ"],["ho", "ホ"],
        ["ma", "マ"],["mi", "ミ"],["mu", "ム"],["me", "メ"],["mo", "モ"],
        ["ya", "ヤ"],            ["yu", "ユ"],            ["yo", "ヨ"],
        ["ra", "ラ"],["ri", "リ"],["ru", "ル"],["re", "レ"],["ro", "ロ"],
        ["wa", "ワ"],                                    ["wo", "ヲ"],
        ["n",  "ン"]
    ]
} 



let loadVocabs = function() {
    if (localStorage.vocabs == null) return ["Hiragana basic"];
    return localStorage.vocabs.split(",");
}


let onEnter = function(event) {
    if (this.show.func) return this.newPair();

    let correct = (this.inputText.toLowerCase() === this.pair[0]);
    
    if (correct) {
        this.result.correct++;
        this.show.scene = "correct";
    } else {
        this.result.incorrect++;
        this.show.scene = "incorrect";
        this.inputText = this.pair[0];
    }
    
    this.show.func = setTimeout(this.newPair, 600);
}


let newPair = function() {
    clearTimeout(this.show.func);
    this.show.func = null;
    this.show.scene = this.inputText = "";

    this.pair = this.vocab[this.pos++];
    if (this.pos === this.vocab.length) this.newVocab();
}


let newVocab = function() {
    this.vocab = [];
    this.pos = 0;
    
    this.settings.vocabs.forEach(name => {
        this.vocab = this.vocab.concat(this.vocabList[name]);
    });

    this.vocab = this.vocab.sort(() => Math.random() - .5);
}


let closeSettings = function() {
    if (this.settings.visible) {
        this.settings.visible = "close_settings";
        setTimeout(() => {this.settings.visible = false}, 200)
    }
}


let changeVocab = function(vocName, isInList, ind) {
    if (isInList) {
        this.settings.vocabs.splice(ind, 1);
    } else {
        this.settings.vocabs.push(vocName);
    }

    localStorage.vocabs = this.settings.vocabs;
    this.newVocab();
    this.newPair();
}


new Vue({
    el: "#vue_container",

    data: {
        pos: null,
        pair: null,
        vocab: null,

        result: {
            correct: 0,
            incorrect: 0
        },

        show: {
            scene: "",
            func: null
        },

        settings: {
            vocabs: loadVocabs(),
            visible: false
        },

        vocabList: VOCABS
    },

    methods: {
        onEnter,
        newPair,
        newVocab,
        closeSettings,
        changeVocab
    },

    created() {
        this.newVocab();
        this.newPair();
    }
});



})();
