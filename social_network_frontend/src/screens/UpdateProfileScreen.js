import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateUser} from '../actions/userActions'
import {Form, Row, Col, Image, Button} from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Select from 'react-select'
 
const UpdateProfileScreen = () => {

  const userInfoLocalStorage = localStorage.getItem('userInfo')
  const userData = JSON.parse(userInfoLocalStorage)
   
  //console.log('userData: ',userData)
  const dispatch = useDispatch()

  const userUpdate = useSelector((state)=>state.userUpdate)
  const {loading, error, userInfo} = userUpdate

  const [name, setName] = useState(userData.name)
  const [email, setEmail] = useState(userData.email)
  const [password, setPassword] = useState(userData.password)
  const [confirmPassword, setConfirmPassword] = useState(userData.password)
  const [message, setMessage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number)
  const [country, setCountry] = useState(userData.country_of_origin)
  const [image, setImage] = useState(userData.profile_image)

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
        dispatch(updateUser(userData.id, name, email, password, phoneNumber, country, image))
    }
  }

  if(userInfo){
    localStorage.removeItem('userInfo')
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    window.location.href = "/"
  }

  userInfo && console.log(userInfo)



  return (
    <div style={{display:'flex'}}>
        <FormContainer style={{position:'relative'}}>
          {message && <Message variant='danger'>{message}</Message>}
          <Form onSubmit={submitHandler} style={{color:'white'}}>
              <Form.Group controlId='name'>
                  Name
                  <Form.Control
                            type='name'
                            placeholder='name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                  Email
                  <Form.Control
                            type='email'
                            placeholder='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                  Password
                  <Form.Control
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                  Confirm Password
                  <Form.Control
                            type='password'
                            placeholder='confirm password'
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group controlId='phone_number'>
                  Phone Number
                  <Form.Control
                            type='text'
                            placeholder='phone number'
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                  ></Form.Control>
              </Form.Group>
              
              <Form.Group controlId='country_of_origin'>
                  Country
                  <Select
                    options={countries_options}
                    placeholder="Select Country"
                    onChange={opt => setCountry(opt.value)}
                />
              </Form.Group>

              <Form.Group controlId='profile_image'>
                  Profile
                  <Form.Control
                            type='text'
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Button 
                    type='submit' 
                    variant='outline-success'
                    style={{marginLeft:'30%', marginTop:'1rem', marginBottom:'1.9rem'}}>
                    Update Profile
              </Button>
          </Form>
      </FormContainer>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', color:'white'}}>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Image roundedCircle fluid style={{width:'17rem', height:'12rem'}} src={userData.profile_image}></Image>
            <h2 style={{color:'white', marginTop:'1rem', marginBottom:'1rem'}}>{userData.name}</h2>
          </div>
                
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <p><i class="material-icons">email</i> {userData.email}</p>
                <p><i class="material-icons">phone</i> {userData.phone_number}</p> 
                <p><i class="material-icons">location_on</i> {userData.country_of_origin}</p>
          </div>
      </div> 
    </div>
  )
}

export default UpdateProfileScreen