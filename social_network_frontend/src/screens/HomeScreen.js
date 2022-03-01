import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listPosts } from '../actions/postActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Row} from 'react-bootstrap'
import Post from '../components/Post'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const postsList = useSelector((state)=>state.postList)

    const {loading, error, posts } = postsList


    useEffect(()=>{ //runs when the component loads
        dispatch(listPosts())
    }, [dispatch])
    

    return (
        <div className='d-f'>
            {
                loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : posts && posts.length && (
                    <>
                        {posts.map(post=>(
                            <Row key={post.post_id}>
                                <Post post={post} display={true}/>
                            </Row>
                        ))}
                    </>
                )
            }    
        </div>
    )
}

export default HomeScreen
