export class Users {
    constructor(
      public id: number,
      public name: string,
      public rfid: string,
      public reg: string,
      public func: string,
      public email: string,
      public password: string,
      public type: number,
      public perfis: any,
      public picture: string
      ) {}
  }
  