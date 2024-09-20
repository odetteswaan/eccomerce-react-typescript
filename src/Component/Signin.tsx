
import React, { useState } from 'react';
import { Modal, Box, Button, Typography,TextField , InputAdornment,styled} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Signout from './Signup/Signout';


//import Forgotpass from './Signup/Forgotpass';
import ForgotPassword from './Signup/ForgotPassword';


const Odette = ({open,set}:{open:boolean,set:()=>void}) => {
    
const [Create,setCreate]=useState(false)
const [forpass,setForPass]=useState(false)
    function handleClose(){
      set()
    }
    
    const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const  handleforgotpass=()=>{
    setForPass(true)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  async function Register(){
     setCreate(true)
    
    console.log(Create)
}
  console.log(Create)
    return (
      <Customcss>
        {forpass?<ForgotPassword open={true} set={handleClose}/>:
        (Create?<Signout open={Create} set={set}/>:
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 450,
              height:455,
              bgcolor: 'background.paper',
              border: '2px none #000',
              boxShadow: 24,
              p: 4,
              borderRadius:'10px'

            }}
          >
          <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
          <IconButton onClick={handleClose}>
          <CloseIcon sx={{height:'20px',width:'20px',color:'gray'}} style={{ cursor: 'pointer' }}/>
          </IconButton>
          </Box>
          <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',  // Center the text
          }}
        >
          <Typography variant="h4">Hello Again!</Typography>
          <Typography variant="caption" sx={{ display: 'block'}}>
            Sign in to your Account
          </Typography>
          <TextField label='Phone no or email' className='textfield' sx={{mt:2,width:'320px'}}/>
          <Box sx={{width:'320px',height:"80px"}}>
          <TextField
          sx={{mt:'20px'}}
      label="Password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={handlePasswordChange}
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
          <Typography variant="caption" sx={{ display: 'block',ml:'200px',cursor:'pointer'}} onClick={handleforgotpass}>
           Forgot Password
          </Typography>

          </Box>
<Button sx={{width:'320px',backgroundColor:'#E50158',height:'48px',color:'white',mt:3}}>Log In</Button>
<Box sx={{width:'233px',height:'84px',mt:2,ml:15}}>
<Typography>Connect with</Typography>
       
      <Button variant='contained' sx={{backgroundColor:'red',height:'38px',width:'38px',mr:'10px',borderRadius:'50%',minWidth: 0,
        padding: 0,mt:2}}><img src=''/><GoogleIcon/></Button>
      <Button variant='contained' sx={{backgroundColor:'#1877F2',height:'38px',width:'38px',mr:'10px',borderRadius:'50%',minWidth: 0,
        padding: 0,mt:2}}><img src='images/facebook2.png'/></Button>
      

</Box>
<Typography sx={{ display: 'block', mt: 3, fontWeight: 500 }}>
  Don't have an Account yet?{' '}
  <Typography
    component="span"
    sx={{ color: '#E50158', fontWeight: 500, cursor: 'pointer' }}
    onClick={Register}
  >
    SignUp
  </Typography>
</Typography>

        </Box>

          </Box>
        </Modal>)}
      </Customcss>
    );
}
const Customcss=styled(Box)(({theme})=>({


'& .MuiOutlinedInput-root': {
  
        '& fieldset': {
            borderColor: 'red', // Default border color
            borderWidth: '2px', // Adjust border width if needed
        },
        '&:hover fieldset': {
            borderColor: 'red', // Border color on hover
            borderWidth: '2px',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid #E50158',
          borderColor: '#E50158',
        },
      
        
      },
      [theme.breakpoints.down('md')]:{
        width:'390px',
        height:'548px'
      }
  
  })
)
     export default Odette