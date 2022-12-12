import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import Mainlayout from 'components/Layout/Mainlayout';
import Box from 'components/UI/Box';
import Button from 'components/UI/Buttons/Button';
import TextField from 'components/UI/TextField';
import Logo from 'public/jhslogo.png';

export default function Login() {
  const [email, setEmail] = useState('');

  const [id, setId] = useLocalStorage('id', '');

  const submit = async () => {
    await axios
      .post('http://localhost:5000/api/admin/forgot-password', {
        email: email,
      })
      .then(
        (response) => {
          console.log(response);
          if (response?.status == '200') {
            alert('valid');
            // console.log(response.data.data.adminAccount._id);
            setId(response.data.data.adminAccount._id);
            window.location.replace('/forgotpassword2');
          }
        },
        (error) => {
          alert('Invalid credential. Please try again');
          console.log('error ' + error);
        },
      );
  };

  return (
    <Mainlayout
      show={1}
      href={'/'}
    >
      <Box className='w-[26rem]'>
        <div className='flex flex-col items-center'>
          <div className='relative w-24 h-24'>
            <Image
              src={Logo}
              alt='Logo'
              fill
            />
          </div>
          <div className='flex flex-col gap-1 w-full mt-5 items-center'>
            <p className='font-medium'>Please enter your email address</p>
            <TextField
              placeholder=''
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Button
              className='mt-4'
              onClick={() => {
                submit();
              }}
            >
              <b>CONFIRM</b>
            </Button>
          </div>
        </div>
      </Box>
    </Mainlayout>
  );
}

// <div style={{ margin: '0%' }}>
//   <div className='topbar'>
//     <img
//       src='ustlogoedited.png'
//       style={{ height: '90%' }}
//     />
//   </div>

//   <a href={'/login'}>
//     <img
//       src='left arrow.png'
//       style={{ height: '80px', marginTop: '5%', marginLeft: '1.5%' }}
//       className='imgback'
//     />{' '}
//   </a>

//   <br />
//   <br />

//   <div className='boxgeneral'>
//     <img
//       src='jhslogo.png'
//       className='logo1'
//     />
//     <center>
//       <p
//         className='textgeneral'
//         style={{ fontWeight: '8' }}
//       >
//         Please enter your Email Address:
//       </p>
//     </center>

//     <input
//       type='text'
//       className='forms1'
//       onChange={(e) => {
//         setEmail(e.target.value);
//       }}
//       value={email}
//     />

//     {/* <Link href={'/forgotpassword2'}> */}
//     <button
//       type='submit'
//       value='CONFIRM'
//       className='submit1'
//       onClick={() => {
//         submit();
//       }}
//     >
//       CONFIRM
//     </button>
//     {/* </Link> */}
//   </div>
// </div>

