import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import Sublayout from 'components/Layout/Sublayout';
import Logo from 'public/7310454.jpg';
import SelectField from 'components/UI/SelectField.jsx';
import Button from 'components/UI/Buttons/Button';
import dayjs from 'dayjs';
import TextArea from 'components/UI/TextArea';




export default function Login() {
  const [data, setData] = useState();
  const [id, setId] = useLocalStorage('id', '');
  const [emailAdd, setEmail] = useState('');
  const [emailNaTalaga, setEmailNaTalaga] = useState('');
  
  

  //Select Value
  const [status, setStatus] = useState('');

  const getData = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    await axios
      .get(`http://localhost:5000/api/requestForm/get-request-form-by-id/${id}`)
      .then((response) => {
        console.log(response);
        setData(response.data?.data?.requestForm);
        setStatus(response.data?.data?.requestForm.status);
       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeStatus = async (status) => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    await axios
      .patch(
        `http://localhost:5000/api/requestForm/update-request-form/${id}`,
        {
          status: status,
        },
      )
      .then((response) => {
        console.log(response);
        setData(response.data?.data?.requestForm);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    if (id == '' || id == null) {
      // window.location.replace("/login");
    }
    console.log(id);
  }, []);

  
  const send = async () => {
    await axios
      .post('http://localhost:5000/api/requestForm/emailSent/',{
        emailAdd:emailAdd,
        status:status,
        emailNaTalaga:emailNaTalaga,
      } )
      .then(
        (response) => {
          if (response?.status == '200') {
            alert('Email Sent');
          }}, 
        (error) => {
          alert('Ticket Failed to Send Contact Support');
          console.log(error);
        },
      );
  };

 

  return (
    <Sublayout
      className='self-start mb-10 flex-1'
      show={2}
    >
      <h1 className='my-4 text-3xl font-bold ml-6'>Ticket Overview</h1>
      <div className='w-full'>
        <div className='overflow-x-auto mt-10'>
          <table className='min-w-full divide-y-2 divide-neutral-200 text-sm'>
            <thead className='bg-tertiary-500'>
              <tr>
                <th className='whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900'>
                  Tracking ID
                </th>
                <th className='whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900'>
                  Name
                </th>
                <th className='whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900'>
                  Student Number
                </th>
                <th className='whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900'>
                  Email
                </th>
                <th className='whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900'>
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody className='divide-y bg-tertiary-200 divide-gray-200 mt-2'>
              <tr className='hover:bg-gray-200'>
                <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                  {data?.referenceId}
                </td>

                <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                  {data?.name}
                </td>

                <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                  {data?.studentNumber}
                </td>

                <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                  {data?.email}
                </td>
                <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                  {dayjs(data?.dateRequested).format('MM/DD/YYYY')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-10 bg-tertiary-200 p-6 rounded-lg'>
        <div className='flex gap-4'>
          <div className=' flex-1'>
            <h2 className='font-bold'>
              Document Requested:
              <span className='font-medium'> Academic Records</span>
            </h2>
            <div className='flex gap-10 mt-6 font-bold'>
              <div>
                <h2>Approved Clearance Slip</h2>
                <div className='relative bg-tertiary-500 w-96 h-96 rounded mt-4 overflow-hidden'>
                  <Image
                    src={data?.approvalClearanceSlip}
                    layout={'fill'}
                    className='object-cover'
                    alt=''
                  />
                </div>
              </div>
              <div>
                <h2>Proof of Payment</h2>
                <div className='relative bg-tertiary-500 w-96 h-96 rounded mt-4 overflow-hidden'>
                  <Image
                    src={data?.proofOfPayment}
                    layout={'fill'}
                    className='object-cover'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-[1px] h-auto mx-6 bg-secondary-800'></div>
          <div className='basis-[500px]'>
            <h2 className='font-bold'>Special Requests:</h2>
            <p className='pr-6 mt-6'>{data?.specialRequest}</p>
            <div className='w-full h-[1px] bg-secondary-800 my-10'></div>
            <div>
              <h2 className='font-bold'>Status</h2>
              <SelectField
                //label='Delivery Option'
                data={[
                  'Pending',
                  'In Progress',
                  'Resolved',
                  'Voided',
                  'Reopened',
                  'Archive',
                ]}
                setSelected={setStatus}
                selected={status}
              />
            </div>
            <div>
            <TextArea
              className='col-span-2 h-45 mt-2'
              placeholder='Enter Message'
              type='text'
              name='message'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              
            />
            {/*<TextArea
              id='emailContent'
              className='col-span-2 h-10 mt-2'
              
              type='text'
              name='message'
              value={data?.email}
              onChange={(e) => {
                setEmailNaTalaga(e.target.value);
              }}
              
            />*/}
           <SelectField
                
                label='Select email address to send email'
                name='email'
                state
                data={[
                  `${data?.email}`,
                ]}
                setSelected={setEmailNaTalaga}
                selected={emailNaTalaga}
              />
            <Button   className='mt-6' type='submit'
                  onClick={() => {
                    send();
                  }}>
                SEND
            </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex mt-10 justify-end gap-6'>
      <Button className='bg-red-600 hover:bg-red-700'>
          Archive 
        </Button> 
        <Button onClick={() => {
            window.location.replace('genoverview');
          }}>BACK TO OVERVIEW</Button>
        <Button
          onClick={() => {
            changeStatus(status);
            window.location.replace('genoverview');
          }}
        >
          Save
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
<div className='sidedesign'>
  <p>2</p>
</div>
<div
  className='textgeneral'
  style={{ marginLeft: '5%', paddingTop: '50px' }}
>
  <p>Ticket Overview</p>
  <table
    id='table1'
    style={{ fontSize: '20px' }}
  >
    <tbody>
      <tr>
        <th>Ticket Number</th>
        <th>Name</th>
        <th>Student Number</th>
        <th>Email</th>
        <th>Date Created</th>
      </tr>
      <tr>
        <td>01</td>
        <td>{data?.name}</td>
        <td>{data?.studentNumber}</td>
        <td>{data?.email}</td>
        <td>{data?.dateRequested}</td>
      </tr>
    </tbody>
  </table>
  <div className='docureq'>
    <div className='row'>
      <div className='column'>
        <table id='table2'>
          <tbody>
            <tr>
              <th>Document Requested</th>
              <td>{data?.documentRequested}</td>
            </tr>
          </tbody>
        </table>
        <table id='table2'>
          <tbody>
            <tr>
              <th>Approved Clearance Slip</th>
              <th>
                <a href={data?.approvalClearanceSlip}>Proof of Payment</a>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='vl' />
      <div className='column2'>
        <div className='row'>
          <div className='column'></div>
        </div>
        <table id='table2'>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
        <table id='table2'>
          <tbody>
            <tr>
              <th>Special requests:</th>
            </tr>
            <tr>
              <td>
                May I request for this to be processed as soon as possible
                because I have a deadline on submitting this document to
                the school I’m applying to.
              </td>
            </tr>
          </tbody>
        </table>
        <div className='vk' />
        <table id='table3'>
          <tbody>
            <tr>
              <th>status:</th>
            </tr>
            <tr>
              <th>
                <select
                  name='status'
                  className='status'
                  onChange={(e) => {
                    changeStatus(e.target.value);
                    getData();
                  }}
                  value={data?.status}
                >
                  <option value>Please choose an option</option>
                  <option value='Pending'>Pending</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Resolved'>Resolved</option>
                  <option value='Voided'>Voided</option>
                  <option value='Reopened'>Reopened</option>
                </select>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div> */
}

