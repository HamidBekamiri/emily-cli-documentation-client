import { styled } from "../../global/style/themes";

const Container = styled.section`
  padding: 1em 8em;
  text-align: center;
  margin-bottom: 50px;
`
const Name = styled.h1`
  font-size: 2.5em;
  color: white;
`

const Description = styled.div`
  font-size: 1.5em;
  padding-bottom: 80px;
  color: white;
`

const NoVersionTitle = styled.div` 
  font-size: 1.5em;
  text-align: center;
  color: white;
  padding-top: 50px;
  height: 500px;
`

const Examples = styled.section`
`

const ExampleTitle = styled.h1`
  margin-top: 50px; 
  margin-bottom: 50px; 
  color: white
`
const ExampleContent = styled.div`
  color: white;
  padding-bottom: 10px;
`

const ExampleBold = styled.strong`
  color: inherit;
`

const ExampleItalic = styled.em`
  color: inherit
`

const ExampleBulletPoint = styled.div`
  text-align: left;
  margin-left: 30px;
`

const ExampleBulletPointBlock = styled.div`;
  margin-left: 5%;
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;
  border-left: 1px solid rgba(255,255,255,0.2);
`

const ExampleCodeLine = styled.span`
  color: #ff3385;
  font-family: consolas;
`

const EmilyCommand = styled.span`
  color: #03fc0f;
`

const EmilyOutput = styled.span`
  color: #6bbfff;
`

const List = styled.ul`
  list-style: none;
`

const Option = styled.li`

`

const Argument = styled.li`

`

export const CommandDocumentationStyles = {
  Container,
  Name,
  Description,
  List,
  Option,
  Argument,
  NoVersionTitle,
  Examples,
  ExampleTitle,
  ExampleContent,
  ExampleBulletPoint,
  ExampleBulletPointBlock,
  ExampleBold,
  ExampleItalic,
  ExampleCodeLine,
  EmilyCommand,
  EmilyOutput
}