import React, { useEffect, useState } from 'react';
import Kumawat from "../assets/Kumawat.png";
import { IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../redux/slices/authSlice';
import DrawerComponent from '../components/DrawerComponent';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false); // State to manage drawer open state

  const { cartItems } = useSelector((state) => state.cart);
  const { auth, role } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <div className='bg-white flex justify-between items-center p-2 py-4  scroll-smooth shadow-md sticky top-0 z-50'>
      <div>
        <img src={Kumawat} alt="" className='h-11'/>
      </div>
      <div className='flex items-center bg-slate-50 rounded shadow'>
        <input
          type='text'
          placeholder='Search here...'
          className='outline-none bg-transparent py-1 px-2 text-sm w-[25vw]'
        />
        <div className='h-full p-2 px-3 bg-slate-300 rounded-e'>
          <IoMdSearch className='text-2xl' />
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        <IconButton aria-label='cart' onClick={toggleDrawer(true)}>
          <StyledBadge badgeContent={cartItems.length} color='secondary'>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        {auth ? (
          role === 'user' ? (
            <div className='flex items-center gap-2'>
              <Link to='/myorder'>My Order</Link>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogOut}
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className='flex items-center gap-3'>
              <Link to='/adminuser'>User</Link>
              <Link to='/adminproduct'>Product</Link>
              <Link to='/adminorder'>Order</Link>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogOut}
              >
                Log out
              </Button>
            </div>
          )
        ) : (
          <div className='flex gap-2'>
            <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/signup')}>
              Signup
            </Button>
          </div>
        )}
        <div>
          {/* {context.user.name} */}
        </div>
      </div>
      <DrawerComponent open={drawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Navbar;
