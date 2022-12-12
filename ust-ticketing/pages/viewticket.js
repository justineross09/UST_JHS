import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Login() {
  return (
    <div style={{ margin: '0%' }}>
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
            style={{ fontWeight: 10 }}
          >
            Enter Tracking Number:
          </p>
        </center>
        <forms>
          <input
            type='text'
            className='forms1'
          />
          <input
            type='submit'
            defaultValue='View Ticket'
            className='submit1'
          />
        </forms>
      </div>
    </div>
  );
}

