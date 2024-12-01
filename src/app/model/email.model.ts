export class Email {
    id!: number;
    imePrezime!: string;
    email!: string;
    naslov!: string;
    poruka!: string;
    datumVreme: Date = new Date();
  
    constructor() {
      this.datumVreme = new Date();
    }
  }
  