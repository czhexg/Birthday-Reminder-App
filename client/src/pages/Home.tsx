import React, { useState } from "react";
import AddEventButton from "../components/AddEvents/AddEventButton";
import AddEventDialog from "../components/AddEvents/AddEventDialog";
import { Event } from "../types/Types";
import EventsTable from "../components/Home/EventsTable";
import useAuth from "../hooks/useAuth";

function Home() {
    const [open, setOpen] = useState<boolean>(false);
    const [newEventCreated, setNewEventCreated] = useState<boolean>(false);
    const { auth } = useAuth();

    function handleEventDialogOpen(): void {
        setOpen(true);
    }

    return (
        <div>
            <EventsTable newEventCreated={newEventCreated} />
            <AddEventButton handleEventDialogOpen={handleEventDialogOpen} />
            <AddEventDialog
                open={open}
                setOpen={setOpen}
                setNewEventCreated={setNewEventCreated}
            />
        </div>
    );
}

export default Home;
