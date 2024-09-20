import React, { Component } from 'react'
import {Box,Typography,styled}from '@mui/material'


export default class Navbar extends Component {
  render() {
    return (
      <CustomBox>
      <Box>
      <Box className='Navbar' >
    <Typography className='Navbar-content'>Free Shipping World wide for all orders over $99. Click and shop Now.</Typography>
    <Box className='img-container'>
    <Box component='img' className='facebook' src='images/google.png'></Box>
    <Box component='img' className='facebook' src='images/facebook.png'></Box>
    <Box component='img' className='facebook' src='images/twitter.png'></Box>
    <Box component='img' className='facebook' src='images/instagram.png'></Box>
    </Box>

      </Box>
        
      </Box>
      
      
      </CustomBox>
    )
  }
}
const CustomBox=styled(Box)(({theme})=>({
    "& .Navbar":{
        height:'50px',
        width:'100%',
        backgroundImage: 'linear-gradient(#E50158,#FFB6D3)', 
        display:'flex',
        alignItems:'Center',
        marginTop:'none !important',
        // [theme.breakpoints.down('sm')]:{
        //   width:'140%'
        // },
        // [theme.breakpoints.down('md')]:{
        //   width:'140%'
        // }
        
    },
    "& .Navbar-content":{
        
        color:'white',
        height:'19px',
        width:'622px',
        fontFamily: "Rubik;",
fontSize: "16px;",
fontWeight: "400;",
lineHeight: "18.96px;",
textAlign: "left;",
marginLeft:'40px'

 },
    "& .img-container":{
        marginLeft:'auto',
        display:'flex',
        gap:14,
        marginRight:'25px',
        
    [theme.breakpoints.down('sm')]:{
          display:'none'
    }
    },

    "& .facebook":{
        width: "15.58px;",
        height: "15.58px;",
        
    
    }

}))