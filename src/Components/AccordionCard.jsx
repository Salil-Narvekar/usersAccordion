import React, { useEffect, useState, useContext, useRef } from 'react'
import ProfilePhoto from './ProfilePhoto'
import InputFields from './InputFields';
import Modal from 'react-modal'
import FieldTitle from './FieldTitle';
import FieldValue from './FieldValue';
import CelebrityName from './CelebrityName';
import ValidationText from './ValidationText';
import { BsPencil } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { OppenedAccordian } from '../App';

const AccordionCard = ({
  celebrityId,
  celebrityFirstName,
  celebrityLastName,
  celebrityDob,
  celebrityGender,
  celebrityEmail,
  profilePhoto,
  celebrityCountry,
  celebrityDiscription,
}) => {

  const oppenedAccordian = useContext(OppenedAccordian);
  // console.log(oppenedAccordian.oppenedAccordianId)

  const [celebName, setCelebName] = useState(celebrityFirstName && celebrityLastName ? celebrityFirstName + ' ' + celebrityLastName : '');
  const [accordionOpen, setAccordionOpen] = useState(false)
  const [editState, setEditState] = useState(false)
  const [valueChanged, setValueChanged] = useState(false)
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [age, setAge] = useState(0);
  const prevDetailsRef = useRef({});


  useEffect(() => {

    const birthDate = new Date(celebrityDob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setCelebrityDetails((otherDetails) => ({
      ...otherDetails,
      celebrityAge: age,
    }));

    setAge(age)

  }, [celebrityDob, age])

  const [celebrityDetails, setCelebrityDetails] = useState({
    celebrityId: celebrityId ? celebrityId : '',
    celebrityFirstName: celebrityFirstName ? celebrityFirstName : '',
    celebrityLastName: celebrityLastName ? celebrityLastName : '',
    celebrityAge: '' + ' Years',
    celebrityDob: celebrityDob ? celebrityDob : '',
    celebrityGender: celebrityGender ? celebrityGender : '',
    celebrityCountry: celebrityCountry ? celebrityCountry : '',
    celebrityDiscription: celebrityDiscription ? celebrityDiscription : ''
  })
  // console.log(celebrityDetails)

  useEffect(() => {

    if (celebName) {

      let splitName = celebName.split(' ')
      // console.log(splitName[0], splitName[1])

      setCelebrityDetails((otherDetails) => ({
        ...otherDetails,
        celebrityFirstName: splitName[0],
        celebrityLastName: splitName[1]
      }));

    }
  }, [celebName])

  const openAccordian = (id) => {

    if (!editState && !oppenedAccordian.oppenedAccordianId.editState) {
      setAccordionOpen(true)
      oppenedAccordian.dispatch({ type: "changeId", value: { id: id, editState: false } });

    }

    if (oppenedAccordian.oppenedAccordianId.id === id && !editState && !oppenedAccordian.oppenedAccordianId.editState) {

      setAccordionOpen(true)
      oppenedAccordian.dispatch({ type: "changeId", value: { id: null, editState: false } });
    }
  }

  const genderArray = ['Male', 'Female', 'Transgender', 'Rather not say', 'Other']
  const genderList = genderArray.map((value) => (
    {
      gender: value
    }
  ))

  const setGender = (value) => {
    // console.log("SelectBox Value", value[0].gender)

    setValueChanged(true)
    setCelebrityDetails((otherDetails) => ({
      ...otherDetails,
      celebrityGender: value[0].gender.toLowerCase()
    }));
  };

  const edit = (id, age) => {
    // console.log(id, typeof(age))

    if (parseInt(age) >= 18) {
      prevDetailsRef.newDetails = { ...celebrityDetails }; 
      setEditState(true)
      oppenedAccordian.dispatch({ type: "changeId", value: { id: id, editState: true } });
    }
  }

  const cancelEdit = (id) => {
    // console.log(id, celebName)

    setCelebName(prevDetailsRef.newDetails.celebrityFirstName + ' ' + prevDetailsRef.newDetails.celebrityLastName);
    setAge(age)
    setCelebrityDetails({ ...prevDetailsRef.newDetails });

    // setCelebrityDetails((otherDetails) => ({
    //   ...otherDetails,
    //   celebrityAge: age,
    //   celebrityDob: celebrityDob,
    //   celebrityGender: celebrityGender,
    //   celebrityCountry: celebrityCountry,
    //   celebrityDiscription: celebrityDiscription
    // }));

    setEditState(false)
    setValueChanged(false);
    oppenedAccordian.dispatch({ type: "changeId", value: { id: id, editState: false } });

  }

  const update = (id) => {
    // console.log(id)
    // console.log(oppenedAccordian.oppenedAccordianId.editState)

    if (valueChanged) {

      let name = celebName.split(" ")
      let fname = name[0]
      let lname = name[1]

      if (!fname || fname === undefined) {
        return setValidationMessage("Celebrity's first name required")

      } else if (!lname || fname === undefined) {
        return setValidationMessage("Celebrity's last name required")

      } else if (!celebrityDetails.celebrityAge) {
        return setValidationMessage("Celebrity's age required")

      } else if (!celebrityDetails.celebrityGender) {
        return setValidationMessage("Celebrity's gender required")

      } else if (!celebrityDetails.celebrityCountry) {
        return setValidationMessage("Celebrity's nationality required")

      } else if (!celebrityDetails.celebrityDiscription) {
        return setValidationMessage("Celebrity's description required")

      } else {
        setValidationMessage('')
        setEditState(false)
        setValueChanged(false)
        oppenedAccordian.dispatch({ type: "changeId", value: { id: id, editState: editState } });
      }
    }
  }

  const confirmDelete = (id) => {
    console.log(id)
    setConfirmDeleteModal(false)
    setEditState(false)
    oppenedAccordian.dispatch({ type: "deleteId", value: { id: id, editState: false, confirmDelete: true } });
  }

  return (
    <div
      className={
        accordionOpen && oppenedAccordian.oppenedAccordianId.id === celebrityId ?
          'border-2 border-slate-200 hover:border-slate-300 duration-500 rounded-lg pl-4 pr-4 h-96'
          :
          'border-2 border-slate-200 hover:border-slate-300 duration-500 rounded-lg pl-4 pr-4 h-24'
      }
    >
      <div
        className={
          editState || oppenedAccordian.oppenedAccordianId.editState ?
            'grid grid-cols-10 items-center cursor-not-allowed duration-500 rounded-lg h-24'
            :
            'grid grid-cols-10 items-center cursor-pointer duration-500 rounded-lg h-24'
        }

        onClick={() => openAccordian(celebrityId)}
      >
        <div className='col-span-2 grid items-center'>
          <ProfilePhoto image={profilePhoto} />
        </div>

        <div className='col-span-7 grid items-center text-left font-semibold text-md'>
          {
            !editState ?

              <CelebrityName name={celebrityDetails.celebrityFirstName + ' ' + celebrityDetails.celebrityLastName} />
              :
              <input
                className='text-md md:text-lg lg:text-xl text-slate-800 font-medium text-left border border-slate-300 outline-slate-300 rounded-md w-full md:w-36 lg:w-36 h-10 pl-1 pr-1 mt-1'
                name='celebrityName'
                id='celebrityName'
                type='text'
                onChange={(e) => {
                  setCelebName(e.target.value),
                    setValueChanged(true)
                }}
                placeholder='Enter celebrity name'
                value={celebName}
              />
          }
        </div>

        <div className='col-sapn-1 grid items-center text-right text-2xl text-slate-600'>
          {accordionOpen && oppenedAccordian.oppenedAccordianId.id === celebrityId ? "-" : "+"}
        </div>
      </div>

      {
        accordionOpen && oppenedAccordian.oppenedAccordianId.id === celebrityId &&
        <div className='flex flex-col h-4/6 rounded-lg'>

          <div className='grid grid-rows-2 basis-1/5 w-full'>

            <div className='grid grid-cols-3 gap-2 md:gap-6 lg:gap-6 items-end'>
              <FieldTitle label='Age' />
              <FieldTitle label='Gender' />
              <FieldTitle label='Country' />
            </div>

            {
              !editState ?

                <div className='grid grid-cols-3 gap-2 md:gap-6 lg:gap-6 h-10'>
                  <FieldValue value={celebrityDetails.celebrityAge + " Years"} />
                  <FieldValue value={celebrityDetails.celebrityGender.charAt(0).toUpperCase() + celebrityDetails.celebrityGender.slice(1)} />
                  <FieldValue value={celebrityDetails.celebrityCountry} />
                </div>

                :

                <div className='grid grid-cols-3 gap-2 md:gap-6 lg:gap-6 h-10'>
                  <InputFields
                    name='celebrityAge'
                    id='celebrityAge'
                    type='number'
                    onChange={(e) => {
                      setCelebrityDetails((otherDetails) => ({
                        ...otherDetails,
                        celebrityAge: e.target.value,
                      }));

                      setValueChanged(true)
                    }}
                    placeholder="Enter celebrity's age"
                    value={celebrityDetails.celebrityAge}
                  />

                  <InputFields
                    name='celebrityGender'
                    id='celebrityGender'
                    type='selectBox'
                    selectFieldOptions={genderList}
                    labelField='gender'
                    valueField='gender'
                    onChange={(values) => setGender(values)}
                    value={[
                      {
                        gender: celebrityDetails.celebrityGender.charAt(0).toUpperCase() + celebrityDetails.celebrityGender.slice(1)
                      }
                    ]}
                  />

                  <InputFields
                    name='celebrityNationality'
                    id='celebrityNationality'
                    type='text'
                    placeholder="Enter celebrity's nationality"
                    value={celebrityDetails.celebrityCountry}
                    onChange={(e) => {
                      setCelebrityDetails((otherDetails) => ({
                        ...otherDetails,
                        celebrityCountry: e.target.value,
                      }));

                      setValueChanged(true)
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[0-9]/g, '');
                    }}
                  />
                </div>
            }
          </div>

          <div className='grid grid-flow-row items-start self-start basis-3/5 w-full'>

            <div className='grid items-center h-full'>
              <FieldTitle label='Description' />
            </div>

            {
              !editState ?

                <FieldValue value={celebrityDetails.celebrityDiscription} />
                :
                <InputFields
                  name='celebrityDescription'
                  id='celebrityDescription'
                  type='textarea'
                  onChange={(e) => {
                    setCelebrityDetails((otherDetails) => ({
                      ...otherDetails,
                      celebrityDiscription: e.target.value,
                    }));
                    setValueChanged(true)
                  }}
                  placeholder="Enter celebrity's description"
                  value={celebrityDetails.celebrityDiscription}
                />
            }
          </div>

          <div className='basis-1/5 grid justify-items-end items-end w-full'>
            {
              !editState ?

                <div className='grid grid-flow-col gap-6 justify-items-end text-lg md:text-2xl lg:text-2xl'>
                  <BsTrash3
                    className='text-red-600 cursor-pointer'
                    onClick={() => setConfirmDeleteModal(true)}
                  />

                  <BsPencil
                    className={
                      celebrityDetails.celebrityAge >= 18 ?
                        'text-cyan-600 cursor-pointer'
                        :
                        'text-cyan-600 cursor-not-allowed'
                    }
                    onClick={() => edit(celebrityId, celebrityDetails.celebrityAge)}
                  />
                </div>

                :

                <div className='grid grid-flow-col gap-4 justify-items-end text-xl md:text-3xl lg:text-3xl'>

                  <ValidationText message={validationMessage} />

                  <MdOutlineCancel
                    className='text-red-600 cursor-pointer'
                    onClick={() => cancelEdit(celebrityId)}
                  />

                  <IoIosCheckmarkCircleOutline
                    className={valueChanged ? 'text-green-600 cursor-pointer' : 'text-green-600 cursor-not-allowed'}
                    onClick={() => update(celebrityId)}
                  />
                </div>
            }
          </div>
        </div>
      }


      {
        confirmDeleteModal &&
        <Modal
          isOpen={confirmDeleteModal}
          ariaHideApp={false}
          className="flex items-center justify-center outline-none h-screen bg-white bg-opacity-90"
        >
          <div className='grid grid-rows-2 items-center self-center border-2 border-slate-300 rounded-lg h-36 pr-4 pl-4 w-[85vw] md:w-[60vw] lg:w-[50vw] xl:w-[34vw]'>

            <div className='grid grid-cols-3 items-start'>
              <div className='col-span-2 font-normal text-slate-900 w-full h-full'>
                Are you sure you want to delete?
              </div>

              <div
                className='text-right text-3xl -mt-2 text-slate-600 cursor-pointer w-full h-full'
                onClick={() => setConfirmDeleteModal(false)}
              >
                ×
              </div>
            </div>

            <div className='grid grid-flow-col gap-4 justify-self-end items-end'>
              <div
                className='grid justify-items-center items-center 
                  text-xs font-medium cursor-pointer
                  border border-slate-400 rounded-lg 
                  h-8 w-24'
                onClick={() => setConfirmDeleteModal(false)}
              >
                Cancel
              </div>

              <div
                className='grid justify-items-center items-center 
                  rounded-lg text-white text-xs cursor-pointer
                  h-8 w-24'
                style={{ backgroundColor: '#FF3500' }}
                onClick={() => confirmDelete(celebrityId)}
              >
                Delete
              </div>
            </div>
          </div>
        </Modal>
      }
    </div>
  )
}

export default AccordionCard