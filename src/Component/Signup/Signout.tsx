import React, { Component } from 'react'
import {Box,Button,styled , Modal, Typography,Grid,TextField,FormControlLabel,Checkbox,InputAdornment} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import {IconButton} from '@mui/material';
import { Formik ,Form } from 'formik';
import * as Yup from 'yup'
import Close from '@mui/icons-material/Close';
import Odette from '../Signin';
import Otp from './Otp';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit number')
    .required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'),undefined], 'Passwords must match')
    .required('Required'),
});
const initialValues={
  name:'',
  surname:'',
  number:'',
  email:'',
  password:'',
  confirmPassword:''
}

interface customprops{
  open:boolean,
  set:()=>void
}
interface customState{
  open:boolean,
  checked?:boolean,
  showpassword:boolean,
  showconfirmpassword:boolean,
  signup:boolean,
  otp:boolean,
  detail:{
    number:string,
    email:string
  },
  value:{
    name:string,
    number:string,
    password:string,
    email:string
  }

}


export default class Signout extends Component<customprops,customState> {
  constructor(props:customprops){
    super(props)
    this.state={
      open:props.open,
      checked:false,
      showpassword: true,
      showconfirmpassword: true,
      signup:false,
      otp:false,
      detail:{
        number:'',
        email:''
      },
      value:{
        name:'',
        number:'',
        password:'',
        email:'chris@yopmail.com'
      }
    }
    this.handleClose=this.handleClose.bind(this)
    this.handleOpen=this.handleOpen.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handlepassword = this.handlepassword.bind(this)
    this.handleconfirmpassword = this.handleconfirmpassword.bind(this)
    this.Signin=this.Signin.bind(this)
    this.OTPpage=this.OTPpage.bind(this)
    this.handleRequest=this.handleRequest.bind(this)
  }

  async handleRequest(){
    var body={
           "user": {
    "name": this.state.value.name,
    "phone_code":"+91",
    "mobile_number":this.state.value.number,
    "password": this.state.value.password,
    "email": this.state.value.email
  }
}
console.log(body)
    try{
      const resp=await axios.post('https://rails-app-ihrz.onrender.com/signup',body)
      console.log(resp)
    }
    catch(error){
          console.log('error is :'+error)
    }


  }
  handleOpen(){
    this.setState({open:true})
  }
  handleClose(){
    this.props.set()
  }
  handlepassword() {
    this.setState({ showpassword: !this.state.showpassword })
  }

  handleconfirmpassword() {
    this.setState({ showconfirmpassword: !this.state.showconfirmpassword })
  }
  Signin(){
    this.setState({signup:true})
      }
      OTPpage(){
        this.setState({open:false})
    this.setState({otp:true

    })}


  handleChange(event: React.ChangeEvent<HTMLInputElement>){
    if(this.state.checked){

      this.setState({checked:!event.target.value})
    }
    else{
      this.setState({checked:true})
    }
    
  }
  render() {
    return (
      <Box>
      {this.state.signup?<Odette open={true} set={this.props.set} />:
        this.state.detail.number?<Otp val='signup' open={true} close={this.props.set} detail={this.state.detail}/>:
<Modal
  open={this.state.open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<CustomCss>
<Box className='modal-container'>

  <Box className='container'>
  <IconButton className='close-icon' onClick={this.handleClose}>
  <Close/>
  </IconButton>
  <Box className='header'>
  <Box className='heading-container'>
  <Typography className='heading'>Register</Typography>
  </Box>
  <Box className='subheading-container'>
  <Typography className='subheading'>Created new account</Typography>
  </Box>
  </Box>

  <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                  this.setState(
                    { value: { number: values.number, email: values.email,name:values.name,password:values.password } },
                    () => {
                      // Log the updated state in the callback
                      console.log(this.state.value);
                      this.handleRequest()
                    }
                  );
                  this.setState(
                    { detail: { number: values.number, email:values.email } },
                    () => {
                      // Log the updated state in the callback
                      console.log(this.state.detail);
                    }
                  );

                }}
              >
              
              {({ values, errors, handleBlur, handleChange, handleSubmit, touched }) => (
                <Form onSubmit={handleSubmit}>
              
              <Grid container spacing={2} className='Grid'>
                 
                  <Grid item sm={12} md={6}   lg={6} >
                    <TextField fullWidth label='First Name' className='textfield' 
                    name='name'
                    onChange={handleChange}
                        onBlur={handleBlur}
                    error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
                    InputProps={{
                      endAdornment:(
                        <InputAdornment position='end'>
                        <PersonIcon className='icon'/>
                        </InputAdornment>
                      )
                    }}/>
                  </Grid>
                  <Grid item sm={12} lg={6} md={6}>
                  <TextField fullWidth label='Last Name' className='textfield'
                  name='surname'
                  onChange={handleChange}
                        onBlur={handleBlur}
                  error={touched.surname && !!errors.surname}
            helperText={touched.surname && errors.surname}
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position='end'>
                      <PersonIcon className='icon'/>
                      </InputAdornment>)}}
                  />
                  </Grid>
                  
                 
                  <Grid item sm={12} lg={6} md={6}>
                  <TextField  fullWidth label='Mobile No.' className='textfield'
                  name='number'
                  onChange={handleChange}
                        onBlur={handleBlur}
                  error={touched.number && !!errors.number}
            helperText={touched.number && errors.number}
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position='end'>
                      <WifiCalling3Icon className='icon'/>
                      </InputAdornment>)}}
                  />
                  </Grid>
                  <Grid item sm={12} lg={6} md={6}>
                  <TextField fullWidth label='Email Id' className='textfield'
                  name='email'
                  onChange={handleChange}
                        onBlur={handleBlur}
                  error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position='end'>
                      <EmailIcon className='icon'/>
                      </InputAdornment>)}}
                  />
                  </Grid>
                
                  <Grid item sm={12} lg={6} md={6}>
                  <TextField fullWidth label='Password' className='textfield'
                  name='password'
                  onChange={handleChange}
                        onBlur={handleBlur}
                  error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
                  type={this.state.showpassword?'text':'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handlepassword}
                          edge="end"
                        >
                          {this.state.showpassword ? <VisibilityOffIcon className='icon'/> : <VisibilityIcon className='icon' />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
            
                  />
                  </Grid>
                  <Grid item sm={12} lg={6} md={6}>
                  <TextField fullWidth label='Confirm Password' className='textfield'
                  name='confirmPassword'
                  onChange={handleChange}
                        onBlur={handleBlur}
                  type={this.state.showconfirmpassword?'text':'password'}
                  error={touched.confirmPassword && !!errors.confirmPassword}
            helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleconfirmpassword}
                          edge="end"
                        >
                          {this.state.showconfirmpassword ? <VisibilityOffIcon className='icon'/> : <VisibilityIcon className='icon' />}
                        </IconButton>
                      </InputAdornment>),
                    }}/>
                  </Grid>
                </Grid>
                <Box className='privacy-policy'>
                <Typography className='privacy-policy-text'>
                <FormControlLabel
                label=''
                
                
                sx={{width:'24px',height:'24px'}}
                  control={
                    <Checkbox
                      className='checkbox'
                      checked={this.state.checked}
                      onChange={this.handleChange}
                      
                    />
                  }
                  
                />
                
                Terms and conditions and Privacy policy</Typography>
                </Box>
                <Box className='btn-container'>
                {this.state.checked?<Button type='submit' className='btn-submit'>Register Now</Button>:<Button className='btn-submit' disabled>Register Now</Button>}
                </Box>
                </Form>)}
          </Formik>


  <Box className='footer'>
  <Typography className='footer-content'>If you have already account? <span className='go-signin' onClick={this.Signin}>Sign In</span></Typography>
  </Box>
  
    </Box>
