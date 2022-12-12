import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import useLocalStorage from 'use-local-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mainlayout from 'components/Layout/Mainlayout';
import Box from 'components/UI/Box';
import Logo from 'public/jhslogo.png';
import Button from 'components/UI/Buttons/Button';
import TextField from 'components/UI/TextField';
import PasswordField from 'components/UI/PasswordField';
import UnstyledButton from 'components/UI/Buttons/UnstyledButton';

export default function Login() {
  const [username, setUsername] = useLocalStorage('name', '');
  const [id, setId] = useLocalStorage('id', '');

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = async () => {
    await axios
      .post('http://localhost:5000/api/admin/login-admin', {
        email: email,
        password: password,
      })
      .then(
        (response) => {
          if (response?.status == '200') {
            alert('valid');
            console.log(response.data.data.adminAccount._id);
            setId(response.data.data.adminAccount._id);
            window.location.replace('/genoverview');
          }
        },
        (error) => {
          alert('Invalid credentials. Please try again');
          console.log('error ' + error);
        },
      );
  };

  useEffect(() => {
    setId('');
  }, []);
  return (
    <Mainlayout
      href='/'
      show={1}
    >
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
              <TextField
                label='Username'
                placeholder='Enter your username'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <PasswordField
                label='Password'
                placeholder='Enter your password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <div className='mt-4 flex flex-col gap-1 items-start'>
                <Button
                  type='submit'
                  onClick={() => {
                    submit();
                  }}
                  className='w-36'
                >
                  Login
                </Button>
                <Link href='/forgot-password1'>
                  <UnstyledButton className='bg-transparent py-1 px-2'>
                    Forgot Password?
                  </UnstyledButton>
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </div>
      {/* <div style={{ margin: "0%" }}>
        <div className="boxgeneral" style={{ height: "700px" }}>
          <label
            htmlFor="username"
            className="textform"
            style={{ fontSize: "25px" }}
          >
            Username
          </label>
          <br />
          <input
            type="email"
            id="name"
            name="name"
            className="login"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <label
            htmlFor="password"
            className="textform"
            style={{ fontSize: "25px" }}
          >
            Password
          </label>
          <br />
          <input
            type="password"
            id="name"
            name="name"
            className="login"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />

          <button
            defaultValue="Login"
            className="submit2"
            onClick={() => {
              submit();
            }}
          >
            Login
          </button>

          <Link href={"/forgot-password1"}>
            <a
              href="../html/forgotpasswordone.html"
              style={{ textDecoration: "none" }}
            >
              <p
                className="textgeneral"
                style={{ fontSize: "23px", marginLeft: "30px" }}
              >
                Forgot Password?
              </p>
            </a>
          </Link>
        </div>
      </div> */}
    </Mainlayout>
  );
}

