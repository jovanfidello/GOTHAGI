// WAKTU 
var realStartTime = new Date().getTime();

function ambilNama() {
    localStorage.setItem("avatar", document.querySelector(".carousel-item.active").querySelector("img").getAttribute("src"));
    localStorage.setItem("nama", document.getElementById("nama").value);
}
// AMBIL NAMA DAN AVATAR
var nama = localStorage.getItem("nama");
var avatar = localStorage.getItem("avatar");
var avatarTemp = avatar;
document.getElementById("statNama").innerHTML = `Hey, ${nama}`;

function realTime() {
    var currTime = new Date().getTime();
    var elapsedTime = currTime - realStartTime;
    var speed = 250;

    var dateTime = new Date();
    dateTime.setTime(dateTime.getTime() + (elapsedTime * speed));

    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var day = 1;
    document.getElementById('hours').textContent = hrs < 10 ? '0' + hrs : hrs;
    document.getElementById('minutes').textContent = min < 10 ? '0' + min : min;
    if (hrs == '0') {
        day++;
        document.getElementById('days').innerHTML = day;
    }
    greeting_change(hrs);
    background_change(hrs);
}

function greeting_change(hrs) {
    greet = document.getElementById("pesangreet");
    image = document.createElement("img");
    if (hrs >= 4 && hrs <= 10) {
        image.setAttribute("src", "./asset/TOMBOL/PAGI.png");
        image.setAttribute("class", "w-25");
    } else if (hrs >= 11 && hrs <= 15) {
        image.setAttribute("src", "./asset/TOMBOL/SIANG.png");
        image.setAttribute("class", "w-25");
    } else if (hrs >= 16 && hrs <= 18) {
        image.setAttribute("src", "./asset/TOMBOL/SORE.png");
        image.setAttribute("class", "w-25");
    } else if (hrs >= 19 || hrs <= 3) {
        image.setAttribute("src", "./asset/TOMBOL/MALAM.png");
        image.setAttribute("class", "w-25");
    }
    greet.innerHTML = "";
    greet.appendChild(image);
}

function background_change(hrs) {
    var bg = document.getElementById("petBackground");
    bg.style.width = "100%";
    if (hrs >= 4 && hrs <= 10) {
        bg.src = "./asset/BACKGROUND/pagi.png";
    } else if (hrs >= 11 && hrs <= 15) {
        bg.src = "./asset/BACKGROUND/siang.png";
    } else if (hrs >= 16 && hrs <= 18) {
        bg.src = "./asset/BACKGROUND/sore.png";
    } else if (hrs >= 19 || hrs <= 3) {
        bg.src = "./asset/BACKGROUND/malam.png";
    }
}

setInterval(() => {
    const gameArea = document.querySelector('.gameArea');
    const pet = document.getElementById('pet');
    const petWidth = pet.offsetWidth;
    const petHeight = pet.offsetHeight;
    const maxLeft = 0;
    const maxRight = gameArea.offsetWidth - petWidth - 100;
    const maxTop = 0;
    const maxBottom = gameArea.offsetHeight - petHeight - 100;
    const currentLeft = parseInt(pet.style.left) || 0;
    const currentTop = parseInt(pet.style.top) || 0;
    const direction = Math.floor(Math.random() * 3);
    let newLeft, newTop;

    switch (direction) {
        case 0: // GERAK KE KIRI
            newLeft = currentLeft - Math.floor(Math.random() * 1000);
            newLeft = Math.max(maxLeft, newLeft);
            pet.style.left = `${newLeft}px`;
            break;
        case 1: // GERAK KE KANAN
            newLeft = currentLeft + Math.floor(Math.random() * 1000);
            newLeft = Math.min(maxRight, newLeft);
            pet.style.left = `${newLeft}px`;
            break;
        case 2: // LOMPAT
            newTop = currentTop - Math.floor(Math.random() * 500);
            newTop = Math.max(maxTop, newTop);
            pet.style.top = `${newTop}px`;
            setTimeout(() => {
                newTop = currentTop + Math.floor(Math.random() * 500);
                newTop = Math.min(maxBottom, newTop);
                pet.style.top = `${newTop}px`;
            }, 500);
            break;
    }

    pet.style.transition = 'all 0.5s ease-out';
}, 4000);


