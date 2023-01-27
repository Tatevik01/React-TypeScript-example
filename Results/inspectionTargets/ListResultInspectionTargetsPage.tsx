import _ from "lodash"
import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"

import { linkToSpecificResult, QuestionnaireRouteParams } from "../../../utils/routing"
import { useFetchCollection, useFetchOne } from "../../../utils/useFetch"
import { getResultsForInspectionTargets } from "../../../results/results.api"
import { BreadcrumbsPortal, IBreadcrumbsPortalRef } from "../../../utils/Breadcrumbs"
import { getSpecificQuestionnaire } from "../../../questionnaire/questionnaire.api"
import { formatResultTitle } from "../../../results/result.interfaces"
import { translate } from "../../../internationalization/i18n"

type IListResultInspectionTargetsPageProps = RouteComponentProps<QuestionnaireRouteParams> & IBreadcrumbsPortalRef

export const ListResultInspectionTargetsPage: React.FunctionComponent<IListResultInspectionTargetsPageProps> = ({ match, breadcrumbRef }) => {
    const { isLoading, data: results } = useFetchCollection(() => getResultsForInspectionTargets(match.params.questionnaireId))
    const { data: questionnaire } = useFetchOne(() => getSpecificQuestionnaire(match.params.questionnaireId))

    if (isLoading) {
        return null
    }

    return (
        <div className="column is-full">
            <BreadcrumbsPortal
                breadcrumbRef={breadcrumbRef}
                titles={[translate("result.results"), (questionnaire && questionnaire.title) || translate("questionnaire.title")]}
            />

            {_.isEmpty(results) ? (
                <p>{translate("result.noResults")}</p>
            ) : (
                <div className="columns is-multiline is-vcentered">
                    {results.map((result) => {
                        return (
                            <div className="column is-one-third is-narrow" key={result.id}>
                                <Link to={linkToSpecificResult(match, { resultId: result.id })}>
                                    <div className="is-link box columns is-vcentered">
                                        <h4 className="subtitle">{formatResultTitle(result)}</h4>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
