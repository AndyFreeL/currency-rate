const SET_CURRENCIES = 'SET_CURRENCIES'
const SET_LATEST = 'SET_LATEST'
const SET_CURRENT = 'SET_CURRENT'
const ADD_CURRENCY_PAIR = 'ADD_CURRENCY_PAIR'
const SAVE_CURRENCY_PAIR = 'SAVE_CURRENCY_PAIR'
const DEL_CURRENCY_PAIR = 'DEL_CURRENCY_PAIR'

const defaultState = {
    currentCurrency: 'RUB',
    currencies: [],
    latest: [],
    currencyPairs: [
        {id: 0, first: 'RUB', second: 'USD'},
        {id:1,first:'RUB', second:'EUR'}
    ]

}

export default function currencyReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CURRENCIES:
            return {...state, currencies: action.payload}
        case SET_LATEST:
            return {...state, latest: action.payload}
        case SET_CURRENT:
            return {...state, currentCurrency: action.payload}
        case ADD_CURRENCY_PAIR:
            return {...state, currencyPairs: [...state.currencyPairs, action.payload]}
        case SAVE_CURRENCY_PAIR:
            return {
                ...state,
                currencyPairs: [...state.currencyPairs.map(cp => cp.id === action.payload.id ? cp = action.payload : cp)]
            }
        case DEL_CURRENCY_PAIR:
            return {...state, currencyPairs: [...state.currencyPairs.filter(cp => cp.id !== action.payload)]}

        default:
            return state
    }
}

export const setCurrencies = (currencies) => ({type: SET_CURRENCIES, payload: currencies})
export const setLatest = (latest) => ({type: SET_LATEST, payload: latest})
export const setCurrent = (current) => ({type: SET_CURRENT, payload: current})
export const addCurrencyPair = (pair) => ({type: ADD_CURRENCY_PAIR, payload: pair})
export const saveCurrencyPair = (pair) => ({type: SAVE_CURRENCY_PAIR, payload: pair})
export const delCurrencyPair = (id) => ({type: DEL_CURRENCY_PAIR, payload: id})
