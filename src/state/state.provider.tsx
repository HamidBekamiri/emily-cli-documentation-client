import React, { ReactNode } from 'react'
import { setStateItem } from './utils';
import SiteStateProvider from './site/site-state.provider'
import CommandsStateProvider from './commands/commands-state.provider';


type StateProviderProps = {
  children: ReactNode
}

const StateProvider = (props: StateProviderProps) => {
  return (
    <SiteStateProvider>
      <CommandsStateProvider>
        {props.children}
      </CommandsStateProvider>
    </SiteStateProvider>
  )
}

export default StateProvider
export const storeState = (state: any, key: string) => setStateItem(state, key)
