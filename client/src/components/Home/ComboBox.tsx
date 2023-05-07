import * as React from "react";
import { TextField, Autocomplete } from "@mui/material";

export default function ComboBox() {
    const options: string[] = ["one", "two", "three"];
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
        />
    );
}