</Box>
</CustomCss>
</Modal>
                }
      </Box>
    )
  }
}

const CustomCss=styled(Box)(({theme})=>({
"& .modal-container":{
position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '820px',
    height: "552px",
    backgroundColor: 'white',
    border: 'none',
    boxShadow: 24,
    padding: 4,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]:{
      width:'390px',
      height:'733px'
    }
},
"& .container":{
  width:'660px',
  height:'480px',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  
  [theme.breakpoints.down('md')]:{
    width:'320px',
    height:'670px'
  }
},
"& .header":{
  width:'241px',
  height:'48px',
  display:'flex',

  alignItems:'center',
  flexDirection:"column"
},
"& .heading-container":{
  width:'130px',
  height:'20px'
},
"& .heading":{
  fontFamily: 'Rubik',
  fontSize: '25px',
  fontWeight: 600,
  lineHeight: '20pX',
  letterSpacing: '-0.20000000298023224px',
  textAlign: 'center',
  
},
"& .subheading-container":{
  width:'241px',
  height:'20px',
  marginTop:'8px'

},
"& .subheading":{
  fontFamily: 'Rubik',
fontSize: '14px',
fontWeight: 400,
lineHeight: '20px',
letterSpacing: '-0.20000000298023224px',
textAlign: 'center',
color:'#676767'

},
"& .Grid":{
  marginTop:'33px',
  width:'100%'
},
"& .textfield":{
  width:'100%',
  backgroundColor:'#FFF1F6',
  borderRadius:'15px',
  '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
      '& fieldset': {
        border:'none',
        
      },
      '&:hover fieldset': {
        
        borderRadius: '15px',
        
      },
      '&.Mui-focused fieldset': {
        border: '2px solid',
        borderColor: '#E50158',
        
      }
    },
    [theme.breakpoints.down('sm')]:{
      width:'320px'
    }
},
"& .privacy-policy":{
  width:'100%',
  height:'42px',
  marginTop:'8px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',

},
"& .privacy-policy-text":{
  fontFamily: 'Rubik',
fontWeight: 500,
color:'#1C1C1C',
size:'14px',
lineHeight:'26px'

},
"& .checkbox":{
  color:'#E50158'
},
"& .btn-submit":{
  width:'320px',
  height:'50px',
  backgroundColor:'#E50158',
  color:'white',
  borderRadius:'10px',
  marginTop:'12px'
},
"& .footer":{
  width:'253px',
  height:'20px',
  
  marginTop:'36px',
  [theme.breakpoints.down('md')]:{
    marginTop:'16px'
  }
},
"& .footer-content":{
  fontFamily: 'Rubik',
fontSize: '15px',
fontWeight: 400,
lineHeight: '20px',
textAlign: 'center'

},
"& .go-signin":{
  fontFamily: 'Rubik',
fontSize: '15px',
fontWeight: 500,
lineHeight: '20px',
textAlign: 'center',
color:'#E50158',
cursor:'pointer'

},
"& .icon":{
  color:"#E50158"
},
"& .btn-container":{
  width:'100%',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
},
"& .close-icon":{
  position:'relative',
  left:'380px',
  bottom:'30px',
  [theme.breakpoints.down('md')]:{
    left:'180px'
  }

}


}))