window.onload = function() {
    pet = document.getElementById("pet");
    pet.src = avatarTemp;
    var avatarTempo = avatarTemp;
    var petMakan = avatarTemp + "-makan" + ".gif";
    var petMain = avatarTemp + "-main" + ".gif";
    var petTidur = avatarTemp + "-tidur" + ".gif";
    var petObat = avatarTemp + "-obat" + ".gif";
    var level = 1;
    var expNeeded = 101;
    var currentExp = 0;
    var lapar = 50;
    var clock1 = setInterval(deplteL, 3000);
    var tidur = 50;
    var clock2 = setInterval(deplteT, 5000);
    var main = 50;
    var clock3 = setInterval(deplteM, 5000);
    var kesehatan = 50;
    var clock4 = setInterval(deplteK, 7000);

    document.getElementById("BtnLapar").onclick = fillLapar;
    document.getElementById("BtnTidur").onclick = fillTidur;
    document.getElementById("BtnMain").onclick = fillMain;
    document.getElementById("BtnObat").onclick = fillKesehatan;


    function updateLevel() {
        currentExp += 20;
        document.getElementById("barLevel").value = currentExp;
        if (currentExp >= expNeeded) {
            level++;
            document.getElementById("level").innerHTML = level;
            expNeeded = Math.round(expNeeded * 1.1);
            document.getElementById("barLevel").max = expNeeded;
            currentExp = 0;
            document.getElementById("barLevel").value = currentExp;
            levelSound();
            if (level == 7) {
                evolveSound();
                avatarTemp = avatarTemp + "2" + ".gif";
                petMakan = avatarTemp + "-makan" + ".gif";
                petMain = avatarTemp + "-main" + ".gif";
                petTidur = avatarTemp + "-tidur" + ".gif";
                petObat = avatarTemp + "-obat" + ".gif";
            } else if (level == 15) {
                evolveSound();
                avatarTemp = avatarTempo
                avatarTemp = avatarTemp + "3" + ".gif";
                petMakan = avatarTemp + "-makan" + ".gif";
                petMain = avatarTemp + "-main" + ".gif";
                petTidur = avatarTemp + "-tidur" + ".gif";
                petObat = avatarTemp + "-obat" + ".gif";
            }
            pet.src = avatarTemp;
        }
    }

    function fillLapar() {
        if (lapar <= 99 && lapar != 0) {
            pet.src = petMakan;
            makanSound();
            lapar += 10;
            main -= 3;
            setTimeout(function() {
                pet.src = avatarTemp;
            }, 2000);
            const progressBar = document.getElementById("barLapar");
            const intervalId = setInterval(() => {
                if (progressBar.value < lapar) {
                    progressBar.value++;
                } else {
                    clearInterval(intervalId);
                }
            }, 50);
        } else if (lapar == 0) {
            lapar += 0;
        }
    }

    function fillMain() {
        if (main <= 99 && main != 0) {
            mainSound();
            main += 10;
            tidur -= 5;
            lapar -= 3;
            kesehatan -= 3;
            pet.src = petMain;
            setTimeout(function() {
                pet.src = avatarTemp;
            }, 2000);
            const progressBar = document.getElementById("barMain");
            const intervalId = setInterval(() => {
                if (progressBar.value < main) {
                    progressBar.value++;
                } else {
                    clearInterval(intervalId);
                }
            }, 50);
        } else if (tidur <= 40) {
            main += 7;
        } else if (lapar <= 40) {
            main += 7;
        } else if (kesehatan <= 40) {
            main += 5;
        } else if (main == 0) {
            main += 0;
        }
    }

    function fillTidur() {
        if (tidur <= 99 && tidur != 0) {
            tidurSound();
            tidur += 10;
            main -= 3;
            pet.src = petTidur;
            setTimeout(function() {
                pet.src = avatarTemp;
            }, 5000);
            const progressBar = document.getElementById("barTidur");
            const intervalId = setInterval(() => {
                if (progressBar.value < tidur) {
                    progressBar.value++;
                } else {
                    clearInterval(intervalId);
                }
            }, 50);
        } else if (lapar <= 40) {
            tidur += 7;
        } else if (tidur == 0) {
            tidur += 0;
        }
    }

    function fillKesehatan() {
        if (kesehatan <= 99 && main != 0) {
            obatSound();
            kesehatan += 10;
            main -= 3;
            pet.src = petObat;
            setTimeout(function() {
                pet.src = avatarTemp;
            }, 7000);
            const progressBar = document.getElementById("barKesehatan");
            const intervalId = setInterval(() => {
                if (progressBar.value < kesehatan) {
                    progressBar.value++;
                } else {
                    clearInterval(intervalId);
                }
            }, 50);
        } else if (kesehatan == 0) {
            kesehatan += 0;
        }
    }

    function deplteL() {
        if (lapar == 0) {
            document.getElementById('gameover').play();
            clearInterval(clock1);
            alert('Peliharaan anda mati karena terlalu laper');
            window.location.href = 'homepage.html';
            throw new Error();
        } else {
            lapar -= 2;
            document.getElementById("barLapar").value = lapar;
        }
    }

    function deplteT() {
        if (tidur == 0) {
            document.getElementById('gameover').play();
            clearInterval(clock2);
            alert('Peliharaan anda pingsan karena begadang mulu');
            window.location.href = 'homepage.html';
        } else {
            tidur -= 2;
            document.getElementById("barTidur").value = tidur;
        }
    }

    function deplteM() {
        if (main == 0) {
            document.getElementById('gameover').play();
            clearInterval(clock3);
            alert('Peliharaan anda mati kebosanan');
            window.location.href = 'homepage.html';
        } else {
            main -= 2;
            document.getElementById("barMain").value = main;
        }
    }

    function deplteK() {
        if (kesehatan == 0) {
            document.getElementById('gameover').play();
            clearInterval(clock4);
            alert('Peliharaan anda mati karena terkena penyakit misterius');
            window.location.href = 'homepage.html';
        } else {
            kesehatan -= 2;
            document.getElementById("barKesehatan").value = kesehatan;
        }
    }
    setInterval(updateLevel, 1000);
}

