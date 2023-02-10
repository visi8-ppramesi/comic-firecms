import {
    buildCollection,
    EntityCollection,
    EntityIdUpdateProps,
    EntityOnFetchProps,
    UploadedFileContext
} from "ppramesi-firecms";
import { ChapterPage } from "@/types/pages";
import { buildPostProcessFunction, buildStoragePathFunction } from "@/utils/pathTransformers";
import { pageSceneCollection } from "./scenes/scenes";
import React from "react"

export const buildPagesChaptersCollection = function(): EntityCollection<ChapterPage>{
    const [showViewerPoints, setShowViewerPoints] = React.useState<boolean>(false)
    const [showVideoPoster, setShowVideoPoster] = React.useState<boolean>(false)
    const mediaTypeOnChange = function(valObj: ChapterPage): void{
        if(valObj.media_type === "comic-reader"){
            setShowVideoPoster(false)
            setShowViewerPoints(true)
        }else if(valObj.media_type === "video"){
            setShowVideoPoster(true)
            setShowViewerPoints(false)
        }else{
            setShowVideoPoster(false)
            setShowViewerPoints(false)
        }
    } 
    return buildCollection<ChapterPage>({
        name: "Pages Chapters",
        path: "comics",
        callbacks: {
            onFetch(entityFetchProps: EntityOnFetchProps<ChapterPage>){
                const { entity, entity: { values } } = entityFetchProps
                mediaTypeOnChange(values)
                return entity
            },
            onIdUpdate(idUpdateProps: EntityIdUpdateProps<ChapterPage>){
                const { values } = idUpdateProps
                mediaTypeOnChange(values)
                return idUpdateProps.entityId ?? ""
            }
        },
        properties: {
            is_ar: {
                name: "Ar",
                dataType: "boolean"
            },
            media_type: {
                name: "Media Type",
                dataType: "string",
                enumValues: [
                    {id: "image", label: "image"},
                    {id: "video", label: "video"},
                    {id: "comic-reader", label: "comic-reader"},
                ]
            },
            page_image_url: {
                name: "Page Image Url",
                dataType: "string",
                storage: {
                    //gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_5.jpg
                    storagePath: buildStoragePathFunction(["comics", "$comics", "$chapters"]),
                    acceptedFiles: ["image/*, video/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    fileName: function(ctx: UploadedFileContext): string {
                        return ctx.file.name
                    },
                    postProcess: buildPostProcessFunction()
                }
            },
            page_image_url_id: {
                name: "Page Image Url (ID Translation)",
                dataType: "string",
                storage: {
                    //gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_5.jpg
                    storagePath: buildStoragePathFunction(["comics_id", "$comics", "$chapters"]),
                    acceptedFiles: ["image/*, video/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    fileName: function(ctx: UploadedFileContext): string {
                        return ctx.file.name
                    },
                    postProcess: buildPostProcessFunction()
                }
            },
            page_number: {
                name: "Page Number",
                dataType: "number"
            },
            video_poster: {
                name: "Video Poster",
                dataType: "string",
                hideFromCollection: !showVideoPoster,
                storage: {
                    //gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_5.jpg
                    storagePath: buildStoragePathFunction(["posters", "$comics", "$chapters"]),
                    acceptedFiles: ["image/*, video/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    fileName: function(ctx: UploadedFileContext): string {
                        return ctx.file.name
                    },
                    postProcess: buildPostProcessFunction()
                }
            },
            ar_button_show_time: {
                name: "Show Button Time",
                dataType: "map",
                hideFromCollection: !showViewerPoints,
                properties: {
                    start: {
                        name: "Start at",
                        dataType: "number"
                    },
                    end: {
                        name: "End at",
                        dataType: "number"
                    }
                }
            },
            scenes_data: {
                name: "AR Scene ID",
                dataType: "array",
                of: {
                    dataType: "string"
                },
                readOnly: true
            },
            comic_viewer_points: {
                name: "Comic Viewer Points",
                hideFromCollection: !showViewerPoints,
                dataType: "array",
                of: {
                    dataType: "map",
                    properties: {
                        x: {
                            name: "Viewer Point X Coordinate",
                            dataType: "number"
                        },
                        y: {
                            name: "Viewer Point Y Coordinate",
                            dataType: "number"
                        },
                        overlay: {
                            name: "Overlay",
                            dataType: "map",
                            properties: {
                                x: {
                                    name: "Overlay X Coordinate",
                                    dataType: "number"
                                },
                                y: {
                                    name: "Overlay Y Coordinate",
                                    dataType: "number"
                                },
                                height: {
                                    name: "Overlay Height",
                                    dataType: "number"
                                },
                                width: {
                                    name: "Overlay Width",
                                    dataType: "number"
                                },
                            }
                        }
                    }
                }
            }
        },
        subcollections: [pageSceneCollection]
    })
}

// export const pagesChaptersCollection = buildCollection<ChapterPage>({
//     name: "Pages Chapters",
//     path: "comics",
//     properties: {
//         is_ar: {
//             name: "Ar",
//             dataType: "boolean"
//         },
//         media_type: {
//             name: "Media Type",
//             dataType: "string",
//             enumValues: [
//                 {id: "image", label: "image"},
//                 {id: "video", label: "video"},
//                 {id: "comic-reader", label: "comic-reader"},
//             ]
//         },
//         page_image_url: {
//             name: "Page Image Url",
//             dataType: "string",
//             storage: {
//                 //gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_5.jpg
//                 storagePath: buildStoragePathFunction(["comics", "$comics", "$chapters"]),
//                 acceptedFiles: ["image/*, video/*"],
//                 metadata: {
//                     cacheControl: "max-age=1000000"
//                 },
//                 fileName: function(ctx: UploadedFileContext): string {
//                     return ctx.file.name
//                 },
//                 postProcess: buildPostProcessFunction()
//             }
//         },
//         page_image_url_id: {
//             name: "Page Image Url (ID)",
//             dataType: "string",
//             storage: {
//                 //gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_5.jpg
//                 storagePath: buildStoragePathFunction(["comics_id", "$comics", "$chapters"]),
//                 acceptedFiles: ["image/*, video/*"],
//                 metadata: {
//                     cacheControl: "max-age=1000000"
//                 },
//                 fileName: function(ctx: UploadedFileContext): string {
//                     return ctx.file.name
//                 },
//                 postProcess: buildPostProcessFunction()
//             }
//         },
//         page_number: {
//             name: "Page Number",
//             dataType: "number"
//         },
//         video_poster: {
//             name: "Video Poster",
//             dataType: "string",
//             storage: {
//                 //gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_5.jpg
//                 storagePath: buildStoragePathFunction(["posters", "$comics", "$chapters"]),
//                 acceptedFiles: ["image/*, video/*"],
//                 metadata: {
//                     cacheControl: "max-age=1000000"
//                 },
//                 fileName: function(ctx: UploadedFileContext): string {
//                     return ctx.file.name
//                 },
//                 postProcess: buildPostProcessFunction()
//             }
//         },
//         ar_button_show_time: {
//             name: "Show Button Time",
//             dataType: "map",
//             properties: {
//                 start: {
//                     name: "Start at",
//                     dataType: "number"
//                 },
//                 end: {
//                     name: "End at",
//                     dataType: "number"
//                 }
//             }
//         },
//         scenes_data: {
//             name: "AR Scene ID",
//             dataType: "array",
//             of: {
//                 dataType: "string"
//             },
//             readOnly: true
//         },
//         comic_viewer_points: {
//             name: "Comic Viewer Points",
//             dataType: "array",
//             of: {
//                 dataType: "map",
//                 properties: {
//                     x: {
//                         name: "Viewer Point X Coordinate",
//                         dataType: "number"
//                     },
//                     y: {
//                         name: "Viewer Point Y Coordinate",
//                         dataType: "number"
//                     },
//                     overlay: {
//                         name: "Overlay",
//                         dataType: "map",
//                         properties: {
//                             x: {
//                                 name: "Overlay X Coordinate",
//                                 dataType: "number"
//                             },
//                             y: {
//                                 name: "Overlay Y Coordinate",
//                                 dataType: "number"
//                             },
//                             height: {
//                                 name: "Overlay Height",
//                                 dataType: "number"
//                             },
//                             width: {
//                                 name: "Overlay Width",
//                                 dataType: "number"
//                             },
//                         }
//                     }
//                 }
//             }
//         }
//     },
//     subcollections: [pageSceneCollection]
// })