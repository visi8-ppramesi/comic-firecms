import React from "react";
import { Button } from "@mui/material";
import { CreateGiveawayCode } from "@/views/CreateGiveawayCode"
import {
    CollectionActionsProps,
    useSnackbarController,
    useSideEntityController,
    useSideDialogsController
} from "ppramesi-firecms";

export function CreateGiveawayCodeButton({ selectionController }: CollectionActionsProps) {

    const sideDialogController = useSideDialogsController();

    const onClick = (event: React.MouseEvent) => {
        sideDialogController.open({
            key: Math.random().toString(36).substring(2),
            component: CreateGiveawayCode(sideDialogController)
        })
    };

    return (
        <Button onClick={onClick} color="primary">
            Create Giveaway Code
        </Button>
    );

}