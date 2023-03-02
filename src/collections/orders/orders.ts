import {
    buildCollection,
    DeleteEntityProps,
    Entity,
    EntityCollection,
    FetchCollectionProps,
    FetchEntityProps,
    SaveEntityProps,
    EntityReference,
    firestoreToCMSModel
    // useFireCMSContext,
} from "ppramesi-firecms";
import { Order } from "@/types/orders";
import { getFirestore, collectionGroup, doc as docRef, getDocs, getDoc, orderBy, query } from "firebase/firestore"
import { useState } from "react";
import { app } from "@/utils/firebase"

type OrdersMapping = {
    [key: string]: string
}

export const buildOrdersCollection = function(): EntityCollection<Order>{
    // const { firebaseApp } = useFireCMSContext()
    const db = getFirestore(app)
    const ordersMapping: OrdersMapping = {}
    // const [ordersMapping, setOrdersMapping] = useState<OrdersMapping>({})

    return buildCollection<Order>({
        name: "Orders",
        path: "orders",
        initialSort: ["created_date", "desc"],
        callbacks: {
            async overrideCollectionFetch(fetchCollectionProps: FetchCollectionProps){
                let snapQuery = collectionGroup(db, "orders")
                if(fetchCollectionProps.orderBy && fetchCollectionProps.order){
                    snapQuery = query(collectionGroup(db, "orders"), orderBy(fetchCollectionProps.orderBy, fetchCollectionProps.order))
                }
                const snapshot = await getDocs(snapQuery)
                return snapshot.docs.map((doc) => {
                    // setOrdersMapping({
                    //     ...ordersMapping,
                    //     [doc.id]: doc.ref.path
                    // })
                    ordersMapping[doc.id] = doc.ref.path
                    const splitPath = doc.ref.path.split("/")
                    splitPath.pop()
                    const pathToSubcol = splitPath.join("/")
                    const data = doc.data()
                    if(data.created_date && data.created_date.toDate && typeof data.created_date.toDate === "function"){
                        data.created_date = data.created_date.toDate()
                    }
                    
                    data.user = new EntityReference(splitPath[1], "users")
                    data.items.forEach((_: any, idx: number) => {
                        const itemPathArray = data.items[idx].reference.path.split("/")
                        const refId = itemPathArray.pop()
                        console.log("itemPathArray", refId, itemPathArray.join("/"))
                        data.items[idx].reference = new EntityReference(refId, itemPathArray.join("/"))
                    })
                    return {
                        id: doc.id,
                        path: pathToSubcol,
                        values: data
                    } as Entity<Order>;
                });
            },
            async overrideEntityFetch(fetchEntityProps: FetchEntityProps){
                const path = ordersMapping[fetchEntityProps.entityId]
                const snapshot = await getDoc(docRef(db, path))
                if(snapshot.exists()){
                    const splitPath = snapshot.ref.path.split("/")
                    splitPath.pop()
                    const pathToSubcol = splitPath.join("/")
                    const data = snapshot.data()
                    data.user = new EntityReference(splitPath[1], "users")
                    data.items.forEach((_: any, idx: number) => {
                        const itemPathArray = data.items[idx].reference.path.split("/")
                        const refId = itemPathArray.pop()
                        data.items[idx].reference = new EntityReference(refId, itemPathArray.join("/"))
                    })
                    return {
                        id: snapshot.id,
                        path: pathToSubcol,
                        values: data
                    } as Entity<Order>
                }else{
                    return undefined
                }
            },
            overrideSaveEntity<Order>(saveEntityProps: SaveEntityProps){
                // console.log(saveEntityProps)
                return Promise.resolve({} as Entity<Order>)
            },
            overrideDeleteEntity<Order>(deleteEntityProps: DeleteEntityProps){
                // console.log(deleteEntityProps)
                return Promise.resolve()
            }
        },
        properties: {
            order_id: {
                name: "Order ID",
                dataType: "string",
                editable: false                
            },
            status: {
                name: "Status",
                dataType: "string",
                editable: false
            },
            user: {
                name: "User",
                dataType: "reference",
                path: "users",
                editable: false
            },
            // item_references: (ppft) => {
            //     console.log("ppft", ppft)
            //     return {
            //         name: "Items Reference",
            //         dataType: "array",
            //         of: {
            //             dataType: "reference",
            //             path: "comics/id/chapters"
            //         }
            //     }
            // },
            // item_references: {
            //     name: "Items Reference",
            //     dataType: "array",
            //     of: {
            //         dataType: "reference",
            //         path: "comics/id/chapters"
            //     }
            // },
            items: (prop) => {
                const { propertyValue } = prop
                let chapterRef = {}
                if(propertyValue && Array.isArray(propertyValue)){
                    const path = propertyValue[0].reference.path.split("/")
                    // path.pop()
                    chapterRef = {
                        reference: {
                            name: "Reference",
                            dataType: "reference",
                            path: path.join("/")
                        }
                    }
                }
                return {
                    name: "Items",
                    dataType: "array",
                    editable: false,
                    of: {
                        dataType: "map",
                        properties: {
                            name: {
                                name: "Name",
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
                            ...chapterRef,
                            type: {
                                name: "Type",
                                dataType: "string"
                            }
                        }
                    }
                }
            },
            // items: {
            //     name: "Items",
            //     dataType: "array",
            //     of: {
            //         dataType: "map",
            //         properties: {
            //             name: {
            //                 name: "Name",
            //                 dataType: "string"
            //             },
            //             description: {
            //                 name: "Description",
            //                 dataType: "string"
            //             },
            //             price: {
            //                 name: "Price",
            //                 dataType: "number"
            //             },
            //             reference: {
            //                 name: "Reference",
            //                 dataType: "reference",
            //                 path: "comic_chapters"
            //             },
                        
            //             type: {
            //                 name: "Type",
            //                 dataType: "string"
            //             }
            //         }
            //     }
            // },
            notification_response: {
                name: "Notification Response",
                dataType: "map",
                editable: false,
                properties: {
                    transaction_time: {
                        name: "Transaction Time",
                        dataType: "string"
                    },
                    transaction_status: {
                        name: "Transaction Status",
                        dataType: "string"
                    },
                    transaction_id: {
                        name: "Transaction ID",
                        dataType: "string"
                    },
                    status_message: {
                        name: "Status Message",
                        dataType: "string"
                    },
                    status_code: {
                        name: "Status Code",
                        dataType: "string"
                    },
                    signature_key: {
                        name: "Signature Key",
                        dataType: "string"
                    },
                    payment_type: {
                        name: "Payment Type",
                        dataType: "string"
                    },
                    order_id: {
                        name: "Order ID",
                        dataType: "string"
                    },
                    merchant_id: {
                        name: "Merchant ID",
                        dataType: "string"
                    },
                    gross_amount: {
                        name: "Gross Amount",
                        dataType: "string"
                    },
                    currency: {
                        name: "Currency",
                        dataType: "string"
                    },
                    masked_card: {
                        name: "Masked Card",
                        dataType: "string"
                    },
                    fraud_status: {
                        name: "Fraud Status",
                        dataType: "string"
                    },
                    eci: {
                        name: "ECI",
                        dataType: "string"
                    },
                    channel_response_message: {
                        name: "Channel Response Message",
                        dataType: "string"
                    },
                    channel_response_code: {
                        name: "Channgel Response Code",
                        dataType: "string"
                    },
                    card_type: {
                        name: "Card Type",
                        dataType: "string"
                    },
                    bank: {
                        name: "Bank",
                        dataType: "string"
                    },
                    approval_code: {
                        name: "Approval Code",
                        dataType: "string"
                    },
                    settlement_time: {
                        name: "Settlement Time",
                        dataType: "string"
                    },
                    transaction_type: {
                        name: "Transaction Type",
                        dataType: "string"
                    },
                    issuer: {
                        name: "Issuer",
                        dataType: "string"
                    },
                    acquirer: {
                        name: "Acquirer",
                        dataType: "string"
                    },
                    permata_va_number: {
                        name: "VA Number",
                        dataType: "string"
                    },
                    va_numbers: {
                        name: "VA Numbers",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties: {
                                bank: {
                                    name: "Bank",
                                    dataType: "string"
                                },
                                va_number: {
                                    name: "VA Number",
                                    dataType: "string"
                                }
                            }
                        }
                    },
                    biller_code: {
                        name: "Biller Code",
                        dataType: "string"
                    },
                    bill_key: {
                        name: "Bill Key",
                        dataType: "string"
                    }
                }
            },
            created_date: {
                name: "Created Date",
                dataType: "date",
                editable: false
            },
            fee: {
                name: "Fee",
                dataType: "number",
                editable: false
            },
            tax: {
                name: "Tax",
                dataType: "number",
                editable: false
            },
            total_amount: {
                name: "Total Amount",
                dataType: "number",
                editable: false
            }
        }
    })
}