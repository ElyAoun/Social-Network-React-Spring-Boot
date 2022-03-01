import React, {useEffect} from 'react'
import {getUserDetails} from '../actions/userActions'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Image} from 'react-bootstrap'

const UserDetailsScreen = () => {

  const dispatch = useDispatch()

  const {id} = useParams()

  const userDetails = useSelector((state)=>state.userDetails)
  const {loading, error, user} = userDetails

  useEffect(()=>{ //runs when the component loads
    dispatch(getUserDetails(id))
  }, [dispatch])

  console.log("id: ", id)

  console.log(user)
  

  return (
      <>
        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : user && (
            <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Image roundedCircle fluid style={{width:'12rem', height:'12rem'}} src={user.data.profile_image}></Image>
                <h2 style={{color:'white', marginTop:'2rem', marginBottom:'3rem'}}>{user.data.name}</h2>
            </div>
            <div style={{color:'white', display:'flex', justifyContent:'center', alignItems:'center', margin:'auto'}}>
                <p><i class="material-icons">email</i> {user.data.email}</p>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <p><i class="material-icons">phone</i> {user.data.phone_number}</p>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <p><i class="material-icons">location_on</i> {user.data.country_of_origin}</p>
            </div>
            </div> 
        )}
      </>
    )
}

export default UserDetailsScreen