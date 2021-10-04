import { Col, Container, Row } from "react-bootstrap"
import { SiteContextProps, useSite } from "../../state/site/site-state.provider"
import { BranchInput } from "./branch-input"
import { ReleaseSelector } from "./release-selector"

export const GitObjectSelectionDev = () => {
    const site: SiteContextProps = useSite()

    return (
        <Container>
            <style type="text/css">
                {`
                    .selection-title, .selection-desc {
                        color: white;
                        text-align: center;
                    }
                    
                    #release-box {
                        display: flex;
                        justify-content: right;
                        align-items: end;
                    }

                `}
            </style>
            <Row className="mb-5 mt-5">
                <h1 className="selection-title">{site.state.version}</h1>
                <p className="selection-desc">To find documentation for a specific version of Emily CLI, either select a <strong>release</strong> or enter a <strong>branch</strong>.</p>
            </Row>
            <Row>
                <Col xs="6">
                    <div id="release-box">
                        <ReleaseSelector />
                    </div>
                </Col>
                <Col xs="6">
                    <BranchInput />
                </Col>
            </Row>
        </Container>
    )
}

export const GitObjectSelection = () => {
    return (
        <div>
            <style type="text/css">
                {`
                    .selection-title, .selection-desc {
                        color: white;
                        text-align: center;
                    }
                `}
            </style>
            <ReleaseSelector />
        </div>
    )
}