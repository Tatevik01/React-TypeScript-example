import React from "react"
import { RouteComponentProps } from "react-router"
import styled from "styled-components"
import { login as loginApi, logout as logoutApi } from "../../auth/authApi"
import { translate } from "../../internationalization/i18n"
import { LoginForm } from "./LoginForm"

const LoginContainer = styled.main`
    @media (max-width: 480px) {
        width: 300px;
        height: 100vh;
    }
    @media (min-width: 480px) {
        width: 400px;
    }
    padding-top: 25vh;
    margin-left: auto;
    margin-right: auto;

    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LoginTitle = styled.h3`
    width: 100%;
    color: #3a3a3a;
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 30px;
    line-height: 37px;
    text-align: left;
    margin-bottom: 1.5em;
`

export const LoginPage: React.FC<RouteComponentProps> = (props) => {
    const login = async (email: string, password: string) => {
        try {
            await loginApi(email, password)
            props.history.push("/")
        } catch (err) {
            // await logoutApi()
        }
    }

    return (
        <LoginContainer>
            <LoginTitle>{translate("login")}</LoginTitle>
            <LoginForm onSubmit={login} />
        </LoginContainer>
    )
}
