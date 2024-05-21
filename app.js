//declaring necessary variables and constants

let songIndex = 0
const songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "./songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma [NCS Release]", filePath: "./songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV Invincible [NCS Release]", filePath: "./songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "./songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji Heroes Tonight feat Johnning [NCS Release]", filePath: "./songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Lost Sky - Fearless [NCS Release]", filePath: "./songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Lost Sky - Dreams[NCS Release]", filePath: "./songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Lost Sky - Where We Started [NCS Release]", filePath: "./songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Robin Hustin x TobiMorrow - Light It Up [NCS Release]", filePath: "./songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Diviners - Savannah [NCS Release]", filePath: "./songs/10.mp3", coverPath: "covers/10.jpg" },
]

let currentsong = new Audio("./songs/1.mp3")
const songList = Array.from(document.querySelectorAll(".songList"))
const songDuration = Array.from(document.querySelectorAll(".songDuration span"))
const nextbutton = document.querySelector("#next")
const masterPlaybutton = document.querySelector("#masterPlay")
const previousbutton = document.querySelector("#previous")
const gif = document.querySelector("#songinfo img")
const musicprogress = document.querySelector("#bottom input")
const songname = document.querySelector("#songinfo p")
const songItemPlay = Array.from(document.querySelectorAll(".songItemPlay"))
// console.log(songDuration);
// console.log(currentsong);


//displaying the duration of the songs in the page
songs.forEach((element, index) => {
    const currentSong = new Audio(`./songs/${index + 1}.mp3`)

    // Listen for the loadedmetadata event to ensure the duration is available
    currentSong.addEventListener('loadedmetadata', () => {
        let duration = currentSong.duration;
        songDuration[index].innerHTML = `${formatTime(duration)}`;
    });

    // Optionally, preload the metadata
    currentSong.preload = 'metadata';
});

// Function to format the time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs}`;
}


//when the user clicks the play button at the bottom
masterPlaybutton.addEventListener("click", () => {
    if (currentsong.paused) {
        currentsong.play()

        masterPlaybutton.classList.remove("fa-play-circle")
        masterPlaybutton.classList.add("fa-pause-circle")

        songItemPlay[songIndex].classList.remove("fa-play-circle") //adding and removing play pause button from the list
        songItemPlay[songIndex].classList.add("fa-pause-circle")

        gif.style.opacity = "1"

    }
    else {
        currentsong.pause()

        masterPlaybutton.classList.remove("fa-pause-circle")
        masterPlaybutton.classList.add("fa-play-circle")

        songItemPlay[songIndex].classList.remove("fa-pause-circle") //adding and removing play pause button from the list
        songItemPlay[songIndex].classList.add("fa-play-circle")

        gif.style.opacity = "0"
    }
})

//when the user clicks the previous button at the bottom
previousbutton.addEventListener("click", function () {

    if (songIndex > 0) {

        if (currentsong.paused) { //while paused, pressing the previous button 

            songIndex--
            currentsong.src = songs[songIndex].filePath  //changing the song
            songname.innerHTML = songs[songIndex].songName //changing the song name
        }

        else { //while playing, pressing the previous button

            makeallpause()  //pausing all the songs from the list

            songIndex--
            currentsong.src = songs[songIndex].filePath  //changing the song
            songname.innerHTML = songs[songIndex].songName //changing the song name
            currentsong.play()

            songItemPlay[songIndex].classList.remove("fa-play-circle") //adding and removing play pause button from the list
            songItemPlay[songIndex].classList.add("fa-pause-circle")
        }
    }
})

//when the user clicks the next button at the bottom
nextbutton.addEventListener("click", function () {

    if (songIndex < 9) {

        if (currentsong.paused) {  //while paused, pressing the next button 

            songIndex++
            currentsong.src = songs[songIndex].filePath  //changing the song
            songname.innerHTML = songs[songIndex].songName //changing the song name
        }

        else { //while playing, pressing the next button

            makeallpause() //pausing all the songs from the list

            songIndex++
            currentsong.src = songs[songIndex].filePath  //changing the song
            songname.innerHTML = songs[songIndex].songName //changing the song name
            currentsong.play()

            songItemPlay[songIndex].classList.remove("fa-play-circle") //adding and removing play pause button from the list
            songItemPlay[songIndex].classList.add("fa-pause-circle")
        }
    }

})

// when the current time of the audio moves forward, timeupdate event happens
currentsong.addEventListener("timeupdate", () => {

    // after transferring to another song this event make sures that the meta data is loaded so that input range doesn't behave abnormally
    currentsong.addEventListener('loadedmetadata', () => {
        musicprogress.value = ((currentsong.currentTime / currentsong.duration) * 100)
    });

    // Optionally, preload the metadata
    currentsong.preload = 'metadata';

    musicprogress.value = ((currentsong.currentTime / currentsong.duration) * 100)

    //will play the next song automatically if the current song finishes
    if (currentsong.currentTime === currentsong.duration) {

        makeallpause()

        songIndex++
        currentsong.src = songs[songIndex].filePath  //changing the song
        songname.innerHTML = songs[songIndex].songName //changing the song name
        currentsong.play()

        songItemPlay[songIndex].classList.remove("fa-play-circle") //adding and removing play pause button from the list
        songItemPlay[songIndex].classList.add("fa-pause-circle")
    }
})

//when the value of the range is changed
musicprogress.addEventListener("input", () => {
    currentsong.currentTime = ((musicprogress.value * currentsong.duration) / 100)
})

//when the play button from the song lists are pressed
songItemPlay.forEach(function (element) {

    element.addEventListener('click', (e) => {
        console.log(e.target);

        if (e.target.classList.contains('fa-pause-circle')) { //means that can pause the current song

            currentsong.pause()

            e.target.classList.remove("fa-pause-circle")
            e.target.classList.add("fa-play-circle")

            masterPlaybutton.classList.remove("fa-pause-circle")
            masterPlaybutton.classList.add("fa-play-circle")

            gif.style.opacity = "0"

        }
        else if (e.target.classList.contains('fa-play-circle') && e.target.id == songIndex) { //means that can replay the current song

            currentsong.play()

            e.target.classList.remove("fa-play-circle")
            e.target.classList.add("fa-pause-circle")

            masterPlaybutton.classList.remove("fa-play-circle")
            masterPlaybutton.classList.add("fa-pause-circle")

            gif.style.opacity = "1"

        }
        else if (e.target.classList.contains('fa-play-circle') && e.target.id != songIndex) { //transferring to other songs

            makeallpause()

            e.target.classList.remove("fa-play-circle")
            e.target.classList.add("fa-pause-circle")

            masterPlaybutton.classList.remove("fa-play-circle")
            masterPlaybutton.classList.add("fa-pause-circle")

            songIndex = parseInt(e.target.id)
            currentsong.src = songs[songIndex].filePath  //changing the song
            songname.innerHTML = songs[songIndex].songName //changing the song name

            currentsong.play()
            gif.style.opacity = "1"

        }
    })

})

function makeallpause() {  //pauses all the songs in the list
    songItemPlay.forEach(function (element) {
        element.classList.remove("fa-pause-circle")
        element.classList.add("fa-play-circle")
    })
}
















