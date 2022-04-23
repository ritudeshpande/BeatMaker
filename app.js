class DrumKit {
    constructor() {
        //select pads
        this.pads = document.querySelectorAll('.pad');
        //select sound tracks
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        //select play button
        this.playBtn = document.querySelector('.play');
        //initializing variables
        this.index = 0;
        this.bpm = 250;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll('.mute')
        this.tempoSlider = document.querySelector('.tempo-slider');
    }

    //toggle active bar effect
    activePad() {
        this.classList.toggle("active");
    }

    //loop over pads in each track
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //add animation
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            //play sound
            if(bar.classList.contains('active')){
                if(bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        //increment index
        this.index++;
    }
    //run the looping function at specified bpm
    start() {
        const interval = (60/this.bpm) * 1000;
            if(!this.isPlaying) {
                this.playBtn.innerText = "Stop";
                this.playBtn.classList.add('active');
                this.isPlaying = setInterval(() => {
                this.repeat();
                }, interval);
            } else {
                clearInterval(this.isPlaying);
                this.isPlaying = null;
                this.playBtn.innerText = "Play";
                this.playBtn.classList.remove('active');
        }
    }
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        console.log(selectionName);
        switch(selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains('active')){
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = e.target.value;
    }
    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if(this.playBtn.classList.contains("active")){
            this.start();
        }
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    })
});

drumKit.playBtn.addEventListener("click", () => {
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', (e)=> {
        drumKit.changeSound(e);
    })
})
drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        drumKit.mute(e);
    })
})
drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
})
drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
})