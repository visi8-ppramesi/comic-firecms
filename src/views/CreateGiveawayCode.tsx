import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, FormControl, TextField, MenuItem, InputLabel } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton"
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { Comic } from "@/types/comics"
// import { ComicChapter } from "@/types/chapters"
// import { buildComicsCollection } from "@/collections/comics/comics"
// import { buildChaptersComicsCollection } from "@/collections/comics/chapters/chapters"
import { SideDialogsController, useFireCMSContext, useSideDialogsController, CustomDialogActions } from "ppramesi-firecms";
import isEmpty from "lodash/isEmpty"

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import axios, { AxiosResponse } from "axios";

type CreateGiveawayCodeType = {
    data_url: string,
}

export function CreateGiveawayCode() {
    const { firebaseApp } = useFireCMSContext()
    const db = getFirestore(firebaseApp)
    const sideDialogController = useSideDialogsController();

    const [comicStatus, setComicStatus] = React.useState<string>("idle")
    const [comicValues, setComicValues] = React.useState<any>(null)

    useEffect(() => {
        console.log("useEffect top")
        getDocs(collection(db, "comics"))
            .then((snap) => {
                return snap.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.get("title")
                    return acc
                }, {} as any)
            })
            .then((response) => {
                setComicValues(response);
                setComicStatus("success");
            })
    }, [])

    // const { execute: comicExecute, status: comicStatus, value: comicValues, error: comicError } = useAsync(comicFetchFunction, true)

    const [comic, setComic] = React.useState<string>("")
    const [chapter, setChapter] = React.useState<string>("")
    const [chapterValues, setChapterValues] = React.useState({})
    const [chapterStatus, setChapterStatus] = React.useState("idle")
    const [chapterError, setChapterError] = React.useState(null)

    const [expiration, setExpiration] = React.useState(null)

    const [showForm, setShowForm] = React.useState(true)
    const [qrDataUrl, setQrDataUrl] = React.useState("")

    useEffect(() => {
        if(!isEmpty(comic)){
            getDocs(collection(db, "comics", comic, "chapters"))
                .then((snap) => {
                    return snap.docs.reduce((acc, doc) => {
                        acc[doc.id] = doc.get("chapter_number")
                        return acc
                    }, {} as any)
                })
                .then((chapterValues) => {
                    setChapterValues(chapterValues)
                    setChapterStatus("success");
                 })
                 .catch((error) => {
                    setChapterError(error);
                    setChapterStatus("error");
                 })
        }
    }, [comic])

    const comicChangeHandler = (event: SelectChangeEvent<string>) => {
        console.log("comicChangeHandler")
        setComic(event.target.value)
    }

    const chapterChangeHandler = (event: SelectChangeEvent<string>) => {
        setChapter(event.target.value)
    }

    const auth = getAuth(firebaseApp)

    let submissionStatus = "idle"
    const [ buttonLoading, setButtonLoading ] = React.useState(false)

    const submitGiveaway = useCallback(() => {
        const {currentUser} = auth
        if(currentUser && submissionStatus === "idle"){
            setButtonLoading(true)
            submissionStatus = "submitting"
            const config: {headers?: {[headerValue: string]: string}} = {}
            currentUser.getIdToken(true)
                .then((tokenId) => {
                    const giveawayUrl = new URL(import.meta.env.VITE_GIVEAWAY_SERVICE_URL)
                    giveawayUrl.pathname = "create-code"

                    config.headers = {
                        Authorization: `Bearer ${tokenId}`
                    }
                    return axios.post(
                        giveawayUrl.toString(),
                        {
                            expirationDate: expiration, 
                            comicId: comic, 
                            chapterId: chapter
                        },
                        config
                    ).then((response: AxiosResponse<CreateGiveawayCodeType>) => {
                        const { data_url: dataUrl } = response.data
                        submissionStatus = "idle"
                        setQrDataUrl(dataUrl)
                        setShowForm(false)
                    })
                })
                .finally(() => {
                    setButtonLoading(false)
                })
        }else if(submissionStatus === "submitting"){
            //do stuff here
        }
    }, [comic, chapter, expiration])

    const clickSubmitGiveaway = useCallback(() => {
        submitGiveaway()
    }, [comic, chapter, expiration])

    const downloadQrCode = useCallback(() => {
        const link = document.createElement("a");
        link.href = qrDataUrl;
        link.download = "qrcode.png";
        link.click();
    }, [qrDataUrl])

    const showQrCode = () => {
        return (
            <Box m="auto"
                display="flex"
                flexDirection={"column"}
                alignItems={"center"}
                justifyItems={"center"}>

                <div style={{ paddingBottom: 15 }}>QR Code</div>
                <img style={{ marginBottom: '8px', marginTop: "16px" }} src={qrDataUrl} />
                <Button style={{ marginBottom: '8px', marginTop: "16px" }} onClick={downloadQrCode} variant="contained">Download QR Code</Button>
            </Box>
        )
    }

    const showFormFunction = () => {
        console.log("showFormFunction")
        return (
            <Box m="auto"
                display="flex"
                flexDirection={"column"}
                alignItems={"center"}
                justifyItems={"center"}>

                <Box p={4}>
                    <div style={{ paddingBottom: 15 }}>Create New Giveaway Code</div>
                    <FormControl margin="normal" fullWidth id="comic-input">
                        <InputLabel id="demo-simple-select-label">Comic</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value= {comic}
                            label="Age"
                            onChange={comicChangeHandler}
                        >
                            {
                                comicStatus === "success" ? 
                                Object.keys(comicValues).map((key) => {
                                    return <MenuItem value={key} key={key}>{comicValues[key]}</MenuItem>
                                }) :
                                <MenuItem value="">None</MenuItem>
                            }
                        </Select>
                    </FormControl>

                    <FormControl margin="normal" fullWidth id="chapter-input">
                        <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={chapter}
                            label="Age"
                            onChange={chapterChangeHandler}
                        >
                            {
                                chapterStatus === "success" ? 
                                Object.keys(chapterValues).map((key) => {
                                    return <MenuItem value={key} key={key}>{(chapterValues as any)[key]}</MenuItem>
                                }) : 
                                <MenuItem value="">None</MenuItem>
                            }
                        </Select>
                    </FormControl>
                    
                    <FormControl margin="normal" fullWidth id="expiration-input">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Expiration Date"
                                value={expiration}
                                onChange={(newValue) => {
                                    setExpiration(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    {/* <TextField value={formValue.age3} onChange={buildHandleChange("age3")} fullWidth label="Tes 3" id="fullWidth"/> */}
                </Box>
            </Box>
        )
    }

    const submitButtons = () => {
        if(showForm){
            return (
                <>
                    <LoadingButton loading={buttonLoading} onClick={clickSubmitGiveaway} variant="contained" loadingIndicator="Submitting...">Create Giveaway Code</LoadingButton>
                    <Button onClick={() => {sideDialogController.close()}} variant="contained">Close</Button>
                </>
            )
        }else{
            return (
                <Button onClick={() => {sideDialogController.close()}} variant="contained">Close</Button>
            )
        }
    }

    return (
        <>
            <Box display="flex"
                minWidth="480px"
                width={"100%"}
                height={"100%"}>
                {showForm ? showFormFunction() : showQrCode()}
            </Box>
            
            <CustomDialogActions position={"absolute"}>
                {submitButtons()}
            </CustomDialogActions>
        </>
    )
}