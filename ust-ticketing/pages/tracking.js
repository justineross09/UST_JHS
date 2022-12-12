import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useState } from 'react';
import Mainlayout from 'components/Layout/Mainlayout';
import Box from 'components/UI/Box';
import Button from 'components/UI/Buttons/Button';
import Logo from 'public/jhslogo.png';
import TextField from 'components/UI/TextField';

export default function Login() {
  const [referenceId, setReferenceId] = useState('');

  const submit = async () => {
    axios
      .post('http://localhost:5000/api/requestForm/checkRequestForm', {
        referenceId: referenceId,
      })
      .then(
        (response) => {
          console.log(response);
          if (response.data.data.requestForm.length > 0) {
            alert('Found existing reference id');
            window.location.replace(`/ticketstatus?id=${referenceId}`);
          } else {
            alert('No existing reference id');
          }
        },
        (error) => {
          console.log(error);
        },
      );
  };

  return (
    <Mainlayout
      show={1}
      href={'/'}
    >
      <div className='flex items-center justify-center'>
        <Box className='w-[26rem]'>
          <div className='flex flex-col items-center'>
            <div className='relative w-24 h-24'>
              <Image
                src={Logo}
                alt='Logo'
                fill
              />
            </div>
            <h2 className='text-xl font-medium my-6'>Enter tracking number:</h2>
            <div className='flex flex-col gap-6 w-full'>
              <TextField
                placeholder=''
                onChange={(e) => {
                  setReferenceId(e.target.value);
                }}
                value={referenceId}
              />
              <div className='flex justify-center'>
                <Button
                  onClick={() => {
                    submit();
                  }}
                >
                  VIEW TICKET
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </Mainlayout>
  );
}

