import React from "react";
import { Box, Button } from "@mui/material";
import { Entity, EntityValues, useSnackbarController, SideDialogsController } from "ppramesi-firecms";

export function CreateGiveawayCode(sideDialogController: SideDialogsController) {
    const closeDialog = () => {
        sideDialogController.close()
    }
    return (
        <Box>
            <Button onClick={closeDialog}></Button>
        </Box>
    )
}