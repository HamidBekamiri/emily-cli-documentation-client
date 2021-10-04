import { Toast } from 'react-bootstrap';
import { CodeTipStyles } from './code-tip.styles';

export const CodeTip = (props: { children: JSX.Element[] }) => {
    return (
        <CodeTipStyles.Tip>
            <style type="text/css">
            {`
                .toast-header {
                    background-color: #7a0029;
                    color: white;
                    border-top-left-radius: 25px;
                    border-top-right-radius: 25px;
                }

                .toast-body {
                    text-align: left;
                }

                .toast {
                    width: 50%;
                    margin: auto;
                    background-color: white;
                    color: #7a0029;
                    border-radius: 30px;
                }
            `}
            </style>
            <Toast>
                <Toast.Header closeButton={false}>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong>Emily tip</strong>
                </Toast.Header>
                <Toast.Body>{props.children}</Toast.Body>
            </Toast>
        </CodeTipStyles.Tip>
    )
}