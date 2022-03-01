import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {createPostAction} from '../actions/postActions'
import {Form, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const CreatePostScreen = () => {

  const [image, setImage] = useState('')
  const [postText, setPostText] = useState('')

  const dispatch = useDispatch()

  const createPost = useSelector((state)=>state.createPost)
  const {loading, error, posts} = createPost

  let currentDate = new Date();

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createPostAction(image, 0, postText, currentDate))
      window.location.href="/"
  }

  
  return (
    <FormContainer>
    <h1 style={{color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>Post</h1>
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <Loader/>}
    <Form onSubmit={submitHandler} style={{color:'white', marginBottom:'13.9rem'}}>
        <Form.Group controlId='post_image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
                      type='text'
                      value={image}
                      onChange={(e)=>setImage(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postText'>
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={5}
                      type='text'
                      placeholder='text'
                      name='postText'
                      value={postText}
                      onChange={(e)=>setPostText(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='outline-success' style={{marginLeft:'37%', marginTop:'1rem'}}>Post</Button>
    </Form>
</FormContainer>
  )
};

export default CreatePostScreen;
