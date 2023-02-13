import {
    buildCollection,
    UploadedFileContext,
    EntityOnSaveProps,
    EntityValues,
    useDataSource,
    EntityCollection,
} from "ppramesi-firecms";
import { buildChaptersComicsCollection } from "./chapters/chapters"
import { commentsComicsCollection } from "./comments/comments"
import { Comic, AuthorData } from "@/types/comics";
import { Author } from "@/types/authors"
import { buildPostProcessFunction, buildStoragePathFunction } from "@/utils/pathTransformers";

import { authorsCollection } from "@/collections/authors/authors"

export const buildComicsCollection = function(): EntityCollection<Comic>{
    const dataSource = useDataSource()
    return buildCollection<Comic>({
        name: "Comics",
        path: "comics",
        callbacks: {
            async onPreSave(saveProps: EntityOnSaveProps<Comic>): Promise<Partial<EntityValues<Comic>>>{
                if(saveProps.values.authors){
                    const authorsPromise = saveProps.values.authors.map(author => {
                        const { id } = author
                        return dataSource.fetchEntity<Author>({ path: "authors", entityId: id, collection: authorsCollection })
                            .then((result) => {
                                if(result){
                                    const name = result?.values.name
                                    return {id, name} as AuthorData
                                }else{
                                    return null
                                }
                            })
                            .catch(() => null)
                    })
                    saveProps.values.authors_data = await Promise.allSettled(authorsPromise).then(v => v.reduce((acc, result) => {
                        if(result.status == "fulfilled" && result.value){
                            acc.push(result.value)
                        }
                        return acc
                    }, [] as AuthorData[]))
                }
                return saveProps.values
            }
        },
        properties: {
            title: {
                name: "Title",
                dataType: "string"
            },
            description: {
                name: "Description",
                dataType: "string"
            },
            price: {
                name: "Price",
                dataType: "number"
            }, 
            view_count: {
                name: "View Count",
                dataType: "number"
            },
            release_date: {
                name: "Release Date",
                dataType: "date"
            },
            last_update: {
                name: "Last Update",
                dataType: "date"
            },
            favorite_count: {
                name: "Favorite Count",
                dataType: "number"  
            },
            is_draft: {
                name: "Is Draft",
                dataType: "boolean"
            },
            cover_image_url: {
                name: "Cover Image",
                dataType: "string",
                storage: {
                    //gs://comics-77200.appspot.com/covers/galeo-cover.jpg
                    storagePath: buildStoragePathFunction(["covers", "$comics"]),
                    acceptedFiles: ["image/*"],
                    maxSize: 1024 * 1024,
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    fileName: function(ctx: UploadedFileContext): string {
                        return ctx.file.name
                    },
                    postProcess: buildPostProcessFunction()
                }
            },
            age_gate: {
                name: "Age Gate",
                dataType: "boolean"
            },
            authors: {
                name: "Authors",
                dataType: "array",
                of: {
                    dataType: "reference",
                    path: "authors"
                }
            },
            authors_data: {
                name: "Authors Data",
                dataType: "array",
                readOnly: true,
                of: {
                    dataType: "map",
                    properties: {
                        id: {
                            name: "Id",
                            dataType: "string",
                            readOnly: true
                        },
                        name: {
                            name: "Name",
                            dataType: "string",
                            readOnly: true
                        }
                    }
                }
            },
            categories: {
                name: "Categories",
                dataType: "array",
                of: {
                    dataType: "string"
                }
            },
            chapters_data: {
                name: "Chapters Data",
                dataType: "array",
                readOnly: true,
                of: {
                    dataType: "map",
                    properties: {
                        chapter_number: {
                            name: "Chapter Number",
                            dataType: "number",
                            readOnly: true
                        },
                        chapter_preview_url: {
                            name: "Chapter Preview Url",
                            dataType: "string",
                            readOnly: true
                        },
                        id: {
                            name: "Id",
                            dataType: "string",
                            readOnly: true
                        },
                        price: {
                            name: "Price",
                            dataType: "number",
                            readOnly: true
                        },
                        release_date: {
                            name: "Release Date",
                            dataType: "date",
                            readOnly: true
                        },
                        view_count: {
                            name: "View Count",
                            dataType: "number",
                            readOnly: true
                        }
                    }
                }
            },
            keywords: {
                name: "Keywords",
                dataType: "array",
                of: {
                    dataType: "string"
                }
            },
            tags: {
                name: "Tags",
                dataType: "array",
                of: {
                    dataType: "string"
                }
            }
        },
        subcollections: [
            buildChaptersComicsCollection(),
            commentsComicsCollection
        ]
    })
}

// export const comicsCollection = buildCollection<Comic>({
// });