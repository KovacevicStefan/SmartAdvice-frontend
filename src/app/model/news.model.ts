import { User } from "./user.model";

export class News {
    id!: number;
    naslov!: string;
    tekst!: string;
    autor!: User;
    datum!: Date;
}