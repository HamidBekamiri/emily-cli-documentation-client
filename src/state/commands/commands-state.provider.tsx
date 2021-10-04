import { CommandDefinition } from 'cilly'
import { ReactNode, createContext, useState, useContext } from 'react'
import { storeState } from '../state.provider'
import { getStateItem } from '../utils'

const LOCAL_STORAGE_KEY = 'COMMANDS_STATE'

type CommandsState = {
  commands: CommandDefinition[]
  selectedCommand?: CommandDefinition
}

const initState: CommandsState = {
  commands: []
}

type CommandsContextProps = {
  state: CommandsState

  selectCommand(command: CommandDefinition): void
}

const storedState: CommandsState = getStateItem(LOCAL_STORAGE_KEY) ?? initState

// The context defines the interface for this specific state.
// Provide all the information and functions we want to read and alter the state here.
const CommandsContext = createContext<CommandsContextProps>({
  state: storedState,

  selectCommand: () => {  }
})

// Provide implementations for the provider interface here
const CommandsStateProvider = (props: { children: ReactNode }) => {
  const [state, setState] = useState<CommandsState>(storedState)
  const store = (state: CommandsState) => storeState(state, LOCAL_STORAGE_KEY)
  const update = (updated: CommandsState) => {
    setState(updated)
    store(updated)
  }

  const selectCommand = (command: CommandDefinition) => {
    console.log(`Selecting command ${command.name}`)
    update({ ...state, selectedCommand: command })
  }


  return (
    <CommandsContext.Provider
      value={{
        state: state,
        selectCommand
      }}>
      {props.children}
    </CommandsContext.Provider>
  )
}

export default CommandsStateProvider
export const useCommands = () => useContext(CommandsContext)
