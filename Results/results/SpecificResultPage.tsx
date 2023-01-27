import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import classNames from "classnames"
import isEmpty from "lodash/isEmpty"

import { ResultRoutePage } from "../../../utils/routing"
import { useFetchOne } from "../../../utils/useFetch"
import { getSpecificResult } from "../../../results/results.api"
import { BreadcrumbsPortal, IBreadcrumbsPortalRef } from "../../../utils/Breadcrumbs"
import { getSpecificQuestionnaire } from "../../../questionnaire/questionnaire.api"
import { formatResultTitle } from "../../../results/result.interfaces"
import { StepResponse } from "./StepResponse"
import { generateReport, getReport } from "../../../report/reportsApi"
import { IReportResponse } from "../../../report/reports.interfaces"
import { translate } from "../../../internationalization/i18n"
import { StepTypes, SectionType } from "../../../questionnaire/Questionnaire.interfaces"
import { StepSignatureResponse } from "./StepSignatureResponse"

export const SpecificResultPage: React.FunctionComponent<RouteComponentProps<ResultRoutePage> & IBreadcrumbsPortalRef> = ({ match, breadcrumbRef }) => {
    const { data: questionnaire } = useFetchOne(() => getSpecificQuestionnaire(match.params.questionnaireId))
    const { isLoading, data: result } = useFetchOne(() => getSpecificResult(match.params.questionnaireId, match.params.resultId))

    useEffect(() => {
        getReport(match.params.resultId)
            .then((response) => {
                setReport(response)
                setReportGenerating(false)
            })
            .catch((errorResponse) => {
                if (errorResponse.status === 404) {
                    return
                }

                throw new Error(translate("result.error.generic"))
            })
    }, [match.params.resultId])
    const [reportGenerating, setReportGenerating] = useState(false)
    const [report, setReport] = useState<IReportResponse>({
        url: "",
        contentMd5: "",
        resultId: match.params.resultId,
    })

    if (isLoading) {
        return null
    }

    if (!result) {
        return <p className="is-danger">{translate("result.noResult")}</p>
    }

    const handleGenerateReportButtonClick: React.MouseEventHandler = async (clickEvent) => {
        setReportGenerating(true)
        const report = await generateReport(match.params.resultId)
        setReport(report)
        setReportGenerating(false)
    }

    return (
        <div className="column is-full">
            <BreadcrumbsPortal
                breadcrumbRef={breadcrumbRef}
                titles={[translate("result.results"), (questionnaire && questionnaire.title) || translate("questionnaire.title"), formatResultTitle(result)]}
            />
            <div className="box is-pulled-right">
                <div className="columns">
                    <div className="column">
                        <button
                            className={classNames("button is-warning", {
                                "is-loading": reportGenerating,
                            })}
                            onClick={handleGenerateReportButtonClick}
                        >
                            {isEmpty(report.url) ? translate("result.generateReport") : translate("result.regenerateReport")}
                        </button>
                    </div>
                    {!isEmpty(report.url) && (
                        <div className="column">
                            <a href={report.url} className="button is-link">
                                {translate("result.downloadReport")}
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="is-clearfix" />
            {result.sections
                .filter((v) => v.type !== SectionType.wrapUp)
                .map((section) => (
                    <section key={section.id} className="section box">
                        <h3 className="subtitle is-4">{section.title}</h3>

                        <table className="table is-fullwidth is-striped is-hoverable">
                            <tbody>
                                {section.steps.map((step) => (
                                    <React.Fragment key={step.id}>
                                        <tr>
                                            <th>{step.question}</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <StepResponse step={step} response={step.response} />
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </section>
                ))}
            {result.sections
                .filter((v) => v.type === SectionType.wrapUp)
                .map((section) => (
                    <section key={section.id} className="section box">
                        <h3 className="subtitle is-4">{translate("section.signatures")}</h3>

                        <table className="table is-fullwidth is-striped is-hoverable">
                            <tbody>
                                {section.steps
                                    .filter((v) => v.type === StepTypes.SIGNATURE)
                                    .map((step) => (
                                        <React.Fragment key={step.id}>
                                            <tr>
                                                <td>
                                                    <StepSignatureResponse step={step} response={step.response} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                            </tbody>
                        </table>
                    </section>
                ))}
        </div>
    )
}
