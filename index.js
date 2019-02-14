"use-strict";


const Application = React.createClass({
    getInitialState () {
    return {
      SearchText: "",
      MovieTitle: "",
      VideoID: ""
    };
  },
    
    onChange: function(event) {
    this.setState({[event.target.name]: event.target.value});
        
  },
    handleClick: function(event){
        this.getMovieTitle(this.state.SearchText);
    },
    
    getMovieTrailer: function(Title){
        var that = this;
        if (Title == "") {
		alert("No trailer");
	} else {
var youtubeApi = new XMLHttpRequest();
var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + Title + "trailer&key=AIzaSyCAsg20Dn5gRyZelgwfekpxZaJREBYTBrQ";

youtubeApi.addEventListener("load", function() {
    var result = JSON.parse(this.responseText);
    that.setState({VideoID: "https://www.youtube.com/embed/" + result.items[0].id.videoId + "?html5=1"});
    //console.log(result.items[0].id.videoId);
    //console.log(that.state.VideoID);
});
youtubeApi.open("get", youtubeURL, true);
youtubeApi.send();
    }
    },
    
    getMovieTitle: function(Title) {
        var that = this;
        if (Title == "") {
		alert("Please type the title of a movie");
	} else {
var omdbAPI = new XMLHttpRequest();
var omdbURL = "http://www.omdbapi.com/?s=" + Title + "&type=movie&apikey=7c75e03b";

omdbAPI.addEventListener("load", function() {
    var result = JSON.parse(this.responseText);
    if(result.Search ==undefined){
        alert("No movie found");
    }else{
    that.setState({MovieTitle: result.Search[0].Title});
    that.getMovieTrailer(that.state.MovieTitle);
        }
});

omdbAPI.open("get", omdbURL, true);
omdbAPI.send();
    }
    },

     render: function(){
        return(
            <div>
            <div className="header">
            <h1> Movies & Trailers </h1>
            </div>
            <div className="Search">
            <form className="SearchForm">
        <input
          type="text"
          name="SearchText"
          placeholder="Title"
          onChange={this.onChange}/>
        <button
          type="button"
          className="Btn"
          value="Search"
          onClick={this.handleClick}>Get Movie</button>
        </form>
            </div>
            <div className="MovieTitle">
            <h3>{this.state.MovieTitle}</h3>
            </div>
            <div className="Trailer">
            <iframe width="560" height="315" src={this.state.VideoID} frameborder="0" allowfullscreen></iframe>
            </div>
            </div>
            );
    }
});
ReactDOM.render(
    <Application />, document.getElementById("root")
);
