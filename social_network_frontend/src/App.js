import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import Header from './components/Header'
import CreatePostScreen from './screens/CreatePostScreen'
import PostDetailsScreen from './screens/PostDetailsScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen'

const App = () => {

  return (
    <Router>
        <Header />
        <main style={{backgroundColor:'#18191A'}}>
          <Container>
            <Routes>
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />}/>
              <Route path= '/' element={<HomeScreen />} exact />
              <Route path='/post' element={<CreatePostScreen />} />
              <Route path='/posts/:id' element={<PostDetailsScreen />} />
              <Route path='/users/:id' element={<UserDetailsScreen />} />
              <Route path='/profile' element={<UpdateProfileScreen />} />
            </Routes>
          </Container>
        </main>
    </Router>
  );
}

export default App;
