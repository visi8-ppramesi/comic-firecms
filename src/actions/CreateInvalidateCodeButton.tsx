import {
    AdditionalFieldDelegate, CustomDialogActions,
    useFireCMSContext, useSnackbarController
} from "ppramesi-firecms";
import { getAuth } from "firebase/auth";
import { GiveawayCode } from "@/types/giveawayCode"
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useCallback, useState } from "react"
import axios from "axios";

export const buildInvalidateField: AdditionalFieldDelegate<GiveawayCode> = {
    id: "actions",
    name: "Actions",
    Builder: ({ entity, context }) => {
        const { firebaseApp } = useFireCMSContext()
        const auth = getAuth(firebaseApp)
        const snackbar = useSnackbarController()

        const [ open, setOpen ] = useState<boolean>(false)
        const handleOpen = useCallback(() => {
            setOpen(true)
        }, [setOpen])
        const handleClose = useCallback(() => {
            setOpen(false)
        }, [setOpen])

        let submissionStatus = "idle"
        const handleInvalidate = useCallback(() => {
            const {currentUser} = auth
            if(currentUser && submissionStatus === "idle"){
                submissionStatus = "submitting"
                const config: {headers?: {[headerValue: string]: string}} = {}
                currentUser.getIdToken(true)
                    .then((tokenId) => {
                        const giveawayUrl = new URL(import.meta.env.VITE_GIVEAWAY_SERVICE_URL)
                        giveawayUrl.pathname = "invalidate-code"
    
                        config.headers = {
                            Authorization: `Bearer ${tokenId}`
                        }
                        return axios.post(
                            giveawayUrl.toString(),
                            {
                                code: entity.id,
                            },
                            config
                        ).then(() => {
                            submissionStatus = "idle"
                        })
                    })
                    .catch(() => {
                        snackbar.open({
                            type: "error",
                            message: "Invalidate Error"
                        })
                    })
                    .finally(() => {
                        setOpen(false)
                    })
            }else if(submissionStatus === "submitting"){
                //do stuff here
            }

        }, [entity])
        return (
            <>
                <Button onClick={handleOpen} color="primary" variant="outlined">Invalidate Code</Button>
                <Dialog open={open}>
                    <DialogTitle>Invalidate Code</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div>Are you sure?
                            </div>
                            <br/>
                        </DialogContentText>
                    </DialogContent>
                    <CustomDialogActions>
                        <Button color="primary" onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button color="primary"
                                variant="contained"
                                onClick={handleInvalidate}>
                            Invalidate
                        </Button>
                    </CustomDialogActions>
                </Dialog>
            </>
        )
    }
}