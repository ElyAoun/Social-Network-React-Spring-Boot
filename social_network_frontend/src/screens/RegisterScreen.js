import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Select from 'react-select'

const RegisterScreen = ({ location, history }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(' ')
  const [country, setCountry] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state)=>state.userRegister)
  const {loading, error, userInfo} = userRegister

  const countries_options = [
      {label: "Lebanon", value:"Lebanon"},
      {label: "France", value:"France"},
      {label: "England", value:"England"},
      {label: "Russia", value:"Russia"},
      {label: "Siberia", value:"Siberia"},
  ]

  const submitHandler = (e) => {
      e.preventDefault()
      if(password !== confirmPassword){
          setMessage('Password do not match')
      }else{
          dispatch(registerUser(name, email, password, phoneNumber, country, image))
      }
  }

  useEffect(()=>{
    if(userInfo){
      window.location.href = "/login"
    }
  }, [userInfo])

  return (
      <FormContainer style={{margin:'auto'}}>
          <h1 style={{color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>Sign Up</h1>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader/>}
          <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                  <Form.Label style={{color:'white'}}>Name</Form.Label>
                  <Form.Control
                            type='name'
                            placeholder='name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                  <Form.Label style={{color:'white'}}>Email</Form.Label>
                  <Form.Control
                            type='email'
                            placeholder='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                  <Form.Label style={{color:'white'}}>Password</Form.Label>
                  <Form.Control
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                  <Form.Label style={{color:'white'}}>Confirm Password</Form.Label>
                  <Form.Control
                            type='password'
                            placeholder='confirm password'
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group controlId='phone_number'>
                  <Form.Label style={{color:'white'}}>Phone Number</Form.Label>
                  <Form.Control
                            type='text'
                            placeholder='phone number'
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                  ></Form.Control>
              </Form.Group>
              
              <Form.Group controlId='country_of_origin'>
                  <Form.Label style={{color:'white'}}>Country</Form.Label>
                  <Select
                    options={countries_options}
                    placeholder="Select Country"
                    onChange={opt => setCountry(opt.value)}
                    />
              </Form.Group>

              <Form.Group controlId='profile_image'>
                  <Form.Label style={{color:'white'}}>Profile</Form.Label>
                  <Form.Control
                            type='text'
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Button 
                    type='submit' 
                    variant='outline-success'
                    style={{marginLeft:'37%', marginTop:'1rem'}}>
                    Register
              </Button>
          </Form>

          <Row className='py-3'>
              <Col style={{color:'white'}}>
                Have An Account?{' '}
                <Link style={{color:'white'}} to='/login'>Login</Link>
              </Col>
          </Row>
      </FormContainer>
  )
};

export default RegisterScreen;
