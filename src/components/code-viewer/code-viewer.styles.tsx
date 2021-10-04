import { ReactNode } from "react";
import { styled } from "../../global/style/themes";
import { v4 as uuidv4 } from "uuid"
import { CommandDocumentationStyles } from "../command-documentation/command-documentation.styles";

const Window = styled.code`
  margin: 0 auto;
  padding: 1em;
  min-height: 300px;
  min-width: 500px;

  background-color: #0f001c;
  color: white;

  border-radius: 7px;
  box-shadow: 0px 5px 30px -1px rgba(0,0,0,0.4);
  margin-bottom: 30px;
`
const Header = styled.header`
  width: 100%;
  height: 1em;
  display: flex;
`

const Content = styled.section`
  width: 100%;
  padding: 1em;
  overflow-y: auto;
`

const Circle = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props =>
    props.color === 'red' ? 'red' :
      props.color === 'yellow' ? 'yellow' : 'green'
  };
  margin: 0 .2em;
`

const Line = styled.div`
  text-align: left;
  font-size: 13px;
`

const renderEmptyTerminalLine = () => {
  return (
    <Line key={uuidv4()}>
      <CommandDocumentationStyles.ExampleCodeLine>
        $ try later versions for examples
      </CommandDocumentationStyles.ExampleCodeLine>
    </Line>
  )
}

const CodeViewer = (props: { children: JSX.Element[] }) => {

  const items = props.children.map((x, i) => {
    return <Line key={i}>{x}</Line>
  })

  const terminalContent = items.length !== 0 ? items : [ renderEmptyTerminalLine() ]

  return (
    <Window>
      <Header>
        <Circle color='red' />
        <Circle color='yellow' />
        <Circle color='green' />
      </Header>

      <Content>
        {terminalContent}
      </Content>
    </Window>
  )
}

export const CodeViewerStyles = {
  CodeViewer
}