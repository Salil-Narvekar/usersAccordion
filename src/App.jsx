import React, { useReducer, createContext } from 'react'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from './Components/Index';

export const OppenedAccordian = createContext();

function App() {

  useEffect(() => {
    document.title = "Users list";
  }, []);

  const initialAccordianId = {
    id: null,
    editState: false
  };

  const reducerAccordianId = (state, action) => {
    switch (action.type) {
      case 'changeId':
        return {
          id: action.value.id,
          editState: action.value.editState
        }
      case 'deleteId':
        return {
          id: action.value.id,
          confirmDelete: false,
          editState: action.value.editState
        }
      // return console.log("changeId", action.value);

      default:
        return initialAccordianId
    }
  }

  const [oppenedAccordianId, dispatchAccordianId] = useReducer(reducerAccordianId, initialAccordianId);

  return (

    <OppenedAccordian.Provider value={{ oppenedAccordianId: oppenedAccordianId, dispatch: dispatchAccordianId }}>
      <div className='grid justify-items-center items-start' style={{ backgroundColor: '#FFFFFF' }}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/usersList' />} />
            <Route path='/usersList' element={<Index />} />
          </Routes>
        </HashRouter>
      </div>
    </OppenedAccordian.Provider>
  );
}

export default App;
