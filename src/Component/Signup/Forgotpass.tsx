import React, { Component } from 'react';
import { Box, styled, Typography, Button, Modal, TextField } from '@mui/material';
import { Formik, Form, Field ,FieldProps } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Otp from './Otp'


const Schema = Yup.object().shape({
  email: Yup.string()
    .required('Enter your phone number or email')
    .test('is-valid', 'Must be a valid email or number', (value) => {
      return Yup.string().email().isValidSync(value) || /^[0-9]+$/.test(value);
    }),
});
interface customprops{
  open:boolean,
  set:()=>void
}
interface customstate{
  open:boolean;
  showotp:boolean;
  value:Object
}
interface apl{

}
export default class Forgotpass extends Component<customprops,customstate,apl> {
  constructor(props:customprops) {
    super(props);
    this.state = {
      open: this.props.open,
      showotp:false,
      value:false
    };
    // Bind the method in the constructor
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // Function to open the modal
  handleOpen() {
    this.setState({ open: true });
  }

  // Function to close the modal
  handleClose() {
   this.props.set()
  
  }

  render() {
    return (
      <Box>
      {this.state.showotp?<Otp open={true}  detail={this.state.value} close={this.handleClose}/>:
        <Modal
          open={this.state.open}
          onClose={this.handleClose} // Handle closing the modal correctly
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ border: 'none' }}
        >
        
        <Customcss>
        <Box
        sx={{
          position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '28%',
                height: '35%',
                bgcolor: 'background.paper',
                border: 'none none #000',
                boxShadow: 24,
                p: 4,
                borderRadius: '10px',
              }}
              >
              <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
              <IconButton onClick={this.handleClose}>
              <CloseIcon sx={{width:'18px',height:'18px'}}/>
              </IconButton>
              </Box>
              <Box className='main-container'>
              <Typography variant='h5' className='heading'>
                  Forgot Password
                </Typography>
                <Box className='sub-cont'>
                  <Typography className='subheading'>
                    Please enter your Mobile No Or Email for the verification. We will send 4 digit verification code.
                  </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Schema}
                    onSubmit={(values) => {
                      console.log(values);
                      this.setState({value:values})
                      this.setState({showotp:true})
                    }}
                  >
                    {({ handleSubmit, errors, touched }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field name='email'>
                          {({ field }:FieldProps) => (
                            <TextField
                            className='input'
                              {...field}
                              label='Phone No or Email'
                              variant='outlined'
                              fullWidth
                              margin='normal'
                              sx={{
                                width: '70%',
                                ml: 8,
                              }}
                              error={touched.email && !!errors.email}
                              helperText={touched.email && errors.email}
                            />
                          )}
                        </Field>
                        <Button type='submit' className='submit'>Continue</Button>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Customcss>
        </Modal>}
      </Box>
    );
  }
}

const Customcss = styled(Box)({
  // Add any custom styling for the modal or container here if needed
  '& .heading': {
    fontWeight: 700,
  },
  '& .main-container': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& .subheading': {
    fontFamily: 'Rubik',
    fontSize: '14px',
    fontWeight: 2,
    lineHeight: '20px',
    textAlign: 'center',
  },
  '& .sub-cont': {
    width: '80%',
    marginTop: '1px',
  },
  "& .input":{
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
      '& fieldset': {
        borderColor: '#676767',
      },
      '&:hover fieldset': {
        borderColor: '#E50158',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#E50158',
      },
    }
  },
  "& .submit":{
    width:'70%',
    marginLeft:'64px',
    marginTop:'3px',
    height:'48px',
  backgroundColor:'#E50158',
  border:'none',
  color:'white',
  borderRadius:'10px'
  }
});
