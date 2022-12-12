import Mainlayout from 'components/Layout/Mainlayout';
import Box from 'components/UI/Box';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Logo from 'public/jhslogo.png';
import Button from 'components/UI/Buttons/Button';
import Link from 'next/link';

export default function Login() {
  return (
    <Mainlayout
      href='/'
      show={1}
    >
      <Box
        className='w-[38rem]'
        bordered
      >
        <div className='flex flex-col gap-6 items-center justify-center text-center font-medium'>
          <div className='relative w-24 h-24'>
            <Image
              src={Logo}
              alt='Logo'
              fill
            />
          </div>
          <p>
            Please be informed that you would be needing an approved clearance
            form before proceeding to the request form.
          </p>
          <p>
            Click the &apos;CLEARANCE FORM&apos; button to file for the
            clearance. Once you have your clearance APPROVED, you may click
            &apos;SEE PAYMENT DETAILS&apos; button to proceed with payment.
          </p>
          <div className='flex gap-4'>
            <Link href='https://drive.google.com/uc?export=download&id=15roljwFQoWk61ZNeI0g75cj2UjO_EkIb'>
            <Button size='sm'>CLEARANCE FORM</Button>
            </Link>
            <Link href='https://drive.google.com/file/d/1X3DxMHKsVR4BZuOqsI28K0W1wBx0-9Mi/view?usp=sharing'>
            <Button size='sm'>SEE PAYMENT DETAILS</Button>
            </Link>
          </div>
          <p>Already have an approved clearance slip and payment receipt?</p>
          <p className='text-sm text-rose-700'>*Please ensure to save the tracking number shown after completing the form.</p>
          <Link href='/requestform'>
            <Button>PROCEED TO REQUEST FORM</Button>
          </Link>
        </div>
      </Box>
    </Mainlayout>
  );
}

{
  /* <div style={{ margin: '0%' }}>
<div className='topbar'>
  <img
    src='ustlogoedited.png'
    style={{ height: '90%' }}
  />
</div>
<div className='boxinstruction'>
  <img
    src='jhslogo.png'
    className='logo1'
  />
  <center>
    <p className='instructions'>
      Please be informed that you would be needing an approved clearance
      form before proceeding to the request form.{' '}
    </p>
  </center>
  <center>
    <p className='instructions'>
      Click the <b>‘CLEARANCE FORM’</b> button to file for clearance. Once
      you have your clearance <b>APPROVED</b>, you may click{' '}
      <b>‘SEE PAYMENT DETAILS’</b> button to proceed with payment.
    </p>
  </center>
  <a
    href
    className='button2'
  >
    CLEARANCE FORM
  </a>
  <a
    href
    className='button2'
  >
    SEE PAYMENT DETAILS
  </a>
  <center>
    <p className='instructions'>
      Already have an approved clearance slip and payment receipt?
    </p>
  </center>
  <a
    href='/requestform'
    className='button3'
    style={{ lineHeight: '30px', paddingTop: '2%' }}
  >
    PROCEED TO REQUEST FORM
  </a>
</div>
</div> */
}

