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
    function handleChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        if (props.loginInfo && props.setLoginInfo) {
            console.log(e.target.value);

            let tempInfo = props.loginInfo;
            tempInfo[props.id] = e.target.value;
            console.log(tempInfo);

            props.setLoginInfo(tempInfo);
        } else if (props.registerInfo && props.setRegisterInfo) {
            let tempInfo = props.registerInfo;
            tempInfo[props.id] = e.target.value;
            props.setRegisterInfo(tempInfo);
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
