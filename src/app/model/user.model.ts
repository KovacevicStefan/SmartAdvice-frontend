export class User {
    id!: number;
    imePrezime!: string;
    username!: string;
    password!: string;
    avatar?: string;
    email?: string;
    admin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  