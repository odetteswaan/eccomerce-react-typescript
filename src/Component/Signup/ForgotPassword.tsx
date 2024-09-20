import React, { Component } from 'react'
import { Box, Typography, Button, Modal, styled, TextField } from '@mui/material'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Otp from './Otp'
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Yup validation schema for either phone or email
const validationSchema = Yup.object({
  phone_or_email: Yup.string()
    .test(
      'phone-or-email',
      'Enter a valid phone number (10 digits) or a valid email address',
      function (value: string | undefined) {
        if (!value) return false; // Check if value is empty or undefined

        const phoneRegex = /^\d{10}$/; // Regex for 10-digit phone number
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for email

        // Return true if value is either a valid phone number or a valid email
        return phoneRegex.test(value) || emailRegex.test(value);
      }
    )
    .required('This field is required')
});

const initialValues = {
  phone_or_email: ''
};

interface customState{
  open:boolean,
  otp:boolean,
  value:{
    phone_or_email:string
  }

}
interface customprops{
  open:boolean,
  set:()=>void
}

export default class ForgotPassword extends Component<customprops,customState> {
  constructor(props:customprops) {
    super(props);
    this.state = {
      open: this.props.open,
      otp:false,
      value:{
        phone_or_email:''
      }
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
   this.props.set()
  }

  render() {
    return (
      <Box>
        {this.state.otp?<Otp open={true} detail={this.state.value} close={this.handleClose}/>:
        <Modal
          open={this.state.open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomCss>
          <Box className="modal-container">
          <IconButton className='close-icon' onClick={this.handleClose}>
          <CloseIcon/>
          </IconButton>
              <Box className="heading-container">
                <Box className="heading">
                  <Typography className="heading-content">Forgot Password</Typography>
                </Box>
                <Box className="subheading">
                  <Typography className="subheading-content">
                    Please enter your Mobile No or Email for the verification. We will send a 4-digit verification code.
                  </Typography>
                </Box>
              </Box>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                  this.setState({otp:true})
                  this.setState({value:values},)
                }}
              >
                {({ handleBlur, handleChange, handleSubmit, errors, values, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <TextField
                      name="phone_or_email"
                      className="textfield"
                      label="Phone No or Email"
                      value={values.phone_or_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone_or_email && Boolean(errors.phone_or_email)}
                      helperText={touched.phone_or_email && errors.phone_or_email}
                    />
                    <Button className="btn-submit" type="submit">
                      Continue
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </CustomCss>
        </Modal>}
      </Box>
    );
  }
}

// Custom styles for the modal
const CustomCss = styled(Box)(({ theme }) => ({
  "& .modal-container": {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: '30px',
    boxShadow: theme.shadows[5],
    outline: 'none',
    width: '480px',
    height: '333px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]:{
      width:'390px',
      height:'333px'
    }
  },
  "& .heading-container": {
    width: '371px',
    height: '69px',
    marginTop: "40px",
    marginLeft: "54px",
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    
  },
  "& .heading": {
    height: '20px',
    width: '200px'
  },
  "& .heading-content": {
    fontFamily: 'Rubik',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '20px',
    textAlign: 'center'
  },
  "& .subheading": {
    height: '40px',
    width: '371px',
    marginTop: '9px'
  },
  "& .subheading-content": {
    fontFamily: 'Rubik',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    textAlign: 'center',
    color: '#676767'
  },
  "& .textfield": {
    marginTop: '28px',
    width: '320px',
    height: '48px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
      '& fieldset': {
        border: '2px solid',
        borderColor: '#E50158'
      },
      '&:hover fieldset': {
        borderColor: '#FF4081'
      },
      '&.Mui-focused fieldset': {
        border: '2px solid',
        borderColor: '#E50158'
      }
    }
  },
  "& .btn-submit": {
    width: '320px',
    height: '48px',
    backgroundColor: '#E50158',
    border: 'none',
    borderRadius: '10px',
    marginTop: '50px',
    color: 'white'
  },
  "& .close-icon":{
    position:'relative',
    left:'200px'
  }
}));
