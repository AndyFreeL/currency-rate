import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCurrencies, getLatest} from "./store/actions/currency";
import CurrencyList from "./components/CurrencyList/CurrencyList";
import RightBar from "./components/RightBar/RightBar";

function App() {
    const dispatch = useDispatch()
    const {currentCurrency}=useSelector(state => state.currencies)

    useEffect(()=>{
        dispatch(getCurrencies())
    },[])




  return (
    <div className='app-wrapper'>
        <div className='app-wrapper-content'>
            <CurrencyList/>
        </div>
        <div className='rightSide'>
            <RightBar/>
        </div>
    </div>
  );
}

export default App;
