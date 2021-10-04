import { CodeBlockStyles } from "../code-block/code-block.styles"
import { CodeTip } from "../code-tip/code-tip"
import { HR2 } from "../line-break/line-break"
import { CommandDocumentationStyles } from "./command-documentation.styles"
import { v4 as uuidv4 } from "uuid"

export type DocSectionType = 'title' | 'body' | 'code' | 'codeblock' | 'terminal' | 'hline' | 'break' | 'tip' | 'bold' | 'italic' | 'link' | 'bulletpoint' | 'bulletpointblock'

export type DocSection = {
  type: DocSectionType,
  content: (string | DocSection)[]
}

export const renderSections = (type: DocSectionType | undefined, content: (string | DocSection)[]): JSX.Element[] => {
  const rendered: JSX.Element[] = []
  if (!isList(content)) {
    console.log(`Content of type ${type} is not a list. Expected (string | DocSection)[] but got ${content}`)
    return []
  }

  for (const section of content) {
    if (isString(section)) {
      const renderedElement = <span>{renderString(section as string)}</span>
      rendered.push(renderedElement)
      continue
    }

    const docSection = section as DocSection
    
    if (docSection.type === 'link') {
      const renderedElement = renderLink(docSection.content)
      rendered.push(renderedElement)
    }
    else {
      const subElements: JSX.Element[] = renderSections(docSection.type, docSection.content)
      const renderedElement = renderSection(docSection.type, subElements)
      rendered.push(renderedElement)
    }
  }
  return rendered
}

const renderString = (content: string): JSX.Element => {
  const result = []
  const wordList = content.split(' ')
  let latest: string | undefined = undefined
  for (const word of wordList) {
    if (word === 'emily' && latest === '$') result.push(<CommandDocumentationStyles.EmilyCommand>{word} </CommandDocumentationStyles.EmilyCommand>)
    else if (word === 'Emily:') result.push(<CommandDocumentationStyles.EmilyOutput>{word} </CommandDocumentationStyles.EmilyOutput>)
    else result.push(word + ' ')
    latest = word
  }
  return <span key={uuidv4()}>{result}</span>
}

const renderLink = (content: (string | DocSection)[]): JSX.Element => {
  if (content.length === 1 && isString(content[0])) {
    const href = content[0] as string
    return <a href={href} key={uuidv4()} target="_blank" rel="noreferrer">link</a>
  }
  return <span key={uuidv4()}></span>
}

const renderSection = (type: DocSectionType | undefined, subElements: JSX.Element[]): JSX.Element => {
    if (type === 'title') return <CommandDocumentationStyles.ExampleTitle key={uuidv4()}>{subElements}</CommandDocumentationStyles.ExampleTitle>
    if (type === 'body') return <CommandDocumentationStyles.ExampleContent key={uuidv4()}>{subElements}</CommandDocumentationStyles.ExampleContent>
    if (type === 'bold') return <CommandDocumentationStyles.ExampleBold key={uuidv4()}>{subElements}</CommandDocumentationStyles.ExampleBold>
    if (type === 'italic') return <CommandDocumentationStyles.ExampleItalic key={uuidv4()}>{subElements}</CommandDocumentationStyles.ExampleItalic>
    if (type === 'break') return <p key={uuidv4()} /> // react wrappes br in p for some reason, creating bigger space
    if (type === 'hline') return <HR2 key={uuidv4()} />
    if (type === 'codeblock') return <CodeBlockStyles.Block key={uuidv4()}>{subElements}</CodeBlockStyles.Block>
    if (type === 'code') return <CommandDocumentationStyles.ExampleCodeLine key={uuidv4()}>{subElements}</CommandDocumentationStyles.ExampleCodeLine>
    if (type === 'tip') return <CodeTip key={uuidv4()}>{subElements}</CodeTip>
    if (type === 'bulletpoint') return <CommandDocumentationStyles.ExampleBulletPoint key={uuidv4()}>• {subElements}</CommandDocumentationStyles.ExampleBulletPoint>
    if (type === 'bulletpointblock') return <CommandDocumentationStyles.ExampleBulletPointBlock key={uuidv4()}>{subElements}</CommandDocumentationStyles.ExampleBulletPointBlock>
    if (type === 'terminal') return <div key={uuidv4()}>{subElements}</div>
  
    console.log(`Unrecognized section type: ${type}`)
    return <span key={uuidv4()}></span>
  }

  const isString = (v: any): boolean => {
    return (typeof v === 'string' || v instanceof String)
  }
  
  const isList = (v: any): boolean => {
    return Array.isArray(v)
  }