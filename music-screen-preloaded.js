/*Extension: Preloading images, and passing array of image objects to the gif display class*/




class MusicScreenPreloaded  {


  constructor(containerElement, song, songUrl, giphy_urls) {
    this.finishedPreloading = this.finishedPreloading.bind(this);
    this.containerElement = containerElement;
    this.loadContainer = document.querySelector("#load");
    this.loadContainer.classList.add('top');
    this.foregroundGiphyContainer = document.querySelector('#foreground-gif');
    this.backgroundGiphyContainer = document.querySelector('#background-gif');
    const musicContainer = document.querySelector('#music');
    musicContainer.classList.remove('inactive');
    const playImage = document.querySelector('#play');
    const playContainer =  document.querySelector('#play-option');
    this.kickCallback = this.kickCallback.bind(this);
    this.preloadedImages = [];
    for(let url in giphy_urls){
        let height = window.innerHeight - 70;
        let width  = window.innerWidth;
        console.log("Height: ",height, "Width: ", width);
        let myImage = new Image(width, height);
        myImage.src = ""+ giphy_urls[url];
        this.preloadedImages.push(myImage);
    }
    this.playAudioCallBack = this.playAudioCallBack.bind(this);
    this.pauseAudioCallBack = this.pauseAudioCallBack.bind(this);
    this.playButton  = new PlayButton(playImage, playContainer, this.playAudioCallBack, this.pauseAudioCallBack);
    this.playButton.show();
    this.gifDisplay = new GifDisplayPreloaded(musicContainer, this.foregroundGiphyContainer, this.backgroundGiphyContainer, 0, 10, this.preloadedImages);
    this.finishedPreloading(songUrl);

  }

  playAudioCallBack(){
    this.audioPlayer.play();
  }

  pauseAudioCallBack(){
    this.audioPlayer.pause();
  }

  finishedPreloading(songUrl){
    console.log('fin');
    this.loadContainer.classList.remove('top');
    this.loadContainer.classList.add('bottom');
    this.gifDisplay.show();
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.setSong(songUrl);
    this.audioPlayer.play();

    this.audioPlayer.setKickCallback(this.kickCallback);
  }


  kickCallback(){
    console.log("in kickCallBAck function");
    this.gifDisplay.playNextGif();
    }





}
