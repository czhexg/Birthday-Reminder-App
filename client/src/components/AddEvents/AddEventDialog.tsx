import React, { useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Event } from "../../types/Types";
import { DatePicker } from "@mui/x-date-pickers";

type AddEventDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    setNewEventCreated: (newEventCreated: boolean) => void;
};

export default function AddEventDialog(props: AddEventDialogProps) {
    const [newEvent, setNewEvent] = useState<Event>({
        newEventName: "",
        newEventType: "",
        newEventDate: new Date(),
    });

    function handleCancel(): void {
        props.setOpen(false);
        console.log("cancelled");
    }

    function handleSubmit(): void {
        // check if newEventName/type is empty, update db
        props.setOpen(false);
        props.setNewEventCreated(true);
        console.log("submitted");
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleCancel} fullWidth>
                <DialogTitle>Add Event</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="eventName"
                        label="Event Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {
                            setNewEvent({
                                ...newEvent,
                                newEventName: event.target.value,
                            });
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="eventType"
                        label="Event Type"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {
                            setNewEvent({
                                ...newEvent,
                                newEventType: event.target.value,
                            });
                        }}
                    />
                    <DatePicker
                        value={dayjs(newEvent.newEventDate)}
                        onChange={(newDate: Dayjs | null) => {
                            if (newDate) {
                                setNewEvent({
                                    ...newEvent,
                                    newEventDate: newDate.toDate(),
                                });
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
