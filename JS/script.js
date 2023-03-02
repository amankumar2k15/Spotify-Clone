// console.log("Welcome to Spotify")


// Initializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Baarish Mein Tum", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "Barsaat ho jaye", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "Har har shambhu", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "Jo tainu dhoop lagya", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "Kesariya", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" },
    { songName: "Mere dhol judaiyaan", filePath: "songs/6.mp3", coverPath: "cover/6.jpg" },
    { songName: "Meri zindagi hai tu", filePath: "songs/7.mp3", coverPath: "cover/7.jpg" },
    { songName: "Rataan lambiyaan", filePath: "songs/8.mp3", coverPath: "cover/8.jpg" },
    { songName: "Srivalli", filePath: "songs/9.mp3", coverPath: "cover/9.jpg" },
    { songName: "Tumse pyaar karke", filePath: "songs/10.mp3", coverPath: "cover/10.jpg" }
]

songItems.forEach((element, index) => {
    // console.log(element, index);
    element.getElementsByTagName("img")[0].src = songs[index].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[index].songName;
});

// Handle Play & Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;

})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused && audioElement.currentTime >= 0) {
            makeAllPlays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            songIndex = parseInt(e.target.id);
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            // audioElement.currentTime = 0;
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            // makeAllPlays(); 
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            // songIndex = parseInt(e.target.id);
            // // audioElement.src = `songs/${songIndex + 1}.mp3`;
            // masterSongName.innerText = songs[songIndex].songName;
            audioElement.pause();
        //     audioElement.currentTime = 0;
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }

    })
})

const makeNextPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        audioElement.src = `songs/${songIndex + 1}.mp3`;
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
    }

document.getElementById('next').addEventListener('click', (e) => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }

    makeNextPlays();
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1
    }

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


