// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.



class MusicScreen  {


  constructor(containerElement, song, songUrl, giphy_urls) {
    this.loadContainer = document.querySelector("#load");
    this.loadContainer.classList.add('bottom');

    console.log("In music screen: ", song);
    this.containerElement = containerElement;
    this.foregroundGiphyContainer = document.querySelector('#foreground-gif');
    this.backgroundGiphyContainer = document.querySelector('#background-gif');
    const musicContainer = document.querySelector('#music');
    const playImage = document.querySelector('#play');
    const playContainer =  document.querySelector('#play-option');
    this.foregroundGifDisplay = new GifDisplay(this.foregroundGiphyContainer, giphy_urls, 0);
    this.foregroundGiphyContainer.classList.add('front');
    this.backgroundGifDisplay = new GifDisplay(this.backgroundGiphyContainer, giphy_urls, 10);
    this.backgroundGiphyContainer.classList.add('back');
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.setSong(songUrl);
    this.playAudioCallBack = this.playAudioCallBack.bind(this);
    this.pauseAudioCallBack = this.pauseAudioCallBack.bind(this);
    this.playButton  = new PlayButton(playImage, playContainer, this.playAudioCallBack, this.pauseAudioCallBack);
    this.playButton.show();
    musicContainer.classList.remove('inactive');
    this.audioPlayer.play();
    this.kickCallback = this.kickCallback.bind(this);
    this.audioPlayer.setKickCallback(this.kickCallback);




  }
  playAudioCallBack(){
    this.audioPlayer.play();
  }

  pauseAudioCallBack(){
    this.audioPlayer.pause();
  }

 /*The kickCallback will only begin firing when play() has been called.*/
  kickCallback(){

    if(this.backgroundGiphyContainer.classList.contains('back')){

      this.backgroundGiphyContainer.classList.remove('back');
      this.backgroundGiphyContainer.classList.add('front');
      this.foregroundGiphyContainer.classList.remove('front');
      this.foregroundGiphyContainer.classList.add('back');
      this.foregroundGifDisplay.playNextGif(this.backgroundGifDisplay.currIndex);
    }else{

      this.foregroundGiphyContainer.classList.remove('back');
      this.foregroundGiphyContainer.classList.add('front');
      this.backgroundGiphyContainer.classList.remove('front');
      this.backgroundGiphyContainer.classList.add('back');
      this.backgroundGifDisplay.playNextGif(this.foregroundGifDisplay.currIndex);

    }




  }

}
