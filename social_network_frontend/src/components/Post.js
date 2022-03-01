import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Card, Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { likePostAction, unlikePostAction, deletePost } from '../actions/postActions'
import moment from 'moment'

const Post = ( {post, display} ) => {

    const dispatch = useDispatch();

    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(post.number_likes)

    const handleLike = () => {
        dispatch(likePostAction(post.post_id))
        setLikes(post.number_likes+1)
        setIsLiked(true)
    }

    const handleDislike = () => {
        dispatch(unlikePostAction(post.post_id))
        setLikes(post.number_likes)
        setIsLiked(false)
    }

    const handleDeletePost = () => {
        dispatch(deletePost(post.post_id))
        window.location.href="/"
    }

    const userInfo = localStorage.getItem("userInfo")
    const loggedUserInfo = JSON.parse(userInfo)

    const post_date = moment(post.upload_date).format('DD/MM/YYYY HH:MM:SS')

    //console.log('userInfo: ',loggedUserInfo.id)
    //console.log('postUserId:', post.user.id)

    return (
        <Card style={{ fontSize:'.9rem', backgroundColor:"#242526", color:"white", borderRadius:'10px', padding:'0', width:'65%', margin:'auto',  marginTop: '1rem'}} border="success">
            <Card.Header style={{padding:'0', margin:'.5rem', backgroundColor:'#242526', borderBottom:'1px solid green', display:'flex'}}>
                <div style={{margin:'.2rem', alignItems:'center'}}>
                    <Image roundedCircle  style={{width:'2.5rem', height:'2.5rem', marginRight:'.5rem'}} src={post.user.profile_image}></Image>
                </div>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Card.Text style={{marginBottom:'15px'}}>{post.user.name}</Card.Text>
                    <footer className="blockquote-footer" style={{fontSize:'.7rem'}}>{post_date}</footer>
                </div>
                
                <div style={{marginLeft:'30rem'}}>
                    {userInfo && loggedUserInfo.id == post.user.id && (
                        <Button variant="outline-danger" onClick={handleDeletePost} style={{padding:'.3rem'}}><i class="material-icons">delete</i></Button>
                    )}
                </div>        
            </Card.Header>
            <Card.Body style={{padding:'0', margin:'.5rem'}}>
                <strong><Card.Text>{post.post_text}</Card.Text></strong>
            </Card.Body>
            {post.image && (<Card.Img fluid variant="top" style={{width:'55%', maxHeight:'40%', display:'flex', margin:'auto', marginBottom:'1rem'}} src={post.image} />)}
            <Card.Body className="m-auto d-flex border-top w-100" style={{padding:'1rem', margin:'.5rem'}}>
                <Card.Text>{likes} {likes > 1 ? 'Likes' : 'Like'} |  {post.comments.length} {post.comments.length > 1 ? 'Comments' : 'Comment'}</Card.Text>
            </Card.Body>
            {userInfo && (
                <Card.Body className="m-auto d-flex justify-content-center border-top w-100">
                {display && isLiked ? (
                    <Button variant="outline-danger" onClick={handleDislike}>Dislike <i class="far fa-thumbs-down"></i></Button>
                ): (
                    <Button variant="outline-info" onClick={handleLike}>Like <i class="far fa-heart"></i></Button>
                )}
                <Card.Link href={`/posts/${post.post_id}`}><Button variant="outline-success">Comment <i class="far fa-comment-dots"></i></Button></Card.Link>
                </Card.Body>
            )}
            
        </Card>
    )
}

export default Post
