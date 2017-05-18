// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
//
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(containerElement, urls, startIndex) {
    this.containerElement = containerElement;
    this.playNextGif = this.playNextGif.bind(this);
    this.currIndex =  startIndex;
    this.length  = urls.length;
    this.containerElement.style.backgroundImage = "url('"+urls[this.currIndex]+"')";
    this.containerElement.classList.add('giphy-background');
    this.urls = urls;




  }

  playNextGif(otherIndex){
    console.log("PlayNexTGif");
    this.currIndex++;
    if(this.currIndex % this.length === otherIndex) this.currIndex++;
    this.containerElement.style.backgroundImage = "url('"+this.urls[this.currIndex % this.length]+"')";

  }

}
