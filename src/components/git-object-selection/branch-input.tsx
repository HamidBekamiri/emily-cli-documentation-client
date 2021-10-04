import React, { version } from "react";
import { Button, Form } from "react-bootstrap"
import { useVersions } from "../../hooks/http.hooks";
import { SiteContextProps, useSite } from "../../state/site/site-state.provider"
import bcrypt from 'bcryptjs'

let branchState: string = ''
let password: string = ''

export const BranchInput = () => {
    const site: SiteContextProps = useSite()
    const { data, error } = useVersions()

    if (!data || error) return renderDisabledInput()

    return (
        <Form>
            <style type="text/css">
                {`
                    #formBranch {
                        width: 50%
                    }
                    .form-input{
                        border-radius: 0;
                    }
                `}
            </style>
            <Form.Group className="mb-3" controlId="formBranch">
                <Form.Control className="form-input" size="lg" onChange={e => branchState = e.target.value} type="text" placeholder="Enter a branch" />
                <Form.Control className="form-input mt-2" size="sm" onChange={e => password = e.target.value} type="password" placeholder="Enter password" />
                <Button className="mt-2" size="sm" variant="secondary" onClick={() => submitBranchInput(site)}>
                    Submit
                </Button>
            </Form.Group>
        </Form>
    )
}

const submitBranchInput = (site: SiteContextProps) => {
    var hash = bcrypt.hashSync(password, '$2a$10$1IQzeLhf1w3fcAfbXJh.JO');
    site.changeVersionPassword(branchState, hash)
}

const renderDisabledInput = () => {
    return (
        <Form>
            <style type="text/css">
                {`
                    #formBranch {
                        width: 50%
                    }
                    .form-input{
                        border-radius: 0;
                    }
                `}
            </style>
            <Form.Group className="mb-3" controlId="formBranch">
                <Form.Control disabled className="form-input" size="lg" onChange={e => branchState = e.target.value} type="text" placeholder="Enter a branch" />
                <Form.Control className="form-input mt-2" size="sm" onChange={e => password = e.target.value} type="password" placeholder="Enter password" />
                <Button disabled className="mt-1" size="sm" variant="secondary">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    )
}