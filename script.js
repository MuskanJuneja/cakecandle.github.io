const mouse = document.querySelector('.mouse')
const scorebox = document.querySelector('.score span')
const clocktext = document.querySelector('.clock span')
const boxes = [...document.querySelectorAll('.box')]
const nav = document.querySelector('.nav')
var score = 0;
var clicks = 0;
var imgtime = 1200;
var clock = 120;
const sound = new Audio("images/smash.mp3")
const sound2= new Audio('images/smashbomb.mp3')
const sound3=new Audio('images/all.mp3')

var flag = true;
var t, t2;
var k = 6;
const h1 = document.createElement('h1')
h1.classList.add('beginning')
nav.appendChild(h1)
const begin = () => {
    t2 = setTimeout(() => {
        if (k != 0) {
            k = k - 1;
            h1.textContent = "Game starts in " + k;
            begin()
        }
        else {
            clearTimeout(t2)
            nav.removeChild(h1)
            begin2()
        }
    }, 1000)
}
const begin2 = () => {
    start()
    gaintime()
}
const gaintime = () => {
    t = setTimeout(() => {
        if (clock != 0) {
            clock = clock - 1;
            clocktext.textContent = clock;
            gaintime()
        }
        else {
            clearTimeout(t)
            flag = false;
        }
    }, 1000)
}
const start = () => {
    if (flag == false) {
        //FROM HERE SCORE WILL BE SAVED TO USER'S DB....
        window.alert("Game ended " + " Your score is= " + score)
        sound3.pause()
    }
    else {
        var timer = null;
        const index = Math.floor(Math.random() * 16)
        const box1 = boxes[index]
        const i = Math.floor(Math.random() * 3)
        if (clicks % 10 == 0 && clicks != 0) {
            if (imgtime != 100) {
                imgtime = imgtime - 100;
                clicks = 0;
            }
            else {
                imgtime = 100;
                clicks = 0;
            }
        }
        if (i == 0) {
            const img = document.createElement('img')
            img.classList.add('cake1')
            img.src = 'images/cake1.png'
            img.addEventListener('click', () => {
                clicks = clicks + 1;
                score = score + 10;
                scorebox.textContent = score;
                img.src='images/aftercake.png'
                sound.play()
                clearTimeout(timer)
                timer = setTimeout(() => {
                    box1.removeChild(img)
                    start()
                }, imgtime)
            })
            box1.appendChild(img)
            timer = setTimeout(() => {
                box1.removeChild(img)
                start()
            }, imgtime)
        }
        else if(i==2) {
            const img = document.createElement('img')
            img.classList.add('cake2')
            img.src = 'images/cake2.png'
            img.addEventListener('dblclick', () => {
                clicks = clicks + 1;
                score = score + 10;
                scorebox.textContent = score;
                img.src='images/aftercake.png'
                sound.play()
                clearTimeout(timer)
                timer = setTimeout(() => {
                    box1.removeChild(img)
                    start()
                }, imgtime)
            })
            box1.appendChild(img)
            timer = setTimeout(() => {
                box1.removeChild(img)
                start()
            }, imgtime)
        }
        else{
            const img = document.createElement('img')
            img.classList.add('bomb')
            img.src = 'images/bomb.png'
            img.addEventListener('click', () => {
                clicks = clicks + 1;
                score = score - 20;
                scorebox.textContent = score;
                img.src='images/afterbomb.png'
                sound2.play()
                clearTimeout(timer)
                timer = setTimeout(() => {
                    box1.removeChild(img)
                    start()
                }, imgtime)
            })
            box1.appendChild(img)
            timer = setTimeout(() => {
                box1.removeChild(img)
                start()
            }, imgtime)
        }
    }
}
begin()
window.addEventListener('mousemove', (e) => {
sound3.play()
    mouse.style.top = e.pageY + 'px'
    mouse.style.left = e.pageX + 'px'
})
window.addEventListener('mouseup', () => {
    mouse.classList.remove('on')
})
window.addEventListener('mousedown', () => {
    mouse.classList.add('on')
})