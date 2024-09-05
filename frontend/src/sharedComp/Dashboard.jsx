import React from 'react'
import DataTable from './DataTable'

const Dashboard = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
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
                <button className='bg-blue-600 text-white p-2 rounded font-medium active:bg-blue-800' onClick={handleOpen}>Add User</button>
            </div>
            </div>
            <div className='bg-white'>
                <DataTable open={open} setOpen={setOpen} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard