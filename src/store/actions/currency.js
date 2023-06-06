import axios from "axios";
import {
    addCurrencyPair,
    delCurrencyPair,
    saveCurrencyPair,
    setCurrencies,
    setLatest
} from "../reducers/currencyReducer";

const instance = axios.create({
    baseURL:'https://api.freecurrencyapi.com/v1/',
    params:{
        apikey:'hLonjQqUJ3vZx3VS6tSpGxrz3A9EGr0Hycvl9mm4'
    }
})

export const getCurrencies=()=>{
    return async dispatch=>{
        try{
            const response = await instance.get('currencies')
            dispatch(setCurrencies(response.data.data))
        }catch(e){
            alert(e.response.data.message)
        }
    }
}
export const getLatest=(currentCurrency)=>{
    return async dispatch=>{
        try{
            const response = await instance.get('latest', {
                params:{
                    base_currency:currentCurrency
                }
            })
            dispatch(setLatest(response.data.data))
        }catch(e){
            alert(e.response.data.message)
        }
    }
}
export const getPairValue=(first,second)=>{
    return async ()=>{
        try{
            const response = await instance.get('latest', {
                params:{
                    base_currency:first,
                    currencies:second
                }
            })
           return Object.values(response.data.data)[0]
        }catch(e){
            alert(e.response.data.message)
        }
    }
}

export const addCurrencyPairToStore=(first,second)=>{
    return dispatch=>{
        try {
            const id=Date.now()
            dispatch(addCurrencyPair({id:id, first:first, second:second}))
        }catch (e){
            alert(e.response.data.message)
        }
    }
}
export const saveCurrencyPairToStore=(id,first,second)=>{
    return dispatch=>{
        try {
            dispatch(saveCurrencyPair({id:id, first:first, second:second}))
        }catch (e){
            alert(e.response.data.message)
        }
    }
}
export const delCurrencyPairFromStore=(id)=>{
    return dispatch=>{
        try {
            dispatch(delCurrencyPair(id))
        }catch (e){
            alert(e.response.data.message)
        }
    }
}

export const getHistory=(first,second,dateFrom,dateTo)=>{
    return async ()=>{
        try{
            const response = await instance.get('historical', {
                params:{
                    currencies:second,
                    base_currency:first,
                    date_from:dateFrom,
                    date_to:dateTo
                }
            })
            return Object.values(response.data)[0]
        }catch(e){
            alert(e.response.data.message)
        }
    }
}
