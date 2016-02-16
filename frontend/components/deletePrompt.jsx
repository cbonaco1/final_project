var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var DeletePrompt = React.createClass({

  render: function() {
    return(
      <div className="delete-prompt" key={this.props.key}>
        <p>Are you sure you want to delete this note?</p>
        <div className="prompt-buttons-group group">
          <button className="prompt-buttons form-button"
                  onClick={this.props.deleteFunction}>Yes</button>

          <button className="prompt-buttons cancel-button promt-cancel-button"
                  onClick={this.props.callback}>Cancel</button>
        </div>
      </div>
    );
  }

});

module.exports = DeletePrompt;
