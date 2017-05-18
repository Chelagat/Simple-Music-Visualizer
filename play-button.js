// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(playImage, playContainer, playAudioCallBack, pauseAudioCallBack) {
    this.MATCH_LIST = {
      'images/pause.png':'images/play.png',
      'images/play.png':'images/pause.png'
    };
    this.playImage = playImage;
    this.containerElement = playContainer;
    this.pause_or_play = this.pause_or_play.bind(this);
    this.playImage.addEventListener('click', this.pause_or_play);
    this.playAudioCallBack = playAudioCallBack;
    this.pauseAudioCallBack = pauseAudioCallBack;
  }


  show(){
    this.containerElement.classList.remove('inactive');
  }

  pause_or_play(event){
    const elem = event.currentTarget;
    const url = elem.src;
    if(url.includes('pause')){
      elem.src = 'images/play.png';
      this.pauseAudioCallBack();

    }else{
      elem.src = 'images/pause.png';
      this.playAudioCallBack();

    }
  }
}
