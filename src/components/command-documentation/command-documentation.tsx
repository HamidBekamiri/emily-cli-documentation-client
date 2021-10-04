import { ArgumentDefinition, CommandDefinition } from "cilly";
import React from "react";
import { toast } from "react-toastify";
import { useVersion } from "../../hooks/http.hooks";
import { CommandDocumentationType } from "../../models/commandDocumentationType";
import { SiteContextProps, useSite } from "../../state/site/site-state.provider";
import { CodeViewerStyles } from "../code-viewer/code-viewer.styles";
import { CommandListStyles } from "../command-list/command-list.styles";
import { CommandUsageStyles } from "../command-usage/command-usage.styles";
import { ContentContainerStyles } from "../content-container/content-container.styles";
import { HR1, HR2 } from "../line-break/line-break";
import { CommandDocumentationStyles } from "./command-documentation.styles";
import { CodeTip } from "../code-tip/code-tip";
import { CodeBlockStyles } from "../code-block/code-block.styles";
import { DocSection, DocSectionType, renderSections } from "./documentation-renderer";

const required = (str: string) => `<${str}>`
const optional = (str: string) => `[${str}]`

export const CommandDocumentation = (props: {
  version: string,
  command: string,
  childCommand: string | undefined
}) => {

  const site: SiteContextProps = useSite()
  const version: string | undefined = site.state.version
  const hash: string | undefined = site.state.hash

  const { data, error } = useVersion(version, hash ?? 'none')

  if (error) return renderErrorContent(site)
  if (!data) return renderEmptyContent(site)

  const emilyCommand = data //populateDataWithDummyExtras(data) // TODO: REMOVE    
  const selectedCommand: CommandDefinition = findSelectedCommand(props.command, emilyCommand)
  const selectedChildCommand: CommandDefinition | undefined = findSelectedChildCommand(props.childCommand, selectedCommand)
  const commandToRender: CommandDefinition = selectedChildCommand ?? selectedCommand

  return (
    <CommandDocumentationStyles.Container>
      <CommandDocumentationStyles.Name>{getCommandName(selectedCommand, selectedChildCommand, '$')}</CommandDocumentationStyles.Name>

      <ContentContainerStyles.Container>
        <CodeViewerStyles.CodeViewer>
          {getTerminalSections(commandToRender)}
        </CodeViewerStyles.CodeViewer>
      </ContentContainerStyles.Container>

      <CommandDocumentationStyles.Description>{getCommandDescription(commandToRender)}</CommandDocumentationStyles.Description>
      <CommandUsageStyles.CommandUsage commandName={getCommandName(selectedCommand, selectedChildCommand)} opts={commandToRender.opts}></CommandUsageStyles.CommandUsage>
      <CommandListStyles.CommandList selectedCommand={selectedCommand} selectedChildCommand={selectedChildCommand} emilyCommand={data}></CommandListStyles.CommandList>

      <CommandDocumentationStyles.Examples>
        {getExampleSections(selectedCommand, selectedChildCommand)}
      </CommandDocumentationStyles.Examples>

    </CommandDocumentationStyles.Container>
  )
}

const renderEmptyContent = (site: SiteContextProps) => {
  return (
    <CommandDocumentationStyles.Container>
      <HR2 />
      <CommandDocumentationStyles.NoVersionTitle>
        Oops, it seems like there is no content for version {site.state.version}. Try again in a few minutes or choose a different version.
      </CommandDocumentationStyles.NoVersionTitle>
    </CommandDocumentationStyles.Container>
  )
}

const renderErrorContent = (site: SiteContextProps) => {
  return (
    <CommandDocumentationStyles.Container>
      <HR2 />
      <CommandDocumentationStyles.NoVersionTitle>
        Oops, it seems like there version {site.state.version} coun't be fetched due to a network issue. Try again in a few moments.
      </CommandDocumentationStyles.NoVersionTitle>
    </CommandDocumentationStyles.Container>
  )
}

