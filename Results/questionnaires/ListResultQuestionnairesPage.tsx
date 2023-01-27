import _ from "lodash"
import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"

import { linkToResultsInspectionTargetsForQuestionnaire } from "../../../utils/routing"
import { QuestionnairePreview } from "../../../questionnaire/list/Preview/QuestionnairePreview"
import { useFetchCollection } from "../../../utils/useFetch"
import { listQuestionnaires } from "../../../questionnaire/questionnaire.api"
import { BreadcrumbsPortal, IBreadcrumbsPortalRef } from "../../../utils/Breadcrumbs"
import { translate } from "../../../internationalization/i18n"

export const ListResultQuestionnairesPage: React.FunctionComponent<RouteComponentProps & IBreadcrumbsPortalRef> = ({ match, breadcrumbRef }) => {
    const { isLoading, data: questionnairePreviews } = useFetchCollection(listQuestionnaires)

    if (isLoading) {
        return null
    }

    return (
        <div className="column is-full">
            <BreadcrumbsPortal breadcrumbRef={breadcrumbRef} titles={[translate("result.results")]} />

            {_.isEmpty(questionnairePreviews) ? (
                <p>{translate("result.noQuestionnaires")}</p>
            ) : (
                <div className="columns is-multiline is-vcentered">
                    {questionnairePreviews.map((preview) => {
                        return (
                            <div className="column is-one-third is-narrow" key={preview.id}>
                                <Link to={linkToResultsInspectionTargetsForQuestionnaire(match, preview.id)}>
                                    <QuestionnairePreview id={preview.id} title={preview.title} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
