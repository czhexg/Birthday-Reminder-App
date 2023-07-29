import { useState } from "react";
import AddEventButton from "../components/AddEvents/AddEventButton";
import AddEventDialog from "../components/AddEvents/AddEventDialog";
import EventsTable from "../components/Home/EventsTable";

function Home() {
    const [open, setOpen] = useState<boolean>(false);
    const [newEventCreated, setNewEventCreated] = useState<boolean>(false);

    function handleEventDialogOpen(): void {
        setOpen(true);
    }

    return (
        <div>
            <EventsTable
                newEventCreated={newEventCreated}
                setNewEventCreated={setNewEventCreated}
            />
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
