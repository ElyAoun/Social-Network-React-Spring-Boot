import React, {useState, useEffect} from 'react';
import { loginUser } from '../actions/userActions';
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {Link, Redirect} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state)=>state.userLogin)
  const {loading, error, userInfo} = userLogin

  useEffect(()=>{
      if(userInfo){
        window.location.href = "/"
      }
  }, [userInfo])

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(loginUser(email, password))
  }

  return (
    <FormContainer>
      <h1 style={{color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} style={{color:'white'}}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='outline-success' style={{marginLeft:'37%', marginTop:'1rem'}}>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col style={{color:'white'}}>
          New User?{' '}
          <Link to='/register' style={{color:'white'}}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
};

export default LoginScreen;
