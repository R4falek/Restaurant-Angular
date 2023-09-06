import { Comment } from "./comment"

export interface Dish {
    name: string
    price: number
    description: string
    image: string
    ingredients: string
    cuisine: string
    category: string
    rating: Array<number>
    howManyLeft?: number
}
