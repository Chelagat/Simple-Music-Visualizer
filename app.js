// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.startDisplay = this.startDisplay.bind(this);
    this.menu = new MenuScreen(menuElement, this.startDisplay);



  }
  startDisplay(song, songUrl, gif_urls){
    const musicElement = document.querySelector('#music');
      /*toggle btwn the 2 following lines, for the basic implementation(loading the images as we go), and the extension(preloading the images)*/
    //this.musicScreen = new MusicScreen(musicElement, song, songUrl, gif_urls);
    this.musicScreen = new MusicScreenPreloaded(musicElement, song, songUrl, gif_urls);

  }


}
