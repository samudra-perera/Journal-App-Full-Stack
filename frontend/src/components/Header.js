import React, {useState} from 'react'
import { AppBar, Tabs, Tab, Toolbar, Typography} from '@mui/material'
import { LinkComponent, Link} from 'react-router-dom'
import { Box } from '@mui/system'


export const Header = () => {
    const [value, setValue] = useState();
  return (
    <div>
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant='h3'>MernAuth</Typography>
                <Box sx={{marginLeft: 'auto'}}>
                    <Tabs 
                    indicatorColor='secondary'
                    onChange={(e,val)=>setValue(val)} 
                    value={value} 
                    textColor='inherit'>
                        <Tab to='/login' LinkComponent={Link} label="Login"/>
                        <Tab to='/signup' LinkComponent={Link} label="Sign up"/>
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header