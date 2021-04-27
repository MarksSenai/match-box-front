export class Report {
    constructor(
      public id: number,
      public user: string,
      public rfid: string,
      public imageName: string,
      public macId: string,
      public machine: string,
      public login: string,
      public loginDate: string,
      public logout: string,
      public logoutDate: string,
      public status: number
      ) {}
  }
  