import { styled } from "../../global/style/themes";
import { Button, Col, Row } from "react-bootstrap";
import { SiteContextProps, useSite } from "../../state/site/site-state.provider";
import { HR1 } from "../line-break/line-break";
import { CommandDefinition } from "cilly";


const getSelectedChildCommandButtonColumn = (childCommand: CommandDefinition, site: SiteContextProps): JSX.Element => {
    return (
        <Col className="mt-3 mb-3" key={`col-${childCommand.name}`}>
            <Button onClick={() => site.changeChildCommand(undefined)} key={childCommand.name} variant="success">
                {childCommand.name}
            </Button>
        </Col>
    )
}

const getSelectedCommandButtonColumn = (command: CommandDefinition, site: SiteContextProps): JSX.Element => {
    return (
        <Col className="mt-3" key={`col-${command.name}`}>
            <Button size="lg" key={command.name} onClick={() => site.changeChildCommand(undefined)} variant="success">
                {command.name}
            </Button>
        </Col>
    )
}

const getChildCommandButtonColumn = (childCommand: CommandDefinition, site: SiteContextProps): JSX.Element => {
    return (
        <Col className="mt-3 mb-3" key={`col-${childCommand.name}`}>
            <Button onClick={() => site.changeChildCommand(childCommand.name)} key={childCommand.name} variant="warning">
                {childCommand.name}
            </Button>
        </Col>
    )
}

const getCommandButtonColumn = (command: CommandDefinition, site: SiteContextProps): JSX.Element => {
    return (
        <Col className="mt-3" key={`col-${command.name}`}>
            <Button size="lg" key={command.name} onClick={() => site.changeCommand(command.name)} variant="warning">
                {command.name}
            </Button>
        </Col>
    )
}

const getChildCommandButtons = (command: CommandDefinition, selectedChildCommand: CommandDefinition | undefined, site: SiteContextProps): any[] => {
    const childCommandButtons = []

    if (command.subCommands.length > 0) childCommandButtons.push(<HR1 />)

    for (const subcommand of command.subCommands) {
        const selected = (selectedChildCommand && selectedChildCommand.name === subcommand.name)
        const button = selected ? getSelectedChildCommandButtonColumn(subcommand, site)
            : getChildCommandButtonColumn(subcommand, site)
        childCommandButtons.push(button)
    }
    return childCommandButtons
}

const getCommandButtons = (emilyCommand: CommandDefinition,
    selectedCommand: CommandDefinition,
    selectedChildCommand: CommandDefinition | undefined,
    site: SiteContextProps)
    : { commandButtons: JSX.Element[], childCommandButtons: JSX.Element[] } => {
    let commandButtons = []
    let childCommandButtons = []

    for (const command of emilyCommand.subCommands) {
        const selected: boolean = command.name === selectedCommand.name

        if (selected) {
            const button = getSelectedCommandButtonColumn(command, site)
            childCommandButtons = getChildCommandButtons(command, selectedChildCommand, site)
            commandButtons.push(button)
            continue
        }

        const button = getCommandButtonColumn(command, site)
        commandButtons.push(button)
    }
    return { commandButtons, childCommandButtons }
}

const CommandList = (props: { selectedCommand: CommandDefinition, selectedChildCommand: CommandDefinition | undefined, emilyCommand: CommandDefinition }) => {
    const site: SiteContextProps = useSite()
    const { commandButtons, childCommandButtons } = getCommandButtons(props.emilyCommand, props.selectedCommand, props.selectedChildCommand, site)

    return (
        <Row className='mt-5'>

            <style type="text/css">
                {`
                .btn-success, .btn-success:hover, .btn-success:active, .btn-success:focus {
                    background-color: white;
                    border-radius: 30px;
                    color: #7a0029;
                    border: 1px solid #7a0029;
                    box-shadow: none;
                }

                .btn-warning {
                    background-color: #7a0029;
                    border-radius: 30px;
                    color: white;
                    border: 1px solid white;
                    box-shadow: none;
                  }
        
                  .btn-warning:hover, .btn-warning:active, .btn-warning:focus{
                    background-color: white;
                    color: #7a0029;
                    border: 1px solid #7a0029;
                    box-shadow: none;
                  }
                `}
            </style>
            <Col lg={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} xs={{ span: 4, offset: 4 }}>
                <Row className='mt-5 justify-content-md-center'>
                    {commandButtons}
                </Row>
                <Row className='mt-5'>
                    {childCommandButtons}
                </Row>
            </Col>
        </Row>
    )
}

export const CommandListStyles = {
    CommandList
}