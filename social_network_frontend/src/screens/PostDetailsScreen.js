import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post'
import { listPostDetails } from '../actions/postActions'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Row, Col, Form, Button} from 'react-bootstrap'
import Comment from '../components/Comment'
import Picker from 'emoji-picker-react'
import { postComment } from '../actions/commentActions'

const PostDetailsScreen = ( {history, match} ) => {
  
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const dispatch = useDispatch()

    const postDetails = useSelector((state)=>state.postDetails)
    const {loading, error, post} = postDetails;

    const makeComment = useSelector((state)=>state.makeComment)
    const {loading2, error2, comment} = makeComment

    useEffect(()=>{ //runs when the component loads
        dispatch(listPostDetails(id))
    }, [dispatch])

    const {id} = useParams();

    let currentDate = new Date();

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(postComment(id, inputStr, currentDate))
      window.location.href=`/posts/${id}`
  }

    //console.log("id: ", id);
    //console.log("post: ",post);
    //console.log("Comments: ", post.data.comments);

    let post_comments

    if(post){
        post_comments = post.data.comments
        post_comments.sort((a, b) => {
            let da = new Date(a.comment_date),
                db = new Date(b.comment_date);
            return db - da;
        });        
    }

    

    const onEmojiClick = (event, emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
      };
    
    return (
        <> 
            {
                loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : post && (
                    <div className='d-flex'>
                        <Col>
                            <Row><Post  post={post.data} display={false} /></Row>
                            <Row>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail" style={{display:'flex', marginTop:'1rem'}}>
                                        <Form.Control 
                                            type="text" placeholder="Enter comment"
                                            style={{borderRadius:'10px 0 0 10px'}}
                                            value={inputStr}
                                            onChange={e => setInputStr(e.target.value)}>    
                                        </Form.Control>
                                        <img                                    
                                        style={{width:'2rem', cursor:'pointer', backgroundColor:'white', borderRadius:'0 10px 10px 0'}}
                                        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                        onClick={() => setShowPicker(val => !val)} />
                                        {showPicker && <Picker
                                            pickerStyle={{ width: '100%' }}
                                            onEmojiClick={onEmojiClick} />}  
                                        <Button type='submit' variant="outline-success" style={{borderRadius:'10px', marginLeft:'.5rem'}}><i class="far fa-comment-dots fa-lg"></i></Button>
                                    </Form.Group>  
                                </Form> 
                            </Row>
                        {post_comments && (
                            post_comments.map(comment=>(
                                    <Row key={comment.comment_id}>
                                        <Comment comment={comment}/>
                                    </Row>
                            ))
                        )}
                        </Col>         
                    </div>
                )
            }  
        </>
    )
};

export default PostDetailsScreen;
