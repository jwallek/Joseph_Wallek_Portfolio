const TypeWriter = function(txtElement, words, waitTime = 2000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(waitTime, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
    const current_index = this.wordIndex % this.words.length;
    const fullTxt = this.words[current_index]


    if(this.isDeleting){
        //deleting char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else{
        //adding char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    //initial type speed
    let typeSpeed = 250;

    if(this.isDeleting){
        typeSpeed /= 2;
    }
    //Checking if word is complete
    if(!this.isDeleting && this.txt == fullTxt){
        //Pause at end
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //Change word
        this.wordIndex++;
        //Pause before new word
        typeSpeed= 500;

    }
    

    setTimeout(() => this.type(), typeSpeed)
}

document.addEventListener('DOMContentLoaded', init);

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);

}

var open = document.getElementById("navbar-toggler")
var close = document.getElementById("btn-close");

let actionOpened = false;




function selectedOpen() {
    if (!actionOpened){
        open.classList.add("notVisible");
        close.classList.remove("notVisible");
        actionOpened = true;
    }
    else{
        open.classList.remove("notVisible");
        close.classList.add("notVisible");
        actionOpened = false;
    }
}
