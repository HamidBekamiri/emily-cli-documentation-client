import { CodeBlockStyles } from "./code-block.styles"

export const CodeBlock = (props: { children: JSX.Element[] }) => {
    return (
        <CodeBlockStyles.Block>
            {props.children}
        </CodeBlockStyles.Block>
    )
}