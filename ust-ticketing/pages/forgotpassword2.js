import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Mainlayout from 'components/Layout/Mainlayout';
import Box from 'components/UI/Box';
import Button from 'components/UI/Buttons/Button';
import TextField from 'components/UI/TextField';
import Logo from 'public/jhslogo.png';

import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import PasswordField from 'components/UI/PasswordField';

export default function Login() {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [id, setId] = useLocalStorage('id', '');

  const submit = async () => {
    if (password1 !== password2) {
      alert('Please have the same password. Thank you');
    } else {
      let checkNum = false;
      let specialChar = false;
      let upperCase = false;

      function containsNumbers(str) {
        return Boolean(str.match(/\d/));
      }
      function containsSpecialChars(str) {
        const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;

        const result = specialChars.split('').some((specialChar) => {
          if (str.includes(specialChar)) {
            return true;
          }

          return false;
        });

        return result;
      }

      checkNum = containsNumbers(password1);
      specialChar = containsSpecialChars(password1);

      function charIsLetter(char) {
        if (typeof char !== 'string') {
          return false;
        }
        return /^[a-zA-Z]+$/.test(char);
      }

      for (let i = 0; i < password1.length; i++) {
        let character = password1.charAt(i);

        if (charIsLetter(character)) {
          if (character === character.toUpperCase()) {
            upperCase = true;
          }
        }
      }

      if (password1.length < 8) {
        alert('Password must be at least 8 characters');
      } else if (checkNum == false) {
        alert('Theres no num in password. try again');
      } else if (specialChar == false) {
        alert('Theres no  special character in password. try again');
      } else if (upperCase === false) {
        alert('Theres no  uppercase in password. try again');
      } else {
        await axios
          .patch(`http://localhost:5000/api/admin/update-admin/${id}`, {
            password: password1,
          })
          .then(
            (response) => {
              console.log(response);
              if (response?.status == '200') {
                alert('valid');
                // console.log(response.data.data.adminAccount._id);
                setId(response.data.data.adminAccount._id);
                window.location.replace('/forgotpassword3');
              }
            },
            (error) => {
              alert('Invalid credential. Please try again');
              console.log('error ' + error);
            },
          );
      }
    }
  };

  useEffect(() => {
    if (id == '' || id == null) {
      window.location.replace('/login');
    }

    console.log(id);
  }, []);

  return (
    <Mainlayout
      show={1}
      href={'/'}
    >
      <Box className='w-[28rem]'>
        <form className='flex flex-col gap-2 items-start'>
          <div className='flex flex-col items-center'>
            <p className='font-semibold'>
              Your password must have the following:
            </p>
            <ul className='list-disc font-semibold mb-4'>
              <li>atleast 6 characters long</li>
              <li>atleast one numerical character</li>
              <li>atleast one special character</li>
              <li>one uppercase character</li>
            </ul>
          </div>
          <PasswordField
            label='Enter your new password'
            placeholder=''
            fullWidth
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            value={password1}
          />
          <PasswordField
            label='Re-enter your new password'
            placeholder=''
            fullWidth
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            value={password2}
          />
          <Button
            className='mt-4 mx-auto'
            onClick={() => {
              submit();
            }}
          >
            <b> CONFIRM</b>
          </Button>
        </form>
      </Box>
    </Mainlayout>
  );
}

