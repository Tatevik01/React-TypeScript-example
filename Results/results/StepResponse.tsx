import React, { Fragment } from "react"
import _ from "lodash"

import { IStepResponse, IStepResult } from "../../../results/result.interfaces"
import { translate } from "../../../internationalization/i18n"

interface IStepResponseProps {
    step: IStepResult
    response?: IStepResponse
}

function normalizeAnswers(response?: IStepResponse): string[] | undefined {
    if (!response || !response.answer) {
        return undefined
    }

    const answers: unknown[] = !_.isArray(response.answer) ? [response.answer] : response.answer
    return answers.map((answer) => `${answer}`)
}

export const StepResponse: React.FunctionComponent<IStepResponseProps> = ({ step, response }) => {
    const answers = normalizeAnswers(response)

    if (!answers) {
        return <p className="is-italic">{translate(`stepResponse.noAnswerGiven`)}</p>
    }

    return (
        <div className="columns is-multiline">
            {response && response.additionalComment ? (
                <Fragment>
                    <div className="column">
                        <blockquote>{answers.join(", ")}</blockquote>
                    </div>
                    <div className="column">
                        <div className="is-italic">{translate("wrapUpSection.additionalComment")}:</div>
                        <blockquote>{response.additionalComment}</blockquote>
                    </div>
                </Fragment>
            ) : (
                <blockquote>{answers.join(", ")}</blockquote>
            )}
            {response && response.photos && (
                <div className="column is-full">
                    <span className="is-italic">{translate("wrapUpSection.additionalPhotos")}:</span>
                    <div style={{ flexDirection: "row" }}>
                        {response.photos.map((photo) => {
                            return (
                                <img
                                    key={photo.id}
                                    src={photo.url}
                                    alt={translate(`wrapUpSection.additionalPhotoForStep`)}
                                    style={{
                                        width: `100%`,
                                        maxWidth: `25rem`,
                                        margin: `1rem`,
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
