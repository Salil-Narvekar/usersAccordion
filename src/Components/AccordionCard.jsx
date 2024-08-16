import React, { useEffect, useState, useContext, useRef } from 'react'
import ProfilePhoto from './ProfilePhoto'
import InputFields from './InputFields';
import Modal from 'react-modal'
import FieldTitle from './FieldTitle';
import FieldValue from './FieldValue';
import UserFullName from './UserFullName';
import ValidationText from './ValidationText';
import { BsPencil } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { OppenedAccordian } from '../App';

const AccordionCard = ({
  userId,
  userFirstName,
  userLastName,
  userDob,
  userGender,
  userEmail,
  profilePhoto,
  userCountry,
  userDiscription,
}) => {

  const oppenedAccordian = useContext(OppenedAccordian);
  // console.log(oppenedAccordian.oppenedAccordianId)

  const [userFullName, setUserFullName] = useState(userFirstName && userLastName ? userFirstName + ' ' + userLastName : '');
  const [accordionOpen, setAccordionOpen] = useState(false)
  const [editState, setEditState] = useState(false)
  const [valueChanged, setValueChanged] = useState(false)
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [age, setAge] = useState(0);
  const prevDetailsRef = useRef({});


  useEffect(() => {

    const birthDate = new Date(userDob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setUserDetails((otherDetails) => ({
      ...otherDetails,
      userAge: age,
    }));

    setAge(age)

  }, [userDob, age])

  const [userDetails, setUserDetails] = useState({
    userId: userId ? userId : '',
    userFirstName: userFirstName ? userFirstName : '',
    userLastName: userLastName ? userLastName : '',
    userAge: '' + ' Years',
    userDob: userDob ? userDob : '',
    userGender: userGender ? userGender : '',
    userCountry: userCountry ? userCountry : '',
    userDiscription: userDiscription ? userDiscription : ''
  })
  // console.log(userDetails)

  useEffect(() => {

    if (userFullName) {

      let splitName = userFullName.split(' ')
      // console.log(splitName[0], splitName[1])

      setUserDetails((otherDetails) => ({
        ...otherDetails,
        userFirstName: splitName[0],
        userLastName: splitName[1]
      }));

    }
  }, [userFullName])

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
    setUserDetails((otherDetails) => ({
      ...otherDetails,
      userGender: value[0].gender.toLowerCase()
    }));
  };

  const edit = (id, age) => {
    // console.log(id, typeof(age))

    if (parseInt(age) >= 18) {
      prevDetailsRef.newDetails = { ...userDetails };
      setEditState(true)
      oppenedAccordian.dispatch({ type: "changeId", value: { id: id, editState: true } });
    }
  }

  const cancelEdit = (id) => {
    // console.log(id, userFullName)

    setUserFullName(prevDetailsRef.newDetails.userFirstName + ' ' + prevDetailsRef.newDetails.userLastName);
    setAge(age)
    setUserDetails({ ...prevDetailsRef.newDetails });

    // setUserDetails((otherDetails) => ({
    //   ...otherDetails,
    //   userAge: age,
    //   userDob: userDob,
    //   userGender: userGender,
    //   userCountry: userCountry,
    //   userDiscription: userDiscription
    // }));

    setEditState(false)
    setValueChanged(false)
    oppenedAccordian.dispatch({ type: "changeId", value: { id: id, editState: false } });

  }

  const update = (id) => {
    // console.log(id)
    // console.log(oppenedAccordian.oppenedAccordianId.editState)

    if (valueChanged) {

      let name = userFullName.split(" ")
      let fname = name[0]
      let lname = name[1]

      if (!fname || fname === undefined) {
        return setValidationMessage("User's first name required")

      } else if (!lname || fname === undefined) {
        return setValidationMessage("User's last name required")

      } else if (!userDetails.userAge) {
        return setValidationMessage("User's age required")

      } else if (!userDetails.userGender) {
        return setValidationMessage("User's gender required")

      } else if (!userDetails.userCountry) {
        return setValidationMessage("User's nationality required")

      } else if (!userDetails.userDiscription) {
        return setValidationMessage("User's description required")

      } else {

        setValidationMessage('')
        setEditState(false)
        setValueChanged(false);
        oppenedAccordian.dispatch({ type: "changeId", value: { id: id, editState: false } });
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
        accordionOpen && oppenedAccordian.oppenedAccordianId.id === userId ?
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

        onClick={() => openAccordian(userId)}
      >
        <div className='col-span-2 grid items-center'>
          <ProfilePhoto image={profilePhoto} />
        </div>

        <div className='col-span-7 grid items-center text-left font-semibold text-md'>
          {
            !editState ?

              <UserFullName name={userDetails.userFirstName + ' ' + userDetails.userLastName} />
              :
              <input
                className='text-md md:text-lg lg:text-xl text-slate-800 font-medium text-left border border-slate-300 outline-slate-300 rounded-md w-full md:w-36 lg:w-36 h-10 pl-1 pr-1 mt-1'
                name='userName'
                id='userName'
                type='text'
                onChange={(e) => {
                  setUserFullName(e.target.value),
                    setValueChanged(true)
                }}
                placeholder='Enter user name'
                value={userFullName}
              />
          }
        </div>

        <div className='col-sapn-1 grid items-center text-right text-2xl text-slate-600'>
          {accordionOpen && oppenedAccordian.oppenedAccordianId.id === userId ? "-" : "+"}
        </div>
      </div>

      {
        accordionOpen && oppenedAccordian.oppenedAccordianId.id === userId &&
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
                  <FieldValue value={userDetails.userAge + " Years"} />
                  <FieldValue value={userDetails.userGender.charAt(0).toUpperCase() + userDetails.userGender.slice(1)} />
                  <FieldValue value={userDetails.userCountry} />
                </div>

                :

                <div className='grid grid-cols-3 gap-2 md:gap-6 lg:gap-6 h-10'>
                  <InputFields
                    name='userAge'
                    id='userAge'
                    type='number'
                    onChange={(e) => {
                      setUserDetails((otherDetails) => ({
                        ...otherDetails,
                        userAge: e.target.value,
                      }));

                      setValueChanged(true)
                    }}
                    placeholder="Enter user's age"
                    value={userDetails.userAge}
                  />

                  <InputFields
                    name='userGender'
                    id='userGender'
                    type='selectBox'
                    selectFieldOptions={genderList}
                    labelField='gender'
                    valueField='gender'
                    onChange={(values) => setGender(values)}
                    value={[
                      {
                        gender: userDetails.userGender.charAt(0).toUpperCase() + userDetails.userGender.slice(1)
                      }
                    ]}
                  />

                  <InputFields
                    name='userNationality'
                    id='userNationality'
                    type='text'
                    placeholder="Enter user's nationality"
                    value={userDetails.userCountry}
                    onChange={(e) => {
                      setUserDetails((otherDetails) => ({
                        ...otherDetails,
                        userCountry: e.target.value,
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

                <FieldValue value={userDetails.userDiscription} />
                :
                <InputFields
                  name='userDescription'
                  id='userDescription'
                  type='textarea'
                  onChange={(e) => {
                    setUserDetails((otherDetails) => ({
                      ...otherDetails,
                      userDiscription: e.target.value,
                    }));
                    setValueChanged(true)
                  }}
                  placeholder="Enter user's description"
                  value={userDetails.userDiscription}
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
                      userDetails.userAge >= 18 ?
                        'text-cyan-600 cursor-pointer'
                        :
                        'text-cyan-600 cursor-not-allowed'
                    }
                    onClick={() => edit(userId, userDetails.userAge)}
                  />
                </div>

                :

                <div className='grid grid-flow-col gap-4 justify-items-end text-xl md:text-3xl lg:text-3xl'>

                  <ValidationText message={validationMessage} />

                  <MdOutlineCancel
                    className='text-red-600 cursor-pointer'
                    onClick={() => cancelEdit(userId)}
                  />

                  <IoIosCheckmarkCircleOutline
                    className={valueChanged ? 'text-green-600 cursor-pointer' : 'text-green-600 cursor-not-allowed'}
                    onClick={() => update(userId)}
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
                onClick={() => confirmDelete(userId)}
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