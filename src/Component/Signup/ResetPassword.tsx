import React, { Component } from 'react'
import { Button, Typography, Modal, Box, styled, TextField, InputAdornment } from '@mui/material'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Success from './Success';
import CloseIcon from '@mui/icons-material/Close';


const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required')
});
interface Customprops{
  close:()=>void,
  open:boolean
}
interface customstate{
  open:boolean,
  showpassword:boolean,
success:boolean,
  showconfirmpassword:boolean
}

export default class ResetPassword extends Component<Customprops,customstate> {
  constructor(props:Customprops) {
    super(props)
    this.state = {
     open:props.open,
      success:false,
      showpassword: true,
      showconfirmpassword: true
    }
    this.handlepassword = this.handlepassword.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.handleconfirmpassword = this.handleconfirmpassword.bind(this)
  }

  handlepassword() {
    this.setState({ showpassword: !this.state.showpassword })
  }

  handleconfirmpassword() {
    this.setState({ showconfirmpassword: !this.state.showconfirmpassword })
  }
  handleClose(){
    this.props.close()
  }

  render() {
    return (
      <div>
        {this.state.success?<Success open={true} close={this.handleClose}/>:
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomCss>
            <Box className='container'>
            <IconButton onClick={this.handleClose} className='close-icon'>
                  <CloseIcon />
                </IconButton>
              <Box className='subcontainer'>
                <Box className='header'>
                  <Box className='Heading'>
                    <Typography className='heading-content'>Reset Password</Typography>
                  </Box>
                  <Typography className='body'>
                    Set your New Password for your account so you can login & access all the features.
                  </Typography>
                </Box>

                <Formik
                  initialValues={{ password: '', confirmpassword: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log(values);this.setState({success:true})
                  }}
                >
                  {({ values, errors, handleBlur, handleChange, handleSubmit, touched }) => (
                    <Form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        name='password'
                        className='textfield'
                        label="New Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={this.state.showpassword ? 'text' : 'password'}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handlepassword}
                                edge="end"
                              >
                                {this.state.showpassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      <TextField
                        fullWidth
                        className='textfield2'
                        label='Confirm Password'
                        name='confirmpassword'
                        value={values.confirmpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={this.state.showconfirmpassword ? 'text' : 'password'}
                        error={touched.confirmpassword && Boolean(errors.confirmpassword)}
                        helperText={touched.confirmpassword && errors.confirmpassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleconfirmpassword}
                                edge="end"
                              >
                                {this.state.showconfirmpassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      <Button type='submit' className='submit-btn'>Reset Password</Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </CustomCss>
        </Modal>}
      </div>
    )
  }
}

const CustomCss = styled(Box)(({ theme }) => ({
  "& .container": {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '480px',
    height: "393px",
    backgroundColor: 'white',
    border: 'none',
    boxShadow: 24,
    padding: 4,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '393px'
    }
  },
  "& .subcontainer": {
    width: '320px',
    height: '273px',
  },
  "& .header": {
    width: '284px',
    height: '69px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  "& .Heading": {
    width: '188px',
    height: '20px',
  },
  "& .heading-content": {
    fontFamily: 'Rubik',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '20px',
    textAlign: 'center',
  },
  "& .body": {
    fontFamily: 'Rubik',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    textAlign: 'center',
    marginTop: '9px'
  },
  "& .textfield": {
    width: '320px',
    height: '48px',
    marginTop: '19px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFF1F6',
      borderRadius: '16px',
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        borderColor: '#FF4081',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid',
        borderColor: '#E50158',
      },
    },
  },
  "& .textfield2": {
    width: '320px',
    height: '48px',
    marginTop: '19px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFF1F6',
      borderRadius: '16px',
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        borderColor: '#FF4081',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid',
        borderColor: '#E50158',
      },
    },
  },
  '& .submit-btn': {
    width: '100%',
    backgroundColor: '#E50158',
    border: 'none',
    color: 'white',
    marginTop: "22px",
    height: '48px',
    borderRadius: '10px'
  },
  "& .close-icon":{
    position:'relative',
    bottom:'160px',
    left:'360px',
    [theme.breakpoints.down('sm')]:{
      left:'330px'
    }
  }
}));
