import React, { useState } from 'react'
import DataTable from '../sharedComp/DataTable'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AdminUser = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [openSnackBar ,setOpenSnackBar] = useState(false)

    const handleClose = ()=>{
        setOpenSnackBar(false);
    } 
  return (
    <div>
        <div className='mx-auto w-[95%] h-[87.7vh] '>
            <div className='flex justify-between items-center h-[15vh]'>
            <div>
                <h1 className='text-2xl font-semibold'>
                    User Data
                </h1>
            </div>
            <div>
                {/* <button className='bg-blue-600 text-white p-2 rounded font-medium active:bg-blue-800' onClick={handleOpen}>Add User</button> */}
            </div>
            </div>
            <div className='bg-white'>
                <DataTable open={open} setOpen={setOpen} setOpenSnackBar={setOpenSnackBar} />
            </div>
            <Snackbar
        anchorOrigin={ {vertical : "top" , horizontal : "center"} }
        autoHideDuration={3000}
        // message="User Updated"
        severity="success"
        variant="filled"
        open={openSnackBar}
        onClose={handleClose}
      ><Alert
      onClose={handleClose}
      severity="success"
      variant="filled"
      sx={{ width: '100%' }}
    >
      "User Updated"
    </Alert></Snackbar>
        </div>
    </div>
  )
}

export default AdminUser