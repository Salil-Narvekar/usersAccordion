import React, { useState, useEffect, useContext } from 'react'
import CelebritiesJson from '../JSON/celebrities.json'
import SearchBar from './SearchBar';
import AccordionCard from './AccordionCard';
import { OppenedAccordian } from '../App';

const Index = () => {

    const oppenedAccordian = useContext(OppenedAccordian);
    const [celebritiesDataArray, setCelebritiesDataArray] = useState([])

    useEffect(() => {
        document.title = "FactWise - Task";
    }, []);

    useEffect(() => {

        setCelebritiesDataArray(CelebritiesJson)
        // console.log("Celebrities Json Data Array : ", CelebritiesJson)
    }, [])

    useEffect(() => {

        console.log(oppenedAccordian.oppenedAccordianId.id)
        if (oppenedAccordian.oppenedAccordianId.id) {

            setCelebritiesDataArray((prevCelebrities) =>
                prevCelebrities.filter(celebrity => celebrity.id !== oppenedAccordian.oppenedAccordianId.id)
            );
        }

        oppenedAccordian.dispatch({ type: 'default'});

    }, [oppenedAccordian.oppenedAccordianId.confirmDelete])

    const onSearch = (e) => {

        if (e !== '' && !oppenedAccordian.oppenedAccordianId.editState) {

            console.log(e)
            const searchedValue = e.toLowerCase();
            const filteredCelebrities = celebritiesDataArray.filter((data) =>
                data.first.toLowerCase().includes(searchedValue) || data.last.toLowerCase().includes(searchedValue)
            );

            setCelebritiesDataArray(filteredCelebrities)

        } else {

            setCelebritiesDataArray(CelebritiesJson)
        }
    };

    return (
        <div className='grid gap-3 h-full py-10 w-[85vw] md:w-[60vw] lg:w-[50vw] xl:w-[34vw]'>

            <SearchBar onChange={(e) => onSearch(e.target.value)} />

            <div className='grid gap-4 rounded-lg'>
                {
                    celebritiesDataArray.map((data) => (
                        <AccordionCard
                            key={data.id}
                            celebrityId={data.id}
                            celebrityFirstName={data.first}
                            celebrityLastName={data.last}
                            celebrityDob={data.dob}
                            celebrityGender={data.gender}
                            celebrityEmail={data.email}
                            profilePhoto={data.picture}
                            celebrityCountry={data.country}
                            celebrityDiscription={data.description}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Index