// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
//
// See HW4 writeup for more hints and details.
class GifDisplayPreloaded {
  constructor(containerElement, foregroundContainerElement,backgroundContainerElement , foregroundStartIndex, backgroundStartIndex, preloadedImages) {
    this.containerElement = containerElement;
    this.show = this.show.bind(this);
    this.playNextGif = this.playNextGif.bind(this);
    this.foregroundGiphyContainer = foregroundContainerElement;
    this.foregroundGiphyContainer.classList.add('front');
    this.backgroundGiphyContainer = backgroundContainerElement;
    this.backgroundGiphyContainer.classList.add('back');
    this.foregroundIndex = foregroundStartIndex;
    this.backgroundIndex = backgroundStartIndex;
    this.preloadedImages = preloadedImages;
    this.length  =this.preloadedImages.length;
    this.foregroundGiphyContainer.append(this.preloadedImages[this.foregroundIndex]);
    this.backgroundGiphyContainer.append(this.preloadedImages[this.backgroundIndex]);

  }

  show(){
      this.containerElement.classList.remove('inactive');
  }

  playNextGif(){
    if(this.backgroundGiphyContainer.classList.contains('back')){

      this.backgroundGiphyContainer.classList.remove('back');
      this.backgroundGiphyContainer.classList.add('front');
      this.foregroundGiphyContainer.classList.remove('front');
      this.foregroundGiphyContainer.classList.add('back');
      this.foregroundIndex++;
      if(this.foregroundIndex % this.length === this.backgroundIndex) this.foregroundIndex++;
      this.foregroundGiphyContainer.innerHTML = '';
      this.foregroundGiphyContainer.append(this.preloadedImages[this.foregroundIndex % this.length]);
    }else{
    
      this.foregroundGiphyContainer.classList.remove('back');
      this.foregroundGiphyContainer.classList.add('front');
      this.backgroundGiphyContainer.classList.remove('front');
      this.backgroundGiphyContainer.classList.add('back');
      this.backgroundIndex++;
      if(this.backgroundIndex % this.length === this.foregroundIndex) this.backgroundIndex++;
      this.backgroundGiphyContainer.innerHTML = '';
      this.backgroundGiphyContainer.append(this.preloadedImages[this.backgroundIndex % this.length]);

      console.log("PlayNextGif");
    }

  }
}
