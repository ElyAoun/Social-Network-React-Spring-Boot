import React, {useState, useEffect} from 'react';
import {Navbar, Container, Nav, NavDropdown, Button, Form, FormControl, Image, ListGroup} from 'react-bootstrap'
import {logoutUser, getAllUsers} from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'

const Header = () => {

  const userInfo = localStorage.getItem('userInfo')
  const userData = JSON.parse(userInfo)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    localStorage.removeItem('userInfo')
    window.location.href='/login'
  }

  const usersList = useSelector((state)=>state.usersList)
  const {loading, error, users} = usersList

  const [searchText, setSearchText] = useState('')

  useEffect(()=>{ //runs when the component loads
    dispatch(getAllUsers())
  }, [dispatch])

  //users && console.log(users.data)

  const userObject = (user) => {
    const user_str = user.name + " - " + user.email
    return {label: user_str, value: user.id}
  }

  let users_to_search = []

  users.data && users.data.map(user => users_to_search.push(userObject(user)))


  //users && console.log("users: ", users_to_search)


  return ( 
    <Navbar bg="dark" expand="lg" variant="dark" sticky='top' style={{ height: '4rem'}} >
    <Container fluid className="h-25">
      <Navbar.Brand href="/">Social Network</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        {/* <Form className="d-flex justify-content-center m-auto"> */}
        <Form style={{margin:'auto', width:'30rem'}}>
        {/* <FormControl
              type="search"
              placeholder="Search"
              style={{width:'30rem', marginTop:'5rem'}}
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
        /> */}
        {userInfo && (
          <Select
            options={users_to_search}
            placeholder="Search..."
            onChange={opt => window.location.href = `/users/${opt.value}`}
          />
        )}
        

        {/* <ListGroup style={{margin:'0'}}>
        {searchText && (
            users.data.map(user => (
              user.name.includes(searchText) && (
                <div style={{marginTop:'5rem'}}>
                  <ListGroup.Item>{user.name}</ListGroup.Item>
                </div>    
              )
            ))     
        )}
        </ListGroup> */}
        </Form>
      </Navbar.Collapse>
      {userInfo ?
      <>
        <NavDropdown title={userData.name} style={{backgroundColor:'white'}} id="navbarScrollingDropdown" className='text-primary'>
        <NavDropdown.Item href="/post">Create Post</NavDropdown.Item>
        <NavDropdown.Item href="/profile">Update Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Button onClick={handleLogout}>Logout</Button></NavDropdown.Item>
        </NavDropdown>
        <Image roundedCircle fluid style={{width:'3.5rem', height:'3rem'}} src={userData.profile_image}></Image>
      </>
        :
        <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      }
      
    </Container>
  </Navbar>
)
  
};

export default Header;
