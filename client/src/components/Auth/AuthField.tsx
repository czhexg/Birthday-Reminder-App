import React from "react";
import { TextField } from "@mui/material";

import { LoginStateType, RegisterStateType } from "../../types/Types";

type AuthFieldProps = {
    id: string;
    label: string;
    loginInfo?: LoginStateType;
    setLoginInfo?: (loginInfo: LoginStateType) => void;
    registerInfo?: RegisterStateType;
    setRegisterInfo?: (registerInfo: RegisterStateType) => void;
};

function AuthField(props: AuthFieldProps): JSX.Element {
    function handleChange(e) {
        if (props.loginInfo) {
            let tempInfo = props.loginInfo;
            tempInfo[props.id] = e.target.value;
        }
    }
    return (
        <TextField
            id={props.id}
            label={props.label}
            variant="outlined"
            size="small"
            onChange={(e) => handleChange(e)}
            sx={{
                input: {
                    backgroundColor: "#fafafa",
                },
                marginBottom: "7px",
                borderColor: "#dbdbdb",
            }}
        />
    );
}

export default AuthField;
