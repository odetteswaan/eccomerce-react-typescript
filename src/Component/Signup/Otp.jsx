import React, { Component } from 'react'
import {Box,Typography,Button,TextField,styled,Modal} from '@mui/material'
import { Formik ,Form} from 'formik'
import *as Yup from 'yup'
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material'
import Odette  from '../Signin'
import Success from './Success';
import ResetPassword from './ResetPassword';

const OtpSchema = Yup.object().shape({
  field1: Yup.string().required('').matches(/^[0-9]$/, 'Must be a digit'),
  field2: Yup.string().required('').matches(/^[0-9]$/, 'Must be a digit'),
  field3: Yup.string().required('').matches(/^[0-9]$/, 'Must be a digit'),
  field4: Yup.string().required('').matches(/^[0-9]$/, 'Must be a digit'),
});
export default class Otp extends Component {
    constructor(){
        super()
        this.state={
            open:true,
            timer: 120, 
      resendAllowed: false,
      showSuccess:false,
      signin:false

        }
    this.field1Ref = React.createRef();
    this.field2Ref = React.createRef();
    this.field3Ref = React.createRef();
    this.field4Ref = React.createRef();
        this.handleClose=this.handleClose.bind(this)
        this.handleOpen=this.handleOpen.bind(this)
    }
    handleClose(){
        this.props.close()
    }
    handleOpen(){
        this.setState({open:true})
    }
    componentDidMount() {
      this.startTimer();
    }
  
    componentWillUnmount() {
      clearInterval(this.timerInterval); // Clean up the timer on component unmount
    }
  
    startTimer = () => {
      this.timerInterval = setInterval(() => {
        this.setState((prevState) => {
          const newTime = prevState.timer - 1;
          if (newTime <= 0) {
            clearInterval(this.timerInterval);
            return { timer: 0, resendAllowed: true };
          }
          return { timer: newTime };
        });
      }, 1000); // Update every second
    };
    handleResendOtp = () => {
      if (this.state.resendAllowed) {
        this.setState({ timer: 120, resendAllowed: false }, this.startTimer);
      }
    };
  
