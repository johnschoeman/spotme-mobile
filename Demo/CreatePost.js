import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Post Title',
      body: 'Post Body'
    };
  }

  _createPost = async () => {
    const { title, body } = this.state;
    await this.props.createPostMutation({
      variables: {
        title,
        body
      }
    });
  };

  render() {
    return (
      <View style={{width: 300, height: 200}}>
        <View style={{width: 300, height: 200}}>
          <FormLabel>Create Post</FormLabel>
          <FormInput
            value={this.state.title}
            onChangeText={(title) => this.setState({title})}
            placeholder='A title for the post'
          />
          <Text>{"\n"}</Text>
          <FormInput
            value={this.state.body}
            onChangeText={(body) => this.setState({body})}
            placeholder='The body for the post'
          />
        </View>
        <Button
          title="Submit"
          onPress={() => this._createPost()}
        />
      </View>
    )
  }
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $body: String!) {
    createPost(
      title: $title,
      body: $body,
    ) {
      id
      title
      body
    }
  }
`;

// export default CreatePost
export default graphql(CREATE_POST_MUTATION, { name: 'createPostMutation' })(CreatePost)
