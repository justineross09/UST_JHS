import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import Sublayout from 'components/Layout/Sublayout';
import Box from 'components/UI/Box';
import Image from 'next/image';
import Logo from 'public/defaultavatar.png';
import TextField from 'components/UI/TextField';
import Button from 'components/UI/Buttons/Button';

export default function Login() {
  const [adminName, setAdminName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useLocalStorage('id', '');

  const [data, setData] = useState();

  const submit = async () => {
    axios
      .patch(`http://localhost:5000/api/admin/update-admin/${id}`, {
        name: adminName,
        jobTitle: jobTitle,
        email: email,
      })
      .then(
        (response) => {
          alert('Successful update. Thank you');
          console.log(response);
          window.location.replace('/manageaccount');
        },
        (error) => {
          console.log(error);
        },
      );
  };

  useEffect(() => {
    getData();

    if (id == '' || id == null) {
      window.location.replace('/login');
    }

    console.log(id);
  }, []);

  const getData = async () => {
    await axios
      .get(`http://localhost:5000/api/admin/get-admin/${id}`)
      .then((response) => {
        console.log(response.data.data.adminAccount);
        setData(response.data.data.adminAccount);
        setAdminName(response.data.data.adminAccount?.name);
        setJobTitle(response.data.data.adminAccount?.jobTitle);
        setEmail(response.data.data.adminAccount?.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Sublayout
      className='self-start flex-1'
      show={2}
    >
      <h1 className='my-4 text-3xl font-bold ml-6'>Profile</h1>
      <Box>
        <div className='flex gap-10 items-center'>
          <div className='relative w-48 h-48 rounded-full overflow-hidden p-0.5 bg-white'>
            <Image
              src={Logo}
              alt=''
              className='object-cover rounded-full'
              fill
            />
          </div>
          <div className='flex flex-col gap-4 flex-1 max-w-xl'>
            <TextField
              label='Name'
              placeholder='Admin Name'
              size='sm'
              onChange={(e) => {
                setAdminName(e.target.value);
              }}
              value={adminName}
              edit
            />
            <TextField
              label='Job Title'
              placeholder='Admin'
              size='sm'
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
              value={jobTitle}
              edit
            />
            <TextField
              label='Email Address'
              placeholder='adminemail@gmail.com'
              size='sm'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              edit
            />
          </div>
        </div>
      </Box>
      <div className='flex justify-end mt-10'>
        <Button
          onClick={() => {
            submit();
          }}
        >
          SAVE
        </Button>
      </div>
    </Sublayout>
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

<br />
<br />
<div
  className='sidedesign'
  style={{ marginTop: '4.2%' }}
>
  <p>2</p>
</div>

<div
  className='textgeneral'
  style={{
    marginLeft: '5%',
    paddingTop: '50px',
    position: 'flex',
    textAlign: 'left',
  }}
>
  <p>Profile</p>
  <input
    type='text'
    id='username'
    name='username'
    className='forms2'
    placeholder='Admin Name'
    onChange={(e) => {
      setAdminName(e.target.value);
    }}
    value={adminName}
  />
  <br />
  <input
    type='text'
    id='jobtitle'
    name='jobtitle'
    className='forms2'
    placeholder='Job title'
    onChange={(e) => {
      setJobTitle(e.target.value);
    }}
    value={jobTitle}
  />
  <br />
  <input
    type='text'
    id='email'
    name='email'
    className='forms2'
    placeholder='adminemail@gmail.com'
    onChange={(e) => {
      setEmail(e.target.value);
    }}
    value={email}
  />
  <br />
  <button
    onClick={() => {
      submit();
    }}
    className='forms2'
  >
    Update
  </button>
</div>
<div
  className='boxprofile'
  style={{ fontSize: '20px' }}
>
  <form>
    <label
      htmlfor='username'
      className='textprofile'
    >
      {' '}
      Name:
    </label>
    <input
      type='text'
      id='username'
      name='username'
      className='forms2'
      placeholder='Admin Name'
    />
  </form>
  <form>
    <label
      htmlFor='jobtitle'
      className='textprofile'
    >
      Job Title:
    </label>
    <input
      type='text'
      id='jobtitle'
      name='jobtitle'
      className='forms2'
      placeholder='Admin'
    />
  </form>
  <form>
    <label
      for='email'
      className='textprofile'
    >
      Email Address:
    </label>
    <input
      type='text'
      id='email'
      name='email'
      className='forms2'
      placeholder='adminemail@gmail.com'
    />
  </form>
</div>
</div> */
}

