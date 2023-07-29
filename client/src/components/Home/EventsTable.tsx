import React, {
    useState,
    useCallback,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";
import { Link as RouterLink } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
    Box,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Alert,
    Link,
    Typography,
    DialogContentText,
    Tooltip,
    AlertProps,
} from "@mui/material";

import {
    Edit as EditIcon,
    DeleteOutlined as DeleteIcon,
    Save as SaveIcon,
    Close as CancelIcon,
} from "@mui/icons-material";

import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowModel,
    MuiEvent,
    GridRowParams,
    GridRowModesModel,
    GridRowId,
    GridColDef,
    GridRowsProp,
    GridEventListener,
} from "@mui/x-data-grid";
import { Event } from "../../types/Event";
import { Row } from "../../types/Row";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

type EventsTableProps = {
    newEventCreated: boolean;
    setNewEventCreated: Dispatch<SetStateAction<boolean>>;
};

function EventsTable(props: EventsTableProps) {
    const [snackbar, setSnackbar] = useState<Pick<
        AlertProps,
        "children" | "severity"
    > | null>(null);
    const [rows, setRows] = useState<Row[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [promiseArguments, setPromiseArguments] = useState<any>(null);
    const [deleteRow, setDeleteRow] = useState<GridRowId | null>();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    useEffect(() => {
        axiosPrivate
            .get("/api/events/", { params: { userId: auth.id } })
            .then((response) => {
                let events = response.data;

                setRows(
                    events.map((row: any) => ({
                        id: row._id,
                        event: row.event,
                        type: row.type,
                        date: new Date(row.date),
                        reminderDate: new Date(row.reminderDate),
                    }))
                );
            });
        props.setNewEventCreated(false);
    }, [props.newEventCreated]);

    const handleCloseSnackbar = () => setSnackbar(null);

    function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
        let mutations = "";
        for (let field in newRow) {
            if (newRow[field] !== oldRow[field]) {
                mutations += `${field} from '${oldRow[field]}' to '${newRow[field]}'`;
            }
        }
        return mutations;
    }

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setDeleteRow(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        // const editedRow = rows.find((row) => row.id === id);
        // if (editedRow.isNew) {
        //     setRows(rows.filter((row) => row.id !== id));
        // }
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const processRowUpdate = useCallback(
        (newRow: GridRowModel, oldRow: GridRowModel) =>
            new Promise((resolve, reject) => {
                const mutation = computeMutation(newRow, oldRow);
                if (mutation) {
                    // Save the arguments to resolve or reject the promise later
                    setPromiseArguments({ resolve, reject, newRow, oldRow });
                } else {
                    resolve(oldRow); // Nothing was changed
                }
            }),
        []
    );

    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const handleNo = () => {
            const { oldRow, resolve } = promiseArguments;
            resolve(oldRow); // Resolve with the old row to not update the internal state
            setPromiseArguments(null);
        };

        const handleYes = async () => {
            const { newRow, oldRow, reject, resolve } = promiseArguments;
            let eventToUpdate = JSON.parse(JSON.stringify(newRow));

            try {
                // Make the HTTP request to save in the backend
                await axiosPrivate.patch("/api/events/edit", eventToUpdate);

                setSnackbar({
                    children: "Event successfully saved",
                    severity: "success",
                });
                resolve(newRow);
                setPromiseArguments(null);
            } catch (error) {
                setSnackbar({
                    children: "Fields can't be empty",
                    severity: "error",
                });
                reject(oldRow);
                setPromiseArguments(null);
            }
        };

        const { newRow, oldRow } = promiseArguments;
        const mutations = computeMutation(newRow, oldRow);

        return (
            <Dialog maxWidth="xs" open={!!promiseArguments}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>
                    {`Pressing 'Yes' will change ${mutations}.`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>No</Button>
                    <Button onClick={handleYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderDeleteDialog = () => {
        if (!deleteRow) {
            return null;
        }
        const handleCancelDelete = () => {
            setDeleteRow(null);
        };

        const handleConfirmDelete = async () => {
            const eventToDelete = rows.filter((row) => row.id === deleteRow)[0];
            let eventToDeleteCopy = JSON.parse(JSON.stringify(eventToDelete));
            console.log(eventToDeleteCopy);

            try {
                // Make the HTTP request to save in the backend
                await axiosPrivate.delete("/api/events/delete", {
                    data: eventToDeleteCopy,
                });
                setSnackbar({
                    children: "Event successfully deleted",
                    severity: "success",
                });
                setRows(rows.filter((row) => row.id !== deleteRow));
                setDeleteRow(null);
            } catch (error) {
                setSnackbar({
                    children: "Error: Event could not be deleted",
                    severity: "error",
                });
                setDeleteRow(null);
            }
        };
        const eventToDelete = rows.filter((row) => row.id === deleteRow)[0];

        return (
            <Dialog open={!!deleteRow}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>
                            Pressing 'Delete' will delete event with the
                            following details
                        </p>
                        <p>{`Event Name ${eventToDelete.event}`}</p>
                        <p>{`Event Type: ${eventToDelete.type}`}</p>
                        <p>{`Date: ${eventToDelete.date}`}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>No</Button>
                    <Button onClick={handleConfirmDelete}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    };

    const columns: GridColDef[] = [
        {
            field: "event",
            headerName: "Event",
            type: "string",
            flex: 2,
            editable: true,
        },
        {
            field: "type",
            headerName: "Event Type",
            type: "singleSelect",
            valueOptions: ["Birthday", "Other"],
            flex: 2,
            editable: true,
        },
        {
            field: "date",
            headerName: "Date",
            type: "date",
            flex: 1,
            editable: true,
        },
        {
            field: "reminderDate",
            headerName: "Reminder Date",
            type: "date",
            flex: 1,
            editable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 1,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                marginX: "auto",
                height: "500px",
                maxWidth: "60%",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            {renderConfirmDialog()}
            {renderDeleteDialog()}
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                sx={{
                    "& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle":
                        {
                            backgroundColor: "primary.main",
                            color: "white",
                            fontWeight: "bold",
                        },
                }}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
            {!!snackbar && (
                <Snackbar
                    open
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </Box>
    );
}

export default EventsTable;
