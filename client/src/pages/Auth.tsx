import { Container } from "@mui/material";

import AuthForm from "../components/Auth/AuthForm";

type AuthProps = {
    currentAuth: string;
};

export default function Auth(props: AuthProps): JSX.Element {
    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    margin: "3rem auto 0",
                    justifyContent: "center",
                }}
            >
                <AuthForm currentAuth={props.currentAuth} />
            </Container>
        </>
    );
}
