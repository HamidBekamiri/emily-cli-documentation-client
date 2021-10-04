import React, { ReactNode, createContext, useState, useContext } from 'react'
import { AppThemes } from '../../global/style/themes'
import { storeState } from '../state.provider'
import { getStateItem } from '../utils'

const LOCAL_STORAGE_KEY = 'SITE_STATE'

type SiteState = {
  theme: AppThemes,
  command: string,
  childCommand?: string,
  version: string,
  versionDownload: string,
  hash?: string
}

const initState: SiteState = {
  theme: AppThemes.Light,
  command: 'telemetry',
  childCommand: undefined,
  version: 'Release-v1.1.1',
  versionDownload: 'Release-v1.1.1',
  hash: undefined
}

export type SiteContextProps = {
  state: SiteState

  changeTheme: (theme: AppThemes) => void
  changeCommand: (command: string) => void
  changeChildCommand: (childCommand?: string) => void
  changeVersion: (version: string) => void,
  changeVersionDownload: (versionDownload: string) => void,
  changeVersionPassword: (version: string, passwordHash: string) => void
}

type SiteStateProviderProps = {
  children: ReactNode
}

const storedState: SiteState = getStateItem(LOCAL_STORAGE_KEY) ?? initState

// The context defines the interface for this specific state.
// Provide all the information and functions we want to read and alter the state here.
const SiteContext = createContext<SiteContextProps>({
  state: storedState,

  changeTheme: () => {},
  changeCommand: () => {},
  changeChildCommand: () => {},
  changeVersion: () => {},
  changeVersionDownload: () => {},
  changeVersionPassword: () => {}
})

// Provide implementations for the provider interface here
const SiteStateProvider = (props: SiteStateProviderProps) => {
  const [state, setState] = useState<SiteState>(storedState)
  const store = (state: SiteState) => storeState(state, LOCAL_STORAGE_KEY)
  const update = (updated: SiteState) => {
    setState(updated)
    store(updated)
  }

  const changeTheme = (theme: AppThemes) => {
    console.log(`Changing theme to ${theme}`)
    update({ ...state, theme: theme })
  }

  const changeCommand = (command: string) => {
    console.log(`Changing command to ${command}`)
    update({ ...state, command: command, childCommand: undefined })
  }

  const changeChildCommand = (childCommand?: string) => {
    console.log(`Changing child command to ${childCommand}`)
    update({ ...state, childCommand: childCommand})
  }

  const changeVersion = (version: string) => {
    console.log(`Changing version to ${version}`)
    update({ ...state, version: version})
  }

  const changeVersionDownload = (versionDownload: string) => {
    console.log(`Changing version of a download button to ${versionDownload}`)
    update({ ...state, versionDownload: versionDownload, version: versionDownload})
  }

  const changeVersionPassword = (version: string, passwordHash: string) => {
    console.log(`Changing version to ${version} and a password.`)
    update({ ...state, version: version, hash: passwordHash})
  }

  return (
    <SiteContext.Provider
      value={{
        state: state,
        changeTheme: changeTheme,
        changeCommand: changeCommand,
        changeChildCommand: changeChildCommand,
        changeVersion: changeVersion,
        changeVersionDownload: changeVersionDownload,
        changeVersionPassword: changeVersionPassword
      }}>
      {props.children}
    </SiteContext.Provider>
  )
}

export default SiteStateProvider
export const useSite = () => useContext(SiteContext)
