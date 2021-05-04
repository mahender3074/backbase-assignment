import { ActionTypes } from './types'
import { mockTransactions } from 'assets/mock/transactions'

export interface IState {
  transactions: any[]
  payment: any
}

export const initialState = {
  transactions: [...mockTransactions],
  payment: {},
  defaultBalance: mockTransactions[0].transaction.amountCurrency.amount,
}

export function BankReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}

const handlers = {
  [ActionTypes.ADD_TRANSACTION]: (state, action) => ({
    ...state,
    transactions: [action.payload, ...state.transactions],
  }),
  [ActionTypes.ADD_PAYMENT]: (state, action) => ({
    ...state,
    payment: action.payload,
  }),
  [ActionTypes.EXTRACT_MONEY]: (state, action) => ({
    ...state,
    defaultBalance: action.payload,
  }),
  DEFAULT: (state) => state,
}