const formatArgument = (arg: ArgumentDefinition): string => {
  let value: string = arg.name
  value = arg.variadic ? `...${value}` : value
  value = arg.required ? required(value) : optional(value)
  return value
}

const formatArguments = (args: ArgumentDefinition[]): string => {
  const values: string[] = []
  for (const arg of args) {
    values.push(formatArgument(arg))
  }
  return values.join(' ')
}

const getCommandName = (command: CommandDefinition, childCommand: CommandDefinition | undefined, withTerminalChar: string = ''): string => {
  if (childCommand) {
    const childArgs: string = formatArguments(childCommand.args)
    const args: string = formatArguments(command.args)
    const childOpts: string = childCommand.opts.length > 0 ? '[... options]' : ''
    const opts: string = command.opts.length > 0 ? '[... options]' : ''
    return `${withTerminalChar} emily ${command.name} ${args} ${opts} ${childCommand.name} ${childArgs} ${childOpts}`
  }

  const args: string = formatArguments(command.args)
  const opts: string = command.opts.length > 0 ? '[... options]' : ''
  return `${withTerminalChar} emily ${command.name} ${args} ${opts}`
}

const getCommandDescription = (command: CommandDefinition): JSX.Element => {
  const descriptionItems = []
  const description = command.description?.split('\n')
  if (!description) return <div></div>
  if (description.length === 1) return <div>{description}</div>

  let idx = 0
  for (const descriptionLine of description) {
    descriptionItems.push(<div key={idx}>{descriptionLine}</div>)
    idx++
  }
  return (
    <div>
      {descriptionItems}
    </div>
  )
}

const getTerminalSections = (command: CommandDefinition): JSX.Element[] => {
  let terminalContent: JSX.Element[] = []
  if (!command.extra) return []
  for (const documentationSection of command.extra[0]) {
    if (documentationSection.type === 'terminal') {
      const content: JSX.Element[] = renderSections(documentationSection.type, documentationSection.content)
      terminalContent.push(...content)
    }
  }
  return terminalContent
}

const getExampleSections = (selectedCommand: CommandDefinition, selectedChildCommand: CommandDefinition | undefined): React.ReactNode => {
  const renderingCommand: CommandDefinition = selectedChildCommand ? selectedChildCommand : selectedCommand
  if (!renderingCommand.extra) return []

  const filter: DocSectionType[] = ['terminal']
  const sectionsToRender: (string | DocSection)[] = []
  for (const section of renderingCommand.extra[0]) {
    if (section.type === undefined) continue
    if (filter.includes(section.type) === false) sectionsToRender.push(section)
  }

  const rendered: JSX.Element[] = renderSections(undefined, sectionsToRender)
  return rendered
}

export const findSelectedCommand = (commandStr: string, emilyDefinition: CommandDefinition): CommandDefinition => {
  for (const CommandDefinitionWithDocumentation of emilyDefinition.subCommands) {
    if (CommandDefinitionWithDocumentation.name === commandStr) {
      return CommandDefinitionWithDocumentation
    }
  }
  showError(`Could not find documentation for command ${commandStr}`)
  return emilyDefinition.subCommands[0]
}

export const findSelectedChildCommand = (commandStr: string | undefined, selectedCommand: CommandDefinition): CommandDefinition | undefined => {
  if (commandStr === undefined) return undefined
  for (const CommandDefinitionWithDocumentation of selectedCommand.subCommands) {
    if (CommandDefinitionWithDocumentation.name === commandStr) {
      return CommandDefinitionWithDocumentation
    }
  }
  return undefined
}

export const processAndShowError = (error: any) => {
  let msg = ''
  try { msg = error.errors.join('\n') }
  catch { msg = 'Something went wrong.' }
  return showError(msg)
}

export const showError = (msg: string) => {
  toast(msg, {
    toastId: msg,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return <></>
}