import React, { Component } from 'react'
import {Box,styled,Typography , Modal,Button} from '@mui/material'

interface Customprops{
    open:boolean,
    close:()=>void
}
interface Customstate{
    open:boolean
}
export default class Success extends Component<Customprops,Customstate> {
    constructor(props:Customprops){
        super(props)
        this.state={
            open:this.props.open
        }
        this.handleClose=this.handleClose.bind(this)
        this.handleOpen=this.handleOpen.bind(this)
    }
    
    handleOpen(){
this.setState({open:true})
    }
    handleClose(){
        this.props.close()
      }
  render() {
    return (
      <div>
<Modal
  open={this.state.open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<CustomCss>
<Box className='Container'>
<Box className='x-cont'>
<img src='images/close.png' className='close' onClick={this.handleClose}/>
</Box>
<Box className='subcontainer'>
<img src='images/success.png'/>
<Box className='text-container'>
<Box className='heading'>
<Typography className='heading-content'>Success!</Typography>
</Box>
<Box className='body-container'>
<Typography className='body'>Congratulations your password has been  reset successfully.</Typography>
</Box>
</Box>

</Box>
</Box>
</CustomCss>
</Modal>
        
      </div>
    )
  }
}
const CustomCss=styled(Box)(({theme})=>({
 
    
    "& .Container":{
        position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '426px',
                  height:"314px",
                  backgroundColor: 'white',
                  border:'none',
                  boxShadow: 24,
                  padding: 4,
                  borderRadius:'10px',
                 
        [theme.breakpoints.down('sm')]:{
            width:'390px',
            height:"354px"
    
    }

},
"& .subcontainer":{
    width:'100%',
    height:'100%',
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginTop:'60px'
    
},
"& .text-container":{
    width: '294px',
height: '69px',
top: '487px',
left: '653',

marginTop:'30px'

},
"& .heading":{
    width: '100%',
height: '20px',

gap: '0px',
opacity: '0px',

},
"& .heading-content":{
    fontFamily: 'Rubik',
fontSize: '24px',
fontWeight: '600',
lineHeight: '20px',
textAlign: 'center'

},
"& .body-container":{
    width:'90%',
    height:'40px',

},
"& .body":{
    fontFamily: 'Rubik',
fontSize: '14px',
fontWeight: 400,
lineHeight: '20px',
textAlign: 'center'

},
"& .close":{

cursor:'pointer'

},
"& .x-cont":{
    width:'100%',
    display:'flex',
    justifyContent:'flex-end'
}



}))