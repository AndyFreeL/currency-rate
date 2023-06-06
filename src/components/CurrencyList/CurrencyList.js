import React from 'react';
import CurrencyPair from "../ CurrencyPair/CurrencyPair";
import {useDispatch, useSelector} from "react-redux";
import s from './CurrencyList.module.scss'
import {addCurrencyPairToStore} from "../../store/actions/currency";
import plus from '../../assets/plus.svg'


const CurrencyList = () => {
    const dispatch = useDispatch()
    const {currencyPairs} = useSelector(state => state.currencies)

    return (
        <div className={s.currencyList}>
            {currencyPairs.map(pair =>
                <CurrencyPair
                    key={pair.id}
                    id={pair.id}
                    first={pair.first}
                    second={pair.second}
                />
            )}
            {
                currencyPairs.length < 8 &&
                <div className={s.currencyList__add} onClick={() => dispatch(addCurrencyPairToStore('USD', 'EUR'))}><img
                    src={plus} alt=""/></div>
            }

        </div>
    );
};
export default CurrencyList;