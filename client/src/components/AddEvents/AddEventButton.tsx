import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddEventButtonProps = {
    handleEventDialogOpen: () => void;
};

function AddEventButton(props: AddEventButtonProps) {
    return (
        <Fab
            color="primary"
            aria-label="add"
            onClick={props.handleEventDialogOpen}
            sx={{ position: "absolute", right: "4rem", bottom: "3rem" }}
        >
            <AddIcon />
        </Fab>
    );
}

export default AddEventButton;
