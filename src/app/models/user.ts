import { History } from "./history"

export interface User {
    uid?: string
    email: string
    role: string
    history: Array<History>
}
