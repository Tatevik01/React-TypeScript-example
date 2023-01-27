import React, { Fragment } from "react"
import _ from "lodash"

import { IStepResponse, IStepResult } from "../../../results/result.interfaces"
import { translate } from "../../../internationalization/i18n"

interface IStepResponseProps {
    step: IStepResult
    response?: IStepResponse
}

interface ISignatureResponse {
    name: string
    image: string
}

export const StepSignatureResponse: React.FunctionComponent<IStepResponseProps> = ({ step, response }) => {
    if (!response || !response.answer) {
        return <p className="is-italic">{translate(`stepResponse.noSignatureGiven`)}</p>
    }

    return (
        <div className="columns is-multiline">
            <Fragment>
                {(response.answer as ISignatureResponse[])
                    .filter((signature) => signature.image)
                    .map((signature) => (
                        <div className="column">
                            <img src={signature.image} alt="Signature" />
                            {signature && signature.name && <blockquote>{signature.name}</blockquote>}
                        </div>
                    ))}
            </Fragment>
        </div>
    )
}
