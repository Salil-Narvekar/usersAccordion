import React, { useState, useEffect, useContext } from 'react'
import UsersJson from '../JSON/users.json'
import SearchBar from './SearchBar';
import AccordionCard from './AccordionCard';
import { OppenedAccordian } from '../App';

const Index = () => {

    const oppenedAccordian = useContext(OppenedAccordian);
    const [usersDataArray, setUsersDataArray] = useState([])

    // useEffect(() => {
    //     document.title = "Users list";
    // }, []);

    useEffect(() => {

        setUsersDataArray(UsersJson)
        // console.log("Celebrities Json Data Array : ", UsersJson)
    }, [])

    useEffect(() => {

        console.log(oppenedAccordian.oppenedAccordianId.id)
        if (oppenedAccordian.oppenedAccordianId.id) {

            setUsersDataArray((prevUsers) =>
                prevUsers.filter(user => user.id !== oppenedAccordian.oppenedAccordianId.id)
            );
        }

        oppenedAccordian.dispatch({ type: 'default'});

    }, [oppenedAccordian.oppenedAccordianId.confirmDelete])

    const onSearch = (e) => {

        if (e !== '' && !oppenedAccordian.oppenedAccordianId.editState) {

            console.log(e)
            const searchedValue = e.toLowerCase();
            const filteredCelebrities = usersDataArray.filter((data) =>
                data.first.toLowerCase().includes(searchedValue) || data.last.toLowerCase().includes(searchedValue)
            );

            setUsersDataArray(filteredCelebrities)

        } else {

            setUsersDataArray(UsersJson)
        }
    };

    return (
        <div className='grid gap-3 h-full py-10 w-[85vw] md:w-[60vw] lg:w-[50vw] xl:w-[34vw]'>

            <SearchBar onChange={(e) => onSearch(e.target.value)} />

            <div className='grid gap-4 rounded-lg'>
                {
                    usersDataArray.map((data) => (
                        <AccordionCard
                            key={data.id}
                            userId={data.id}
                            userFirstName={data.first}
                            userLastName={data.last}
                            userDob={data.dob}
                            userGender={data.gender}
                            userEmail={data.email}
                            profilePhoto={data.picture}
                            userCountry={data.country}
                            userDiscription={data.description}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Index