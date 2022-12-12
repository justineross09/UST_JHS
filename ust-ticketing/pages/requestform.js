import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useCallback } from 'react';

import { useUploadFile } from 'react-firebase-hooks/storage';
import { storage } from '../lib/firebase';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import ShortUniqueId from 'short-unique-id';
import axios from 'axios';
import Sublayout from 'components/Layout/Sublayout';
import TextField from 'components/UI/TextField';
import SelectField from 'components/UI/SelectField';
import TextArea from 'components/UI/TextArea';
import Button from 'components/UI/Buttons/Button';
import Modal from 'components/UI/Modal';
import Logo from 'public/jhslogo.png';

export default function Login() {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow((state) => !state), []);

  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [email, setEmail] = useState('sample@ust.edu.ph');
  const [contact, setContact] = useState('');
  //   const [approvalClearanceSlipment, setApprovalClearanceSlipment] =
  //     useState('');
  const [documentToBeRequested, setDocumentToBeRequested] = useState('Select Document');
  const [deliveryOptions, setDeliveryOptions] = useState('Select Delivery Option');
  const [specialRequest, setSpecialRequest] = useState('');

  function getFileExtention(filename) {
    return (
      filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
      filename
    );
  }

  const [uploadFile, uploading, snapshot] = useUploadFile();
  const [filename, setFilename] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [proofOfPaymentLink, setProofOfPaymentLink] = useState('');

  const uploadFileLink = async (selectedFile) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `files/s${selectedFile.name}${new Date()}`);
      console.log(imageRef);
      setFilename(selectedFile.name);

      const state = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(state.ref);
      console.log(url);
      setFileLink(url);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProofOfPayment = async (selectedFile) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `files/s${selectedFile.name}${new Date()}`);
      console.log(imageRef);
      setFilename(selectedFile.name);

      const state = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(state.ref);
      console.log(url);
      setProofOfPaymentLink(url);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = () => {
    const uid = new ShortUniqueId({ length: 6 });

    const uniqueId = uid();
    axios
      .post('http://localhost:5000/api/requestForm/createRequestForm', {
        name: name,
        studentNumber: studentNumber,
        email: email,
        contact: contact,
        referenceId: uniqueId,
        approvalClearanceSlip: fileLink,
        proofOfPayment: proofOfPaymentLink,
        documentRequested: documentToBeRequested,
        deliveryOption: deliveryOptions,
        specialRequest: specialRequest,
      })
      .then(
        (response) => {
          console.log(response);
          alert(
            'You have successfully submitted a request, your reference id is ' +
              uniqueId,
          );
          // setIsOpen(true);
          toggle();
        },
        (error) => {
          alert('Please complete all the required fields');
          console.log(error);
        },
      );

    // try {

    //   const rawResponse = await fetch(
    //     'http://localhost:5000/api/requestForm/createRequestForm',
    //     {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         name: name,
    //         studentNumber: studentNumber,
    //         email: email,
    //         contact: contact,
    //         referenceId: uid,
    //         approvalClearanceSlip: fileLink,
    //         documentRequested: documentToBeRequested,
    //         deliveryOption: deliveryOptions,
    //         specialRequest: specialRequest,
    //       }),
    //     },
    //   );

    //   const content = await rawResponse.json();

    //   console.log(content);
    //   alert('successful submit of form');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <Sublayout show={3}>
        <div className='flex flex-col items-center gap-10 my-10 max-w-7xl'>
          <h2 className='inline-block text-secondary-500  bg-primary-500 font-bold text-xl px-10 py-2.5 rounded-lg'>
            Request Form
          </h2>
          <div className='grid grid-cols-2 justify-center items-center gap-4'>
            <TextField
              label='Name'
              placeholder=''
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <TextField
              label='Student Number'
              placeholder=''
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if(e.target.value === '' || re.test(e.target.value)){
                  setStudentNumber(e.target.value);
                }
              }}
              value={studentNumber}
            />
            <TextField
              label='Email'
              placeholder=''
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <TextField
              label='Contact Number'
              placeholder=''
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if(e.target.value === '' || re.test(e.target.value)){
                  setContact(e.target.value);
                }
              }}
              value={contact}
            />
            <TextField
              label='Approved Clearance Slip'
              placeholder=''
              type='file'
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : undefined;
                uploadFileLink(file);
              }}
            />
            <TextField
              label='Proof of Payment'
              placeholder=''
              type='file'
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : undefined;
                uploadProofOfPayment(file);
              }}
            />
            <SelectField
              label='Document to be requested'
              data={['Good Moral', 'Diploma', 'Certificate of Enrollment', 'Transcript of Records',
            'Certified True Copy of Grades', 'Certificate of Subject Description', 
            'Certificate of Medium of Instruction', 'Scholastic Records Requirement']}
              setSelected={setDocumentToBeRequested}
              selected={documentToBeRequested}
            />
            <SelectField
              label='Delivery Option'
              data={['Pickup', 'Lalamove', 'Grab', 'Angkas']}
              setSelected={setDeliveryOptions}
              selected={deliveryOptions}
            />
            <TextArea
              label='Special Request'
              className='col-span-2'
              onChange={(e) => {
                setSpecialRequest(e.target.value);
              }}
              value={specialRequest}
            />
            <p className='col-span-2'>
              * Please ensure that you have proof of clearance approval and
              proof of payment before <br /> submitting this form.
            </p>
            <p className='text-sm text-rose-700 font-bold'>* Please ensure to save the tracking number shown after completing the form.</p>
            <div className='col-span-2 flex justify-end font-bold'>
              <Button onClick={async () => await submitForm()}>
                <b>Confirm</b>
              </Button>
            </div>
          </div>
        </div>
      </Sublayout>
      <Modal
        isOpen={show}
        toggle={toggle}
      >
        <div className='flex flex-col items-center px-6'>
          <div className='relative w-24 h-24'>
            <Image
              src={Logo}
              alt='Logo'
              fill
            />
          </div>
          <h2 className='my-8 text-xl font-semibold'>Request Sent.</h2>
          <h3 className='my-8 text-s font-semibold text-center'>Please take your time to give us a feedback <a className='font-bold underline decoration-blue-500' href='https://forms.gle/qZ4tUbERmzcL7DpG8'>here</a>.</h3>
          <Button
            className='mt-12'
            fullWidth
            onClick={() => {
              toggle();
              window.location.replace('/');
            }}
          >
            FINISH
          </Button>
        </div>
      </Modal>
    </>
  );
}

