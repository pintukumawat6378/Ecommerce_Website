import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { width } from '@mui/system';
import axios from 'axios';
import {useState , useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BiBorderRadius } from 'react-icons/bi';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius : "10px"
};



export default function DataTable({open,setOpen , setOpenSnackBar}) {

    const [rows , setRows] = useState([]);
    const [formData,setFormData] = useState({});
    const [edit,setEdit] = useState(false);
    const [loading , setLoading] = useState(null);
    
    // const [rowData , setRowData] = useState({});
    console.log(rows[2]?.userImage)
    console.log(formData);
    const handleClose = () => {
      setOpen(false);
      setFormData({});
      setEdit(false);
    };

    const fetchData = async ()=>{
      setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/users/getAllUsers`);
            
            const newRows = response.data.data.map((item , i)=>{
                return {...item,id : i+1}
            });
            setRows(newRows);
            setLoading(false);
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    } 

    useEffect(()=>{
        fetchData();
    },[]);

    const handleChange = (e)=>{
      setFormData({...formData,[e.target.name] : e.target.value});
    }

    const handleSwitch = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.checked})
    }
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        
          const response = await axios.put(`${import.meta.env.VITE_API_URI}/users/updateUser/${formData._id}`,formData);
          setOpenSnackBar(true);
        handleClose();
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }

    const handleEditCLick = (data)=>{
      setEdit(true)
      setFormData(data);
      setOpen(true);
    }

    const handleDelete = async (id)=>{
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URI}/users/deleteUser/${id}`);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First Name', width: 130 },
      { field: 'lastName', headerName: 'Last Name', width: 130 },
    
      { field: 'email', headerName: 'Email', width: 240 },
      {
        field: 'contactNumber',
        headerName: 'Contact Number',
        
        width: 160,
      },
      {
        // field: 'password',
        headerName: 'Password',
        width: 160,
        renderCell : ()=>(
          <div>
              *****
          </div>
      )
      },
      {
        field : 'status',
        headerName : 'Status',
        width : 160,
        renderCell : (params)=>(
            <div>
               {params.row.status ? "Active" : "Deactive"}
            </div>
        )
      },
      {
        field : 'Action',
        headerName : 'action',
        width : 100,
        renderCell : (params)=>{
            return (
                <div className='flex gap-3 items-center h-full'>
                  <div className='p-2 bg-gray-200 rounded-full shadow-2xl cursor-pointer hover:shadow-inner hover:scale-[1.1] transition hover:bg-blue-600 hover:text-white' onClick={()=>{handleEditCLick(params.row)}} > <CiEdit className='text-xl '  /></div>
                   <div className='p-2 bg-gray-200 rounded-full shadow-xl cursor-pointer hover:shadow-inner hover:scale-[1.1] hover:bg-red-600 hover:text-slate-200 transition' onClick={()=>{handleDelete(params.row._id)}}>
                   <MdDelete className='text-xl' />
                   </div>
                    
                </div>
            )
        }
      },
    ];


  if(loading){
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
      
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {edit ? "Edit User" : "Add User"}
          </Typography>
          <div>
          
          <div >
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-4 my-4'>
              <div>
              <input type="text" placeholder='Firstname' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='firstName' onChange={handleChange} value={formData.firstName || ""} />
              </div>
              <div> <input type="text" placeholder='lastname' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='lastName' onChange={handleChange} value={formData.lastName || ""} /></div>
              <div><input type="email" placeholder='Email' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='email'  onChange={handleChange} value={formData.email || ""} /></div>
              <div><input type="password" placeholder='Password' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='password'  onChange={handleChange} disabled={edit} value={formData.password || ""}/></div>
              <div><input type="number" placeholder='Contact Number' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='contactNumber'  onChange={handleChange} value={formData.contactNumber || ""} /></div>
              <div  className='flex items-center'>
              <Switch defaultChecked={formData.status} name='status' onChange={handleSwitch} />
              <p>{formData.status ? "Active" : "Deactive"}</p>
              </div>
              </div>
              <button type="submit" className='bg-blue-600 text-white p-2 rounded  py-1 active:bg-blue-800'>Submit</button>
            </form>
            
          </div>
        </div>
          
        </Box>
        
      </Modal>
      </div>
      
    </div>
  );
}
