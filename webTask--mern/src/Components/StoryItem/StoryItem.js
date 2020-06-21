import React from 'react'
import './StoryItem.css'

export default class StoryItem extends React.Component {
  render() {
    const {
      story,
      handleEdit,
      handleDelete
    } = this.props;
    return (
        <div className="StoryItem clearfix">
          <div className="col-sm-9 StoryItem__content">
            <h4>{story.author}</h4>
            <p>{story.content}</p>
          </div>
          <div className="col-sm-3 StoryItem__control">
            <span
                className="glyphicon glyphicon-edit"
                onClick={handleEdit.bind(this, story._id)}
            />
            <span
                className="glyphicon glyphicon-remove"
                onClick={handleDelete.bind(this, story._id)}
            />
          </div>
        </div>
    )
  }
}

// export default ({story}) => (
//
// )