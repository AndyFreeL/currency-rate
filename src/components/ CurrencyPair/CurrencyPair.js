import React, {useEffect, useState} from 'react';
import s from './CurrencyPair.module.scss'
import cn from 'classnames'
import cross from '../../assets/cross.svg'

import {useDispatch, useSelector} from "react-redux";
import Dropdown from "../Dropdown/Dropdown";
import {delCurrencyPairFromStore, getPairValue, saveCurrencyPairToStore} from "../../store/actions/currency";

const CurrencyPair = ({id, first, second}) => {
    const dispatch = useDispatch()
    const {currencies} = useSelector(state => state.currencies)
    const [secondValue, setSecondValue] = useState('')

    const [firstInputValue, setFirstInputValue] = useState(1);
    const [secondInputValue, setSecondInputValue] = useState(1);

    const [selectedFirstOption, setSelectedFirstOption] = useState(first)
    const [selectedSecondOption, setSelectedSecondOption] = useState(second)


    useEffect(() => {
        dispatch(getPairValue(selectedFirstOption, selectedSecondOption)).then(res => {
            setSecondValue(res)
            setSecondInputValue(res)
        })
        dispatch(saveCurrencyPairToStore(id, selectedFirstOption, selectedSecondOption))
    }, [selectedFirstOption, selectedSecondOption])


    if (currencies.length < 1) {
        return <div><img src='/src/assets/triangle.svg' alt='preloader'/></div>
    }
    return (
        <div className={s.card}>
            <div className={s.card__btns}>
                <div className={s.card__del} onClick={() => dispatch(delCurrencyPairFromStore(id))}>
                    <img src={cross} alt='del'/>
                </div>

            </div>

            <div className={s.card__text}>
                <span>1</span> {currencies[selectedFirstOption].name} equal <span>{secondValue}</span> {currencies[selectedSecondOption].name}
            </div>
            <div className={cn(s.card__currencies, s.currencies)}>
                <div className={cn(s.currencies__currency, s.currency)}>
                    <input value={firstInputValue} onChange={e => {
                        setFirstInputValue(e.target.value)
                        setSecondInputValue(e.target.value * secondValue)
                    }
                    } type="number"/>
                    <div className={s.dropdown}>
                        <Dropdown options={currencies}
                                  selected={selectedFirstOption}
                                  setSelected={setSelectedFirstOption}
                        />
                    </div>
                </div>
                <div className={cn(s.currencies__currency, s.currency)}>
                    <input value={secondInputValue} onChange={e => {
                        setSecondInputValue(e.target.value)
                        setFirstInputValue(e.target.value / secondValue)
                    }
                    } type="number"/>
                    <div className={s.dropdown}>
                        <Dropdown
                            options={currencies}
                            selected={selectedSecondOption}
                            setSelected={setSelectedSecondOption}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyPair;