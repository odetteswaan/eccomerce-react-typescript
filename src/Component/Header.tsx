import React, { Component } from 'react';
import { Box, TextField, Button, FormControl, MenuItem, InputLabel, Select, styled, SelectChangeEvent } from '@mui/material';

import Odette from './Signin';
interface customprops{

}
interface customState{
  open:boolean,
  category:string
}
interface customprops{

}
export default class Header extends Component<customprops,customState> {
    constructor(props:customprops) {
        super(props);
        this.state = {
            category: '',
            open:false
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleclose=this.handleclose.bind(this)
    }

    handleCategoryChange(event: SelectChangeEvent<string>) {
      this.setState({ category: event.target.value });
    }
    handleclose(){
      this.setState({open:false})
    }

    render() {
        


        return (
          <CustomBox>
           <Box className='container'sx={{width:'100%',height:'94px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
           <img src='images/LOGO.png' alt='logo' className='LOGO' height='94px' width='230px'/>

           <Box className='simplebox' sx={{width:'56.25%',height:'68%',display:"flex",mr:5,mt:'20px'}}>
           <Box className='products' sx={{width:'50%'}}>
           <TextField label='Search Product' fullWidth
           InputProps={{ 
            style: { 
                borderTopRightRadius: '0px' ,
                borderBottomRightRadius: '0px'

            } 
        }}
           />
           </Box>
           <Box className='cat-cont'sx={{width:'30%'}}>
           <FormControl variant="outlined" fullWidth className='category'
           
           sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '0px',
            },
            '& .MuiInputBase-root': {
              borderRadius: '0px', 
            }
          }}
           >
           <InputLabel>All Category</InputLabel>
           <Select
             value={this.state.category} 
             onChange={this.handleCategoryChange} 
             label="Category" 
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
           </Select>
         </FormControl>
           </Box>
           <Box sx={{width:'20%'}}>
           <Button sx={{width:'100%',height:'87%',color:'white',backgroundColor:"#E50158" ,borderTopLeftRadius:'none',borderBottomLeftRadius:'none'}}>Search</Button>
           </Box>
           </Box>
           <Box  className='iconbox'sx={{width:'14.66%',height:'68%',mr:5,mt:2,display:'flex',flexWrap:'nowrap',justifyContent:'space-between',alignItems:'center'
           }} >
           <img src="images/Profile.png" alt="account" className="profile" style={{cursor:'pointer'}} onClick={()=>{this.setState({open:true})}}/>
           <img src="images/notification.png" alt="notification" className="notification" />
           <img src="images/Orders.png" alt="orders" className="icon" />
           <img src="images/Cart.png" alt="cart" className="icon" />
           
           </Box>

           
           </Box>
           {this.state.open?<Odette  open={this.state.open} set={this.handleclose} />:''}
           </CustomBox>
        );
    }
}

const CustomBox=styled(Box)(({theme})=>({
"& .simplebox":{
    [theme.breakpoints.down('md')]:{
        width: '100%', // Make the simplebox take full width on small screens
        marginRight: '0', 
        marginTop: '10px', 
        order:1,
        justifyContent:'center',
       
    }
},
"& .products":{
    [theme.breakpoints.down('lg')]:{
        display:'flex',
        justifyContent:'center',
        width:'80%',
        marginLeft:'30px'
    },
    
    '& .MuiOutlinedInput-root': {
        borderBottomRightRadius:'none',
        borderTopRightRadius:'none',
        
    },
    borderColor:'#E50158'
},

"& .container":{
    [theme.breakpoints.down('md')]:{
        flexWrap:'wrap'
    }
},
"& .LOGO":{
    [theme.breakpoints.down('sm')]:{
       width:'180px'
    }
},
"& .iconbox":{
    [theme.breakpoints.down('lg')]:{
      marginRight:'150px'
    },
    [theme.breakpoints.down('sm')]:{
      marginRight:'200px'
    },
   
},

"& .category":{
    [theme.breakpoints.down('lg')]:{
       display:'none',
    }
},
"& .cat-cont":{
    [theme.breakpoints.down('lg')]:{
       display:'none',
       width:'0%'
    }
},
"& .icon":{
    height:'50px',
    width:'50px',
  
},

'& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#E50158',
             borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: '#E50158', borderWidth: '2px',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#E50158', borderWidth: '2px',
          },

        },
  "& .notification":{
    height:'54px',
    width:'60px'
},



}))