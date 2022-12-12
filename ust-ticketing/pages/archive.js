import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import Mainlayout from '../components/Layout/Mainlayout';
import Box from '../components/UI/Box';
import BarChart from '../components/UI/BarChart';
import Button from 'components/UI/Buttons/Button.jsx';
import dayjs from 'dayjs';

export default function Login() {
  const [data, setData] = useState();
  const [id, setId] = useLocalStorage('id', '');
  const [archiveNumber, setArchiveNumber] = useState(0);
  const getData = async () => {
    await axios
      .get(`http://localhost:5000/api/requestForm/get-all-archive-form`)
      .then((response) => {
        //console.log(response.data.data.requestForm);
        setData(response.data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();

    if (id == '' || id == null) {
      window.location.replace('/login');
    }

    console.log(id);
  }, []);

  return (
    <Mainlayout
      className='self-start flex-1'
      show={2}
    >
      <h1 className='my-4 text-3xl font-bold ml-6'>Archived Tickets</h1>
      <div className='mt-10 flex w-full'>
      </div>
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
                Document
              </th>
              <th className='whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900'>
                Date Created
              </th>
              <th className='whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900'>
                Status
              </th>
              <th className='whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900'></th>
            </tr>
          </thead>
          <tbody className='divide-y bg-tertiary-200 divide-gray-200 mt-2'>
            {data?.requestForm?.map((item, key) => {
              return (
                <tr
                  className='hover:bg-gray-200'
                  key={key}
                >
                  <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                    {item?.referenceId}
                  </td>

                  <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                    {item?.name}
                  </td>

                  <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                    {item?.documentRequested}
                  </td>

                  <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                    {dayjs(item?.dateRequested).format('MM/DD/YYYY')}
                  </td>

                  <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                    {item?.status}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                    <Button
                      size='sm'
                      color='yellow'
                      onClick={() => {
                        window.location.replace(
                          `/ticketoverview?id=${item._id}`,
                        );
                      }}
                    >
                      VIEW
                    </Button>
                  </td>
                </tr>
              );
            })}
            {/* 
            <tr className='hover:bg-gray-200'>
              <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                1
              </td>

              <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                Gary
              </td>

              <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                Document
              </td>

              <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                12/05/2022
              </td>

              <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                Resolved
              </td>
              <td className='whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900'>
                <Button
                  size='sm'
                  color='yellow'
                >
                  VIEW
                </Button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </Mainlayout>
  );
}

const Card = ({ value, label }) => (
  <div className='flex flex-col items-center justify-center gap-2 text-center bg-primary-500 w-32 h-32 rounded-lg'>
    <span className='text-4xl font-bold'>{value}</span>
    <span className='font-semibold'>{label}</span>
  </div>
);
/* <div style={{ margin: "0%" }}>
<div className="topbar">
  <img src="ustlogoedited.png" style={{ height: "90%" }} />
</div>
<br />
<br />
<div className="sidedesign" style={{ marginTop: "4.2%" }}>
  <img src="threedots.png" style={{ height: "5%" }} />
</div>
<div
  className="textgeneral "
  style={{ marginLeft: "5%", paddingTop: "50px" }}
>
  <p>Performance Report</p>
  <div className="performbox">
    <forms>
      <div className="minibox1">{data?.openNumber}</div>
      <div className="minibox2">Open</div>
    </forms>
    <forms>
      <div className="minibox1">{data?.resolveNumber}</div>
      <div className="minibox2">Resolved</div>
    </forms>
    <forms>
      <div className="minibox1">{data?.voidedNumber}</div>
      <div className="minibox2">Voided</div>
    </forms>
    <forms>
      <div className="minibox1 ">{data?.reopenedNumber}</div>
      <div className="minibox2 ">Reopened {}</div>
    </forms>
  </div>
  <table className="graph">
    <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Percent</th>
      </tr>
    </thead>
    <tbody>
      <tr
        style={{
          height: `${Math.round(
            (data?.openNumber / data?.requestForm.length) * 100
          )}%`,
        }}
      >
        <td style={{ backgroundColor: "#75BAE0" }}>
          <clr1>
            <span>
              {" "}
              {Math.round(
                (data?.openNumber / data?.requestForm.length) * 100
              )}
              %
            </span>
          </clr1>
        </td>
        <th>OPEN</th>
      </tr>
      <tr
        style={{
          height: `${Math.round(
            (data?.resolveNumber / data?.requestForm.length) * 100
          )}%`,
        }}
      >
        <td style={{ backgroundColor: "#5DBD55" }}>
          <span>
            {" "}
            {Math.round(
              (data?.resolveNumber / data?.requestForm.length) * 100
            )}
            %
          </span>
        </td>
        <th>RESOLVED</th>
      </tr>
      <tr
        style={{
          height: `${Math.round(
            (data?.voidedNumber / data?.requestForm.length) * 100
          )}%`,
        }}
      >
        <td style={{ backgroundColor: "red" }}>
          <span>
            {" "}
            {Math.round(
              (data?.voidedNumber / data?.requestForm.length) * 100
            )}
            %
          </span>
        </td>
        <th>VOIDED</th>
      </tr>
      <tr
        style={{
          height: `${Math.round(
            (data?.reopenedNumber / data?.requestForm.length) * 100
          )}%`,
        }}
      >
        <td style={{ backgroundColor: "yellow" }}>
          <span>
            {Math.round(
              (data?.reopenedNumber / data?.requestForm.length) * 100
            )}
            %
          </span>
        </td>
        <th>REOPENED</th>
      </tr>
    </tbody>
  </table>
  <table id="table1" style={{ fontSize: "20px" }}>
    <tbody>
      <tr>
        <th>Ticket Number</th>
        <th>Name</th>
        <th>Document</th>
        <th>Date Created</th>
        <th>Status</th>
        <th />
      </tr>

      {data?.requestForm?.map((item, key) => {
        return (
          <tr key={key}>
            <td>{key + 1}</td>
            <td>{item.name}</td>
            <td>{item.documentRequested}</td>
            <td>{item.dateRequested}</td>
            <td>{item.status}</td>
            <td>
              <a
                href={`/ticketoverview?id=${item._id}`}
                className="viewbtn"
              >
                view
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
</div> */

