import React, { Component } from "react";

import Stories from "react-insta-stories";

class StatusComponent extends Component {
  render() {
    return (
      <Stories
        stories={this.props.stories}
        onAllStoriesEnd={this.props.onAllStoriesEnd}
      />
    );
  }
}


export default StatusComponent;
