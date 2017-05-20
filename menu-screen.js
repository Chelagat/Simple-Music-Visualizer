// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.

const JSON_PATH  = 'https://yayinternet.github.io/hw4-music/songs.json';
const GIPHY_PATH = 'https://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';
class MenuScreen {
  constructor(containerElement, onSubmitCallback) {
    console.log("Here");
    this._onJsonReady = this._onJsonReady.bind(this);
    this._onResponse = this._onResponse.bind(this);
    this._onGiphyJsonReady = this._onGiphyJsonReady.bind(this);
    this._onGiphyResponse = this._onGiphyResponse.bind(this);
    this.containerElement = containerElement;
    this.songSelector = document.querySelector("#song-selector");
    const form = document.querySelector('form');
    this._onSubmit = this._onSubmit.bind(this);
    form.addEventListener('submit', this._onSubmit);
    this.onSubmitCallback = onSubmitCallback;
    this.show = this.show.bind(this);
    this.songs =[];
    fetch(JSON_PATH)
        .then(this._onResponse)
        .then(this._onJsonReady);



    this.show();
  }

  _onSubmit(event) {
    event.preventDefault();
    console.log("On submit");
    const textInput = document.querySelector('#query-input');

    let query = encodeURIComponent(textInput.value);
    query = query.trim();
    query = query.split(' ').join('+');
    console.log(GIPHY_PATH + query + API_KEY);

    fetch(GIPHY_PATH + query + API_KEY)
        .then(this._onGiphyResponse)
        .then(this._onGiphyJsonReady);
  }

  _onGiphyResponse(response){
      console.log("responded");
      return response.json();
  }

  _onGiphyJsonReady(json){
    const giphys =  json['data'];
    if (giphys == null){
       let errorElem = document.querySelector("#error");
       errorElem.classList.remove('inactive');
    }else{
      console.log(giphys);
      this.giphy_urls = [];
      for (let giphy in giphys){
        this.giphy_urls.push(giphys[giphy].images.downsized.url);
        //this.giphy_urls.push((giphys[giphy]['images']['original']['url']));
      }
    console.log(this.giphy_urls);
    this.hide();
    let song_option  =  this.songSelector.options[this.songSelector.selectedIndex].text;
    console.log(song_option);
    let songUrl = this.getSongUrl(this.songs, song_option);
    console.log("songURL: ", songUrl);
    this.onSubmitCallback(song_option, songUrl, this.giphy_urls);
    }
  }

  getSongUrl(songs, song_option){
    console.log("Songs: ",songs);
    for(let song in songs){

      if (songs[song].title === song_option){

         return songs[song].songUrl;
      }
    }
  }

  _onJsonReady(json) {

    console.log(json);
    this.songs = json;
    for (let song in json){
      let song_option = document.createElement("option");
      console.log(json[song].title);
      song_option.textContent = json[song].title;
      song_option.value = json[song].title;
      this.songSelector.options.add(song_option);
    }
}

_onResponse(response) {
  return response.json();
}

  show(event) {
    this.containerElement.classList.remove('inactive');
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
}
