import { ArgumentDefinition, OptionDefinition } from "cilly";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const Options = styled.section`
    text-align: left;
    color: white;
`

const OptionTitle = styled.section`
    text-align: left;
    font-size: 1em;
    font-weight: bold;
    color: white;
`

class OptionDefinitionFormatter {
    option: OptionDefinition

    constructor(option: OptionDefinition) {
        this.option = option
    }

    public getArg(arg: ArgumentDefinition): string {
        let argStr = ''
        argStr += arg.variadic ? `...${arg.name}` : arg.name
        argStr += arg.required ? '*' : ''
        return argStr
    }

    public getArgs(): string {
        const args: string[] = []
        for (const arg of this.option.args) {
            const argStr = this.getArg(arg)
            args.push(argStr)
        }
        return args.length > 0 ? `<${args.join(', ')}>` : ''
    }

    public getShortForm(withPrefixDash: boolean = true): string {
        return withPrefixDash ? this.option.name[0] : this.option.name[0].slice(1)
    }

    public getLongForm(withPrefixDash: boolean = true, negated: boolean = false): string {
        const flag = withPrefixDash ? this.option.name[1] : this.option.name[1].slice(2)
        if (!negated) return flag
        if (!this.option.negatable) return ''
        return `(--no-${this.getLongForm(false, false)})`
    }

    public getLongFormWithOptions() {
        const name: string = this.getLongForm(true, false)
        const negatedName: string = this.getLongForm(true, true)
        const args: string = this.getArgs()
        return `${name} ${negatedName} ${args}`
    }

    public getDescription(): string {
        let desc = this.option.description
        return desc ?? ''
    }
}

const CommandUsage = (props: { commandName: string, opts: OptionDefinition[] }) => {

    const optionRows = []
    let optionRowIdx = 0
    for (const option of props.opts) {
        const formatter: OptionDefinitionFormatter = new OptionDefinitionFormatter(option)
        const optionRow = []
        optionRow.push(<Col key={`${optionRowIdx}-short`} xs="1"><Options>{option.name[0]}</Options></Col>)
        optionRow.push(<Col key={`${optionRowIdx}-long`} xs="3"><Options>{formatter.getLongFormWithOptions()}</Options></Col>)
        optionRow.push(<Col key={`${optionRowIdx}-desc`} xs="8"><Options>{formatter.getDescription()}</Options></Col>)
        
        optionRows.push(<Row key={optionRowIdx}>{optionRow}</Row>)
        optionRowIdx++
    }

    return (
        <Container className='mb-5'>
            <Row className='mb-1'>
                <Col><OptionTitle>{props.commandName}</OptionTitle></Col>
            </Row>
            {optionRows}
        </Container>
    )
}

export const CommandUsageStyles = {
    CommandUsage
}