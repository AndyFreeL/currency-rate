import React, {useEffect} from 'react';
import s from './RightBar.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {Map} from 'react-lodash';
import {getLatest} from "../../store/actions/currency";
import Flag from 'react-world-flags';
import cn from 'classnames';
import {setCurrent} from "../../store/reducers/currencyReducer";

const RightBar = () => {
    const dispatch = useDispatch()
    const {currencies, latest, currentCurrency} = useSelector(state => state.currencies)

    useEffect(() => {
        dispatch(getLatest(currentCurrency))
    }, [currentCurrency])

    return (
        <div className={s.rightBar}>
            <div className={s.current}>
                <div className={s.current__text}>Текущая валюта:</div>
                <div>{currentCurrency}</div>
                <Flag code={`${currentCurrency.slice(0, 2)}`} height='22' width='26'/>

            </div>
            <div className={s.currencies}>
                <Map collection={currencies} iteratee={c =>
                    <div onClick={() => dispatch(setCurrent(c.code))} className={cn(s.currencies__item, s.item)}
                         key={c.code}>
                        <div className={s.item__name}>{c.name}</div>
                        <div className={s.item__symbol}>{c.symbol_native}</div>
                        <div className={s.item__value}>{latest[c.code]}</div>
                        <div className={s.item__flag}><Flag code={`${c.code.slice(0, 2)}`} height='18' width='20'/>
                        </div>
                    </div>}
                />
            </div>
        </div>
    );
};

export default RightBar;