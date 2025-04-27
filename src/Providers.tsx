"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './lib/store'
import { PersistGate } from 'redux-persist/integration/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>
        <PersistGate persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
}

export default Providers