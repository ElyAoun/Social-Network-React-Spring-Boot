import React, {useState} from 'react';
import {Card, Image} from 'react-bootstrap'
import moment from 'moment'

const Comment = ( {comment} ) => {

  const comment_date = moment(comment.comment_date).format('DD/MM/YYYY HH:MM:SS')

  return (
    <Card style={{marginTop:'1rem', borderRadius:'10px', padding:'0', backgroundColor:'#242526', color:'white'}}>
        <Card.Header style={{padding:'0', margin:'.5rem'}}>
          <Image roundedCircle  style={{width:'2rem', height:'2rem', marginRight:'.5rem'}} src={comment.user.profile_image}></Image>
          {comment.user.name}
        </Card.Header>
        <Card.Body style={{padding:'0', margin:'.5rem'}}>
            <blockquote className="blockquote mb-0">
            <p style={{fontSize:'1rem'}}>
                 {comment.comment_text} 
            </p>
            <footer style={{fontSize:'.8rem'}} className="blockquote-footer">
              {comment_date}
            </footer>
            </blockquote>
        </Card.Body>
    </Card>
  );
};

export default Comment;
