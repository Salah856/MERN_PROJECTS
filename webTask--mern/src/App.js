import React, { Component } from 'react';
import Axios from 'axios';

import StoryButton from './Components/StoryButton/StoryButton';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';
import StoryList from './Components/StoryList/StoryList';
import StoryModal from './Components/StoryModal/StoryModal';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      isLoading: false,
      stories: [],
      story: {
        author: '',
        content: '',
        _id: undefined
      }
    };

    this.apiUrl = 'https://wt-nwambachristian-gmail_com-0.run.webtask.io/wt-mern-api/stories'

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true})
    Axios.get(this.apiUrl).then(({data}) => {
      this.setState({stories: data});
      this.setState({isLoading: false})
    })
  }

  openModal(story) {
    this.setState({modalIsOpen: true});
    if(story) {
      this.setState({story});
    }
  }

  closeModal(model) {
    this.setState({modalIsOpen: false});
    if(model) {
      this.setState({isLoading: true})
      if(!model._id) {
        Axios.post(this.apiUrl, model).then(({data}) => {
          this.setState({stories: [data, ...this.state.stories]});
          this.setState({isLoading: false})
        })
      } else {
        Axios.put(`${this.apiUrl}?id=${model._id}`, model).then(({data}) => {
          const storyToUpdate = this.state.stories.find(x => x._id === model._id);
          const updatedStory = Object.assign({}, storyToUpdate, data)
          const newStories = this.state.stories.map(story => {
            if(data._id === story._id) return updatedStory;
            return story;
          })
          this.setState({stories: newStories});
          this.setState({isLoading: false})
        })
      }
    }
    this.setState({story: {
      author: '',
      content: '',
      _id: undefined
    }})
  }

  handleEdit(id) {
    this.openModal(this.state.stories.find(x => x._id === id))
  }

  handleDelete(id) {
    this.setState({isLoading: true})
    Axios.delete(`${this.apiUrl}?id=${id}`).then(() => {
      const updatedStories = this.state.stories.findIndex(x => x._id === id);
      this.setState({states: [...this.state.stories.splice(updatedStories, 1)]})
      this.setState({isLoading: false})
    })
  }

  render() {

    return (
      <div className="App">
        <div className="col-md-4 col-md-offset-4 Story">

          <div className="StoryHeader">
            <h2>Stories</h2>
          </div>

          <StoryList
              stories={this.state.stories}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
          />

          <div className="StoryFooter">
            <p>Thank you!</p>
          </div>

        </div>
        <StoryModal
            modalIsOpen={this.state.modalIsOpen}
            story={this.state.story}
            closeModal={this.closeModal}
        />
        <LoadingSpinner isLoading={this.state.isLoading} />
        <StoryButton handleClick={this.openModal.bind(this, null)} />
      </div>
    );
  }
}

export default App;
