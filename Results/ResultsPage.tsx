import React from "react"
import { Route, Switch } from "react-router-dom"

import { Routes } from "../../utils/routing"
import { ListResultQuestionnairesPage } from "./questionnaires/ListResultQuestionnairesPage"
import { ListResultInspectionTargetsPage } from "./inspectionTargets/ListResultInspectionTargetsPage"
import { SpecificResultPage } from "./results/SpecificResultPage"

export const ResultsPage: React.FunctionComponent = () => {
    const breadcrumbPortalRef = React.createRef<HTMLDivElement>()

    return (
        <div className="columns is-multiline">
            <div className="column is-full">
                <div ref={breadcrumbPortalRef} />
            </div>

            <div className="column is-full">
                <Switch>
                    <Route
                        path={Routes.ResultQuestionnaires}
                        exact={true}
                        render={(props) => <ListResultQuestionnairesPage {...props} breadcrumbRef={breadcrumbPortalRef} />}
                    />
                    <Route
                        path={Routes.ResultInspectionTargets}
                        exact={true}
                        render={(props) => <ListResultInspectionTargetsPage {...props} breadcrumbRef={breadcrumbPortalRef} />}
                    />
                    <Route
                        path={Routes.ResultSpecific}
                        exact={true}
                        render={(props) => <SpecificResultPage {...props} breadcrumbRef={breadcrumbPortalRef} />}
                    />
                </Switch>
            </div>
        </div>
    )
}
