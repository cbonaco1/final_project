var React = require('react');
var NotebookStore = require('./../stores/notebook');
var NotebookApiUtil = require('./../util/notebooks_api_util');
var CurrentUserStore = require('./../stores/currentUserStore');

var Toolbar = React.createClass({

  getInitialState: function() {
    return( {notebooks: NotebookStore.all() } );
  },

  componentWillMount: function() {
    this.listenerToken = NotebookStore.addListener(this._onChange);
    NotebookApiUtil.fetchCurrentUserNotebooks();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _onChange: function() {
    this.setState( {notebooks: NotebookStore.all() } );
  },

  tweetNote: function() {
    var editor = this.props.editor;
    var range = editor.getSelection();
    var tweet;
    //If user has selected text, then use that selected text as the tweet
    if (window.getSelection) {
      tweet = window.getSelection().toString().substr(0, 140);
      if (tweet.length === 0) {
        tweet = this.props.editor.getText(0, 140);
      }
    }

    console.log(tweet);

    var tweetButton = document.getElementById("new-tweet-button");
    tweetButton.href="https://twitter.com/intent/tweet?text=" + encodeURI(tweet);
    tweetButton.setAttribute("target", "_self");
  },

//<i className="fa fa-twitter-square fa-2x sidebar-icon sidebar-twitter"></i>
/*
<a href="https://twitter.com/share" class="twitter-share-button" data-via="CBonacore">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>


*/
  render: function() {

    var tweetButton;

    if (CurrentUserStore.isLoggedIn()) {
      var currentUser = CurrentUserStore.currentUser();
      if (currentUser.provider == "twitter") {
        tweetButton = (
            <a id="new-tweet-button" className="twitter-share-button"
                title="Tweet this note!"
                data-size="large"
                onClick={this.tweetNote}>
                <i className="fa fa-twitter fa-lg"></i>
            </a>
        )
      }
    }

    //TODO style dropdown options
    //NOTE React gives a warning that we set value of the font-size
    //dropdown without giving it a onChange event
    return (
      <div className="toolbar">
        <div className="ql-format-group">
          <button className="ql-bold ql-format-button"></button>
          <button className="ql-italic ql-format-button"></button>
          <button className="ql-underline ql-format-button"></button>
        </div>
        <select className="ql-font">
          <option value="sans-serif">Sans Serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
        <select className="ql-size">
          <option value="10px">Small</option>
          <option value="13px">Normal</option>
          <option value="18px">Large</option>
          <option value="32px">Huge</option>
        </select>
        <select title="Text Color" className="ql-color">
          <option value="rgb(255, 255, 255)"></option>
          <option value="rgb(0, 0, 0)"></option>
          <option value="rgb(255, 0, 0)"></option>
          <option value="rgb(0, 0, 255)"></option>
          <option value="rgb(0, 255, 0)"></option>
          <option value="rgb(0, 128, 128)"></option>
          <option value="rgb(255, 0, 255)"></option>
          <option value="rgb(255, 255, 0)"></option>
        </select>

        {this.props.notebooks}

        <i id="editor-save-icon" className="fa fa-floppy-o sidebar-icon" onClick={this.props.updateNote}></i>

        { tweetButton }

      </div>
    );
  }
});

module.exports = Toolbar;