    handleChange = (event, fieldName, nextFieldRef, setFieldValue) => {
      const value = event.target.value;
      if (value.length <= 1 && /^[0-9]?$/.test(value)) {
        setFieldValue(fieldName, value);
        if (value.length === 1 && nextFieldRef) {
          nextFieldRef.current.focus();
        }
      }
    };
    handleShow(){
      if(this.props.val==='signup'){
        return false
      }
      else{
        return false
      }
    }  
  render() {
    const { open, timer, resendAllowed } = this.state;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return (
      <div>
      {this.state.signin ? (
        <Odette open={true} set={this.props.close} />
      ) : this.state.showSuccess ? (
        <ResetPassword open={true} close={this.handleClose} />
      ) : (

      <Modal
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <CustomCss>
      
      <Box className='Modal-container'>
      <IconButton className='btn-close' onClick={this.handleClose}>
      <CloseIcon/>
      </IconButton>
      
      <Formik
                initialValues={{
                  field1: '',
                  field2: '',
                  field3: '',
                  field4: '',
                }}
                validationSchema={OtpSchema}
                onSubmit={(values) => {
                  console.log('OTP Submitted:', values);
                  if(this.props.val=='signup'){
                    this.setState({signin:true})
                  }
                  else{
                    this.setState({showSuccess:true})
                  }
                }}
              >
                {({ errors, touched, setFieldValue,handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
      <Box className='heading-container'>
      <Typography className='heading'>OTP Verification</Typography>
      <Typography className='subheading'>Please enter the verification code sent to +91 9876543210</Typography>
      </Box>

      <Box className='field-container'>
      <TextField className='textfield'
      name="field1"
      inputRef={this.field1Ref}
                          onChange={(event) =>
                            this.handleChange(event, 'field1', this.field2Ref, setFieldValue)
                          }
                          inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                          error={touched.field1 && Boolean(errors.field1)}
                          helperText={touched.field1 && errors.field1}/>
      <TextField className='textfield'
      name="field2"
      inputRef={this.field2Ref}
                          onChange={(event) =>
                            this.handleChange(event, 'field2', this.field3Ref, setFieldValue)
                          }
                          inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                          error={touched.field2 && Boolean(errors.field2)}
                          helperText={touched.field2 && errors.field2}/>
      <TextField className='textfield'
      name="field3" 
      inputRef={this.field3Ref}
                          onChange={(event) =>
                            this.handleChange(event, 'field3', this.field4Ref, setFieldValue)
                          }
                          inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                          error={touched.field3 && Boolean(errors.field3)}
                          helperText={touched.field3 && errors.field3}/>


      <TextField className='textfield'
      name="field4"
      inputRef={this.field4Ref}
                          onChange={(event) => this.handleChange(event, 'field4', null, setFieldValue)}
                          inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                          error={touched.field4 && Boolean(errors.field4)}
                          helperText={touched.field4 && errors.field4}
      />

      </Box>
      <Box sx={{ mt: 5 }}>
                        {resendAllowed ? (
                          <Typography variant="subtitle">
                            <Typography
                            
                              variant="subtitle"
                              sx={{ fontWeight: 500, color: '#E50158',marginLeft:'25px' }}
                              onClick={this.handleResendOtp}
                              
                            >
                              Resend OTP
                            </Typography>
                          </Typography>
                        ) : (
                          <Typography variant="subtitle" sx={{ml:3}}>
                            Don’t receive OTP?{' '}
                            <Typography variant="subtitle" sx={{ fontWeight: 500, color: '#E50158'}}>
                              Resend OTP in {minutes}:{seconds.toString().padStart(2, '0')}
                            </Typography>
                          </Typography>
                        )}
                      </Box>

                      <Button className='btn-submit' type='submit'>Submit</Button>
      </Form>
                )}
      
      </Formik>
      </Box>
      </CustomCss>
      </Modal>
              )}
      </div>
    )
  }
}
const CustomCss=styled(Box)(({theme})=>({
"& .Modal-container":{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '480px',
    height: "390px",
    backgroundColor: 'white',
    border: 'none',
    boxShadow: 24,
    padding: 4,
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
    

    [theme.breakpoints.down('sm')]:{
        width:'390px',
        height:'393px'
    }
},
"& .heading-container":{
  width:'241px',
  height:'69px',
  marginTop:'40px',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  marginLeft:'25px'

},

"& .heading":{
  fontFamily: 'Rubik',
fontSize: '25px',
fontWeight: '600',
lineHeight: '20px',
letterSpacing: '-0.20000000298023224px',
textAlign: 'center',

},
"& .subheading":{
  fontFamily: 'Rubik',
fontSize: '14px',
fontWeight: 400,
lineHeight: '20px',
letterSpacing: '-0.20000000298023224px',
textAlign: 'center',
marginTop:'9px'

},
"& .field-container":{
  width:'272px',
  height:'56px',
  marginTop:'25px',
  display:'flex',
  gap:10,
  marginLeft:'25px'
},
"& .textfield":{
  width:'56px',
  height:'56px',
  '& .MuiOutlinedInput-root': {
      borderRadius:'12px',
      '& fieldset': {
        border:"1px solid #676767"
      },
      '&:hover fieldset': {
        
      },
      '&.Mui-focused fieldset': {
        border:"3px solid #E50158"
      },
    },
    '& .MuiInputBase-input': {
    textAlign: 'center',  
  },
},
"& .btn-submit":{
  width:'320px',
  height:'48px',
  backgroundColor:'#E50158',
  color:'white',
  borderRadius:'12px',
  marginTop:'29px'
},
"& .btn-close":{
  position:'relative',
  left:'210px',
  top:'5px',
  [theme.breakpoints.down('sm')]:{
    left:'180px'
  }

}


}))