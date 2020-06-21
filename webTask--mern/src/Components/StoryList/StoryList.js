import React from 'react'
import FlipMove from 'react-flip-move';

import StoryItem from '../StoryItem/StoryItem'
import './StoryList.css'

export default ({stories, handleEdit, handleDelete}) => (
    <div className="StoryList clearfix">
        <FlipMove duration={350} easing="ease-in-out" enterAnimation="accordionHorizontal">
            {stories.map(story => <StoryItem
                story={story}
                key={story._id}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />)}
        </FlipMove>
    </div>
)