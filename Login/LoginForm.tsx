import React, { useState } from "react"
import styled from "styled-components"
import { translate } from "../../internationalization/i18n"
import Logo from "../../theme/logo.svg"

const LogoContainer = styled.div`
    position: absolute;
    width: 100vw;
    right: -50vw;
    top: -40vw;
`

const Form = styled.form`
    width: 100%;
`

const Field = styled.div`
    margin-bottom: 2em;
`

const Label = styled.label`
    display: block;
    color: #3a3a3a;
    font-family: "Montserrat";
    font-weight: bolder;
    font-size: 16px;
    line-height: 20px;
    text-align: left;
    margin-bottom: 1em;
`

const Input = styled.input`
    padding: 1.25em 1em;
    border-radius: 0;
`

const Button = styled.button`
    width: 100%;
    height: 45px;
    text-transform: uppercase;
    border-radius: 2px;
    color: #fff;

    background-image: linear-gradient(to right, #f18d00, #e9511b);
    font-family: "Montserrat";
    font-weight: 600;
    font-size: 16px;
    margin-top: 2em;

    &:hover {
        color: #fff;
    }
`

interface IProps {
    onSubmit: (email: string, password: string) => void
}

export const LoginForm: React.FC<IProps> = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value)
    }

    const onSubmit: React.FormEventHandler = (event) => {
        event.preventDefault()
        props.onSubmit(email, password)
    }

    return (
        <Form className="form" onSubmit={onSubmit}>
            <LogoContainer>
                <img src={Logo} />
            </LogoContainer>
            <Field className="field">
                <Label className="label" htmlFor="login_email">
                    {translate("email")}
                </Label>
                <Input id="login_email" type="text" value={email} onChange={onEmailChange} className="input" autoComplete="current-email" />
            </Field>
            <Field className="field">
                <Label className="label" htmlFor="login_password">
                    {translate("password")}
                </Label>
                <Input id="login_password" type="password" value={password} onChange={onPasswordChange} className="input" autoComplete="current-password" />
            </Field>
            <Button className="button">{translate("login")}</Button>
        </Form>
    )
}
