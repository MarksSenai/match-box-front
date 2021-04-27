export class Permission {
    constructor(
        public  id: number,
        public userId: number,
        public userName: string,
        public machineId: number,
        public machineName: string
    ){}
}