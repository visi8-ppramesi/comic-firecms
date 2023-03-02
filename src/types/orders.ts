import { EntityReference } from "ppramesi-firecms"

export type OrderItem = {
    description: string,
    name: string,
    price: number,
    reference: EntityReference,
    type: string
}

export type SnapTransaction = {
    redirect_url: string,
    token: string
}

export type NotificationResponse = {
    transaction_time: string,
    transaction_status: string,
    transaction_id: string,
    status_message: string,
    status_code: string,
    signature_key: string,
    payment_type: string,
    order_id: string,
    merchant_id: string,
    gross_amount: string,
    currency: string,
    masked_card?: string,
    fraud_status?: string,
    eci?: string,
    channel_response_message?: string,
    channel_response_code?: string,
    card_type?: string,
    bank?: string,
    approval_code?: string,
    settlement_time?: string,
    transaction_type?: string,
    issuer?: string,
    acquirer?: string,
    permata_va_number?: string,
    va_numbers?: any[],
    payment_amounts?: any[],
    biller_code?: string,
    bill_key?: string
}

export type Order = {
    created_date: Date,
    // item_references?: EntityReference[],
    items: OrderItem[],
    order_id: string,
    status: string,
    tax: number,
    total_amount: number,
    snap_transaction?: SnapTransaction,
    user: EntityReference,
    notification_response?: NotificationResponse,
    fee?: number
}

export type OrdersMapping = {
    [key: string]: string
}