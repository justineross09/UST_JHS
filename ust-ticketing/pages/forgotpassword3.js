import Mainlayout from "components/Layout/Mainlayout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Box from "components/UI/Box";
import Icon from "public/ustlogoedited.png";
import { BsCheck2Circle } from "react-icons/bs";
import Button from "components/UI/Buttons/Button";
export default function Login() {
  return (
    <Mainlayout>
      <Box className="w-[28rem]">
        <div className="flex flex-col items-center text-center">
          <BsCheck2Circle className="w-24 h-24" />
          <h2 className="text-3xl font-bold mt-4">Password Changed! </h2>
          <p className="font-medium ">
            Your password has been changed successfully.
          </p>
          <Link href="/login">
            <Button className="mt-6">FINISH</Button>
          </Link>
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

//   <br />
//   <br />

//   <div className='boxgeneral1'>
//     <center>
//       <p
//         className='textsubhead'
//         style={{ paddingTop: '6%' }}
//       >
//         Password Changed!
//       </p>
//     </center>
//     <center>
//       <p className='textsub'>
//         Your password has been changed successfully.
//       </p>
//     </center>
//     <Link href={'/login'}>
//       <button
//         type='submit'
//         value='CONFIRM'
//         className='submit1'
//       >
//         CONFIRM
//       </button>
//     </Link>
//   </div>
// </div>