setInterval(realTime, 100); 
realTime();

// SCREENSHOT 
function captureScreenshot() {
    html2canvas(document.body).then(function(canvas) {
        var dataURL = canvas.toDataURL();
        var link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}


// SOUND
var music = document.getElementById("background-music");
var muteButton = document.getElementById("mute-button");

function toggleMute() {
    if (music.muted) {
        music.muted = false;
        muteButton.src = "./asset/TOMBOL/Icon_MusicOn.png";
    } else {
        music.muted = true;
        muteButton.src = "./asset/TOMBOL/Icon_MusicOff.png";
    }
}

function screenshotSound() {
    var music = new Audio('./asset/AUDIO/screenshot.mp3');
    music.play();
}

function levelSound() {
    var music = new Audio('./asset/AUDIO/levelup.mp3');
    music.play();
}

function clickSound() {
    var music = new Audio('./asset/AUDIO/click.mp3');
    music.play();
}

function clickSound2() {
    var music = new Audio('./asset/AUDIO/click2.mp3');
    music.play();
}

function mainSound() {
    var music = new Audio('./asset/AUDIO/main.mp3');
    music.play();
}

function makanSound() {
    var music = new Audio('./asset/AUDIO/makan.mp3');
    music.play();
}

function tidurSound() {
    var music = new Audio('./asset/AUDIO/tidur.mp3');
    music.play();
}

function obatSound() {
    var music = new Audio('./asset/AUDIO/obat.mp3');
    music.play();
}

function evolveSound() {
    var music = new Audio('./asset/AUDIO/evolve.mp3');
    music.play();
}

var audioElement = document.getElementById('background-music');
audioElement.volume = 0.5;