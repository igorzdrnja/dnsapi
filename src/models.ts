export interface ValidateIPRequest {
    ip: string
}

export interface ValidateIPResponse {
    status: boolean
}

export interface Address {
    ip: string
}

export interface Query {
    addresses: Address[]
    client_ip: string
    created_at?: number
    domain: string
}

export interface HTTPError {
    message: string
}
