const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// -----Render Song.-----
songs = [
    {
        name: 'Khơi lòng',
        author: 'Chubin',
        image: './assets/image/chubin.jpg',
        audio: './assets/music/Tieng-cho-ang-www_tiengdong_com.mp3'
    },
    {
        name: 'Calm Down',
        author: 'Rena x Selena Gomez',
        image: './assets/image/rena.jpg',
        audio: './assets/music/Rema_Ft_Selena_Gomez_-_Calm_Down_Remix_Audio_.mp3'
    },
    {
        name: "Nothin' on me",
        author: 'Leah Marie Perez',
        image: './assets/image/nothin_on_me.jpg',
        audio: './assets/music/ytmp3free.cc_nothin-on-me-leah-marie-perez-sped-up-lyrics-vietsub-youtubemp3free.org.mp3'
    },
    {
        name: 'Remember me',
        author: 'Sơn Tùng MTP',
        image: './assets/image/remember_me.jpg',
        audio: './assets/music/UpgradeRememberMe-SonTungMTP-4263862.mp3'
    },
    {
        name: 'Nhắm mắt thấy mùa hạ',
        author: 'Hà Anh Tuấn',
        image: './assets/image/ha_anh_tuan.jpg',
        audio: './assets/music/Nham-Mat-Thay-Mua-He-OST-Nguyen-Ha-Nguyen-Ha.mp3'
    },
    {
        name: 'Waiting for you',
        author: 'Mono',
        image: './assets/image/waiting_for_you.jpg',
        audio: './assets/music/WaitingForYou-MONOOnionn-7733882.mp3'
    },
    {
        name: 'Hãy Trao Cho Anh',
        author: 'Sơn Tùng MTP',
        image: './assets/image/hay_trao_cho_anh.jpg',
        audio: './assets/music/hay_trao_cho_anh.mp3'
    },
    {
        name: 'Vương Vấn',
        author: 'Hana Cẩm Tiên',
        image: './assets/image/vuong_van.jpg',
        audio: './assets/music/vuong_van.mp3'
    },
    {
        name: 'Chiều xuân xa nhà',
        author: 'Thái Sơn',
        image: './assets/image/chieu_xuan_xa_nha.jpg',
        audio: './assets/music/chieu_xuan_xa_nha.mp3'
    },
    {
        name: 'Em gì ơi (Remix)',
        author: 'Jack x K-ICM',
        image: './assets/image/em_gi_oi.jpg',
        audio: './assets/music/em_gi_oi.mp3'
    },

];
var currSong = songs[0];

const renderSong = songs => {
    const htmls = songs.map(song => {
        // we need to add the active class to song-author and song-options
        // because we already set the color for them, so that they will not
        // inherit color from song (their parent)
        const isCurrSong = song === currSong;
        return `
        <div class="song ${isCurrSong ? 'active-song' : ''}">
                <div class="song-img" style="background-image: url('${song.image}');">
                </div>
                <div class="song-info">
                    <h2 class="song-name ${isCurrSong ? 'active-song' : ''}">${song.name}</h2>

                    <p class="song-author ${isCurrSong ? 'active-song' : ''}">${song.author}</p>
                </div>

                <div class="song-options ${isCurrSong ? 'active-song' : ''}">&#8942</div> <!-- This is the new element -->
            </div>
        `
    })

    $('.playlist').innerHTML = htmls.join('');
    /**
     * Why we have to put the listening click song action here:
     * When you re-render the song list, you're creating new DOM elements for each song. However, the event listeners are only attached to the original song elements, not the new ones.
     * To fix this, you could move the code that attaches the event listeners into the renderSong function, so that the event listeners are re-attached each time the song list is re-rendered. 
     */

    // if user click on a song in the list.
    songEles = $$('.song');
    songEles.forEach((song, index) => {
        song.addEventListener('click', () => {
            // This code will run when the song is clicked
            currSong = songs[index];
            loadSong(currSong);
            audio.play();
        });
    });

}

renderSong(songs);
// ---------------------------


const cd = $('.cd-thumb');
const cdWidth = cd.offsetWidth;
const header = $('.dashboard header');
var songEles;

// ----Scroll top.-----
const handleScrollTop = () => {


    document.onscroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop > 0 ? cdWidth - scrollTop : 0;
        cd.style.width = newCdWidth + 'px';
        cd.style.paddingTop = newCdWidth + 'px';
        cd.style.opacity = newCdWidth / cdWidth;
    }
}

handleScrollTop();
//---------------------

// ---pause and continue----
const audio = $('#audio');
const pauseBtn = $('.fa-pause');
const playingBtn = $('.fa-play');

// spin amination
const cdThumbAnimate = cd.animate([
    // keyframes
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(360deg)' }
], {
    // timing options
    duration: 20000, // The duration property specifies the number of milliseconds each iteration of the animation takes to complete.
    iterations: Infinity
});
cdThumbAnimate.pause();

const pausing = () => {
    pauseBtn.classList.add('hidden');
    playingBtn.classList.remove('hidden');
    audio.pause();
    cdThumbAnimate.pause();
}
const playing = () => {
    playingBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    audio.play();
    cdThumbAnimate.play();
}

playingBtn.onclick = () => {
    playing();
}
pauseBtn.onclick = () => {
    pausing();
}

// ----------------------------

//------ playing song --------

const loadSong = (song) => {
    const html = `
        <h4>Now playing:</h4>
        <h2>${song.name}</h2>
        `;
    header.innerHTML = html;
    cd.style.backgroundImage = `url(${song.image})`;
    audio.src = song.audio;
    // re render to add the active class to current song.
    renderSong(songs);
    // refresh the state of cd thumb when a new song starts playing
    cdThumbAnimate.cancel();
    playing();
}
//------------------------------

// ------Redo and Random-------
const redoBtn = $('.fa-redo');
const randomBtn = $('.fa-random');
var isRedo = false;
var isRandom = false;

redoBtn.onclick = () => {
    if (isRedo) {
        redoBtn.classList.remove('active-btn');
        isRedo = false;
    }
    else {
        redoBtn.classList.add('active-btn');
        isRedo = true;

        if (isRandom) {
            randomBtn.classList.remove('active-btn');
            isRandom = false;
        }
    }
}

randomBtn.onclick = () => {
    if (isRandom) {
        randomBtn.classList.remove('active-btn');
        isRandom = false;
    }
    else {
        randomBtn.classList.add('active-btn');
        isRandom = true;

        if (isRedo) {
            redoBtn.classList.remove('active-btn');
            isRedo = false;
        }
    }
}
//------------------------------

// ------Handle the loading actions-------
const randomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    return songs[randomIndex];
}
const nextSong = () => {
    var nextIndex = songs.indexOf(currSong) + 1;
    if (nextIndex >= songs.length) nextIndex = 0;

    return songs[nextIndex];
}
const prevSong = () => {
    var prevIndex = songs.indexOf(currSong) - 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;

    return songs[prevIndex];
}

// if the curr song has just finished playing
audio.addEventListener('ended', () => {
    console.log('The audio has finished playing');
    if (isRedo) {
        loadSong(currSong);
    }

    else if (isRandom) {
        currSong = randomSong();
        loadSong(currSong);
    }

    else {
        currSong = nextSong();
        loadSong(currSong);
    }

});

// if user click on backward or forward bottom
const backwardBtn = $('.fa-step-backward');
const forwardBtn = $('.fa-step-forward');

backwardBtn.onclick = () => {
    currSong = prevSong();
    loadSong(currSong);
}
forwardBtn.onclick = () => {
    currSong = nextSong();
    loadSong(currSong);
}
// 

// xử lý tua và chạy bài hát ở progress
const progress = $('#progress');

audio.ontimeupdate = () => {
    if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercent;
    }
}

progress.oninput = (e) => {
    const seekTime = e.target.value / 100 * audio.duration;
    audio.currentTime = seekTime;
}

// we need to put (1) before (2) because the height of dashboard will changed after (1) is executed

// (1)
// set the height of .contain is always equal to its width 
const contain = $('.contain');
const containWidth = contain.offsetWidth;
contain.style.height = containWidth + 'px';

// (2)

// why window.onload is needed:
// if without window.onload: when the first time I load the page, the margin top of playlist is different with the times after that
// Solution:The issue you're experiencing might be due to the timing of when your JavaScript code is executed. If your code runs before the page has fully loaded, it might not be able to accurately get the dimensions of the elements.
// Here's a possible solution: You can wrap your code inside a window.onload event handler. This event fires after the entire page has loaded, including all dependent resources such as stylesheets and images.

// set the margin top of playlist as the height of dashboard plus the margin bottom of song by js
window.onload = function () {
    const dashboard = $('.dashboard');
    const dashboardHeight = dashboard.offsetHeight;
    const playlist = $('.playlist');
    // set the margin top of playlist as the height of dashboard plus songMarginBottom
    playlist.style.marginTop = dashboardHeight + 12 + 'px';
}