{
  /* <div style={{ margin: '0%' }}>
<div className='sidedesign'></div>
<div
  className='textgeneral'
  style={{ marginLeft: '5%', paddingTop: '50px' }}
>
  <div className='requestform'> Request Form</div>
  <div className='reqformleft'>
    <form>
      <label
        htmlFor='username'
        className='textform'
      >
        {' '}
        Name
      </label>
      <br />
      <input
        type='text'
        id='name'
        name='name'
        className='reqform1'
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
    </form>
  </div>
  <div className='reqformright'>
    <form>
      <label
        htmlFor='username'
        className='textform'
      >
        {' '}
        Student Number
      </label>
      <input
        type='text'
        id='name'
        name='name'
        className='reqform1'
        onChange={(e) => {
          setStudentNumber(e.target.value);
        }}
        value={studentNumber}
      />
    </form>
  </div>
  <div className='reqformleft'>
    <form>
      <label
        htmlFor='username'
        className='textform'
      >
        {' '}
        Email
      </label>
      <br />
      <input
        type='text'
        id='name'
        name='name'
        className='reqform1'
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
    </form>
  </div>
  <div className='reqformright'>
    <form>
      <label
        htmlFor='username'
        className='textform'
      >
        {' '}
        Contact Number
      </label>
      <input
        type='text'
        id='name'
        name='name'
        className='reqform1'
        onChange={(e) => {
          setContact(e.target.value);
        }}
        value={contact}
      />
    </form>
  </div>
  <div className='reqformleft'>
    <label
      htmlFor='username'
      className='textform'
    >
      {' '}
      Approved Clearance Slip
    </label>
    <br />
    <button
      type='clearance slip'
      className='reqform2'
    >
      Choose File{' '}
    </button>
    <div className='filenameform'>No File Chosen</div>
  </div>
  <div className='reqformright'>
    <label
      htmlFor='username'
      className='textform'
    >
      {' '}
      Approved Clearance Slip
    </label>
    <br />
    <input
      id='file'
      name='file'
      type='file'
      className='reqform2'
      onChange={(e) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        uploadFileLink(file);
      }}
    />

    <div className='filenameform'>
      {filename == '' ? 'No File Chosen' : filename}
    </div>
  </div>
  <div className='reqformleft'>
    <form>
      <label
        htmlFor='username'
        className='textform'
      >
        {' '}
        Document to be Requested
      </label>
      <input
        type='text'
        id='name'
        name='name'
        className='reqform1'
        onChange={(e) => {
          setDocumentToBeRequested(e.target.value);
        }}
        value={documentToBeRequested}
      />
    </form>
  </div>
  <div className='reqformright'>
    <form>
      <label
        htmlFor='username'
        className='textform'
      >
        {' '}
        Delivery Options
      </label>
      <div className='reqform3'>
        <select
          name='delivery options'
          id='delivery'
          className='selectdelivery'
          onChange={(e) => {
            setDeliveryOptions(e.target.value);
          }}
          value={deliveryOptions}
        >
          <option
            disabled
            selected
          >
            {' '}
          </option>
          <option value='Pickup'>Pickup</option>
          <option value='Grab'>Grab</option>
          <option value='Lalamove'>Lalamove</option>
          <option value='panda'>panda</option>
        </select>
      </div>
    </form>
  </div>
  <div className='reqformspecial'>
    <label
      htmlFor='username'
      className='textform'
      style={{ marginLeft: '2.5%' }}
    >
      {' '}
      Special Request
    </label>
    <br />
    <input
      type='text'
      id='name'
      name='name'
      className='reqform4'
      onChange={(e) => {
        setSpecialRequest(e.target.value);
      }}
      value={specialRequest}
    />
  </div>
  <div className='reqformspecial1'>
    <div
      className='textform2'
      style={{ paddingTop: 0, marginLeft: '2.5%' }}
    >
      *Please ensure that you have proof of clearance approval and proof
      of payment before submitting this form.
    </div>
  </div>
  <div className='reqformspecial1'>
    <button
      href
      className='button4'
      onClick={async () => await submitForm()}
    >
      Confirm
    </button>
  </div>
</div>
</div> */
}

