import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import Mainlayout from 'components/Layout/Mainlayout';
import Box from 'components/UI/Box';
import Button from 'components/UI/Buttons/Button';
import Link from 'next/link';
import Logo from 'public/jhslogo.png';

export default function Home() {
  return (
    <Mainlayout>
      <div className='flex items-center justify-center'>
        <Box
          className='w-[26rem]'
          bordered
        >
          <div className='flex flex-col items-center'>
            <div className='relative w-24 h-24'>
              <Image
                src={Logo}
                alt='Logo'
                fill
              />
            </div>
            <h2 className='text-2xl font-bold my-6'>JHS: StuD ReqTics</h2>
            <div className='flex flex-col gap-3 w-full'>
              <Link href='/instructions'>
                <Button>Request Ticket</Button>
              </Link>
              <Link href='/login'>
                <Button>Admin Login</Button>
              </Link>
              <Link href='/tracking'>
                <Button>View Ticket</Button>
              </Link>
            </div>
          </div>
        </Box>
      </div>
    </Mainlayout>
  );
}
{
  /* <div style={{ margin: '0%', maxHeight: 'fit-content' }}>
<div className='topbar'>
  <img
    src='ustlogoedited.png'
    style={{ height: '90%' }}
  />
</div>
<br />
<br />

<div className='boxgeneral'>
  <img
    src='jhslogo.png'
    className='logo1'
  />
  <center>
    <p
      className='textgeneral'
      style={{ textAlign: 'center' }}
    >
      JHS : StuD ReqTics
    </p>
  </center>
  <a
    href='/instructions'
    className='button1'
  >
    REQUEST TICKET
  </a>
  <br className='br1' />
  <a
    href='/login'
    className='button1'
  >
    ADMIN LOGIN
  </a>
  <br className='br1' />
  <a
    href='/tracking'
    className='button1'
  >
    VIEW TICKET
  </a>
  <br className='br1' />
</div>
</div> */
}

