import React, {useState} from 'react';
import s from './Dropdown.module.scss'
import cn from "classnames";
import {Map} from "react-lodash";

const Dropdown = ({options, selected, setSelected}) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={s.dropdown}>
            <div className={s.dropdown__btn} onClick={() => setIsOpen(!isOpen)}>
                {selected}
                <i className={cn(s.dropdown__arrow, {[s.open]: isOpen})}/>
            </div>

            <div className={cn(s.dropdown__content, {[s.open]: isOpen})}>
                <Map collection={options} iteratee={opt =>
                    <div key={opt.code}
                         onClick={(e) => {
                             setSelected(opt.code)
                             setIsOpen(false)
                         }}
                         className={s.dropdown__item}>{opt.name}</div>
                }
                />
            </div>

        </div>
    );
};

export default Dropdown;