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
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../redux/slices/productSlice';





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



export default function DataTable1({open,setOpen , setOpenSnackBar}) {

    const [rows , setRows] = useState([]);
    const [formData,setFormData] = useState({});
    const [edit,setEdit] = useState(false);
    const [loading , setLoading] = useState(null);

    const dispatch = useDispatch();
    
    // const [rowData , setRowData] = useState({});
    console.log(rows[2]?.userImage)
    console.log(formData);
    const handleClose = () => {
      setOpen(false);
      setFormData({});
      setEdit(false);
    };

    const { products , status  , isSuccess} = useSelector((state)=>state.product)

    // const fetchData = async ()=>{
    //   setLoading(true);
    //     try {
    //         const response = await axios.get("http://localhost:3000/users/getAllUsers");
            
    //         const newRows = response.data.data.map((item , i)=>{
    //             return {...item,id : i+1}
    //         });
    //         setRows(newRows);
    //         setLoading(false);
            
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // } 

    const fetchData = async ()=>{
        
        dispatch(fetchProducts());
      } 

    useEffect(()=>{
        fetchData();
    },[]);

    useEffect(()=>{
        if(products){
            const newRows = products.map((item , i)=>{
            return {...item,id : i+1}
            });
            setRows(newRows);
           
        }
    },[products]);

    const handleChange = (e)=>{
        console.log(e.target)
      setFormData({...formData,[e.target.name] : e.target.files ? e.target.files[0] : e.target.value});
    }

    const handleSwitch = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.checked})
    }
    const handleSubmit = async (e)=>{
      e.preventDefault();
      const data = new FormData();
      data.append("productName" , formData.productName);
      data.append("productPrice" , formData.productPrice);
      data.append("productCategory" , formData.productCategory);
      data.append("productDesc" , formData.productDesc);
      data.append("productImage" , formData.productImage);
      if (edit) {
        console.log(formData);
        dispatch(updateProduct({ id: formData._id, updatedProduct: formData }));
      } else {
        dispatch(createProduct(data));
      }
    }

    useEffect(()=>{
        if(isSuccess){
            setOpen(false);
            setEdit(false);
            setFormData({})
        }
    },[isSuccess]);

    const handleEditCLick = (data)=>{
      setEdit(true)
      setFormData(data);
      setOpen(true);
    }

    const handleDelete = async (id)=>{
      try {
        await dispatch(deleteProduct(id));
      } catch (error) {
        console.log(error);
      }
    }
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'productName', headerName: 'Product Name', width: 130 },
      { field: 'productPrice', headerName: 'Price', width: 130 },
    
      { field: 'productCategory', headerName: 'Category', width: 240 },
      {
        field: 'image',
        headerName: 'image',
        
        width: 160,
        renderCell : (params)=>(
            <div className='flex items-center'>
               <img src={`${import.meta.env.VITE_API_URI}/${params.row.productImage}`} alt="" className='w-16' />
            </div>
        )
      },
    //   {
    //     // field: 'password',
    //     headerName: 'Password',
    //     width: 160,
    //     renderCell : ()=>(
    //       <div>
    //           *****
    //       </div>
    //   )
    //   },
      {
        field : 'status',
        headerName : 'Status',
        width : 160,
        renderCell : (params)=>(
            <div>
               {params.row.status ? "In-Stcok" : "Out of Stock"}
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
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 15]}
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
            {edit ? "Edit Product" : "Add Product"}
          </Typography>
          <div>
          
          <div >
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-4 my-4'>
              <div>
              <input type="text" placeholder='Productname' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='productName' onChange={handleChange} value={formData.productName || ""} />
              </div>
              <div> <input type="text" placeholder='Productprice' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='productPrice' onChange={handleChange} value={formData.productPrice || ""} /></div>
              <div><input type="text" placeholder='Productcategory' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='productCategory'  onChange={handleChange} value={formData.productCategory || ""} /></div>
              <div><input type="text" placeholder='Product Description' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='productDesc'  onChange={handleChange} value={formData.productDesc || ""}/></div>
              <div className='col-span-2'><input type="file" placeholder='Product Image' className='p-2 py-1 outline-none border border-gray-400 rounded ' name='productImage'  onChange={handleChange}  /></div>
              {edit && (
                <div  className='flex items-center'>
                <Switch defaultChecked={formData.status} name='status' onChange={handleSwitch} />
                <p>{formData.status ? "In-Stock" : "Out of Stock"}</p>
                </div>
              )}
              
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
