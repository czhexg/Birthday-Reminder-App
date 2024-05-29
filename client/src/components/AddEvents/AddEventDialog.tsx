import { useState } from "react";

import { Dayjs } from "dayjs";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Event } from "../../types/Types";
import { DatePicker } from "@mui/x-date-pickers";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type AddEventDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    setNewEventCreated: (newEventCreated: boolean) => void;
};

export default function AddEventDialog(props: AddEventDialogProps) {
    const [newEvent, setNewEvent] = useState<Event>({
        newEventName: "",
        newEventType: "Other",
        newEventDate: new Date(),
        newReminderDate: new Date(new Date().getDate() + 1),
    });
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    function handleCancel(): void {
        props.setOpen(false);
        console.log("cancelled");
    }

    async function handleSubmit() {
        // check if newEventName/type is empty, update db
        try {
            await axiosPrivate.post("/api/events/add", {
                userId: auth.id,
                event: newEvent.newEventName,
                type: newEvent.newEventType,
                date: newEvent.newEventDate,
                reminderDate: newEvent.newReminderDate,
            });
            props.setOpen(false);
            props.setNewEventCreated(true);
            console.log("submitted");
        } catch (error) {
            console.error(error);
        }
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
                    {/* <TextField
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
                    /> */}

                    <FormControl sx={{ marginTop: "1rem" }}>
                        <InputLabel id="event-type-label">EventType</InputLabel>
                        <Select
                            labelId="event-type-label"
                            id="eventType"
                            label="EventType"
                            value={newEvent.newEventType}
                            onChange={(event) => {
                                setNewEvent({
                                    ...newEvent,
                                    newEventType: event.target.value as string,
                                });
                            }}
                        >
                            <MenuItem value={"Birthday"}>Birthday</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>

                    <DatePicker
                        label="Event Date"
                        // value={dayjs(newEvent.newEventDate)}
                        onChange={(newDate: Dayjs | null) => {
                            if (newDate) {
                                setNewEvent({
                                    ...newEvent,
                                    newEventDate: newDate.toDate(),
                                });
                            }
                        }}
                        sx={{ marginTop: "1rem", display: "block" }}
                    />
                    <DatePicker
                        label="Reminder Date"
                        // value={dayjs(newEvent.newEventDate)}
                        onChange={(newDate: Dayjs | null) => {
                            if (newDate) {
                                setNewEvent({
                                    ...newEvent,
                                    newReminderDate: newDate.toDate(),
                                });
                            }
                        }}
                        sx={{ marginTop: "1rem" }}
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
