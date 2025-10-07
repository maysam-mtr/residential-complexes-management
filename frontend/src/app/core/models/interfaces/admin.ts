export interface IAdmin {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    civility: string;
    phone: string;
    role: 'SUPER_ADMIN' | 'COMPLEX_ADMIN' | 'BUILDING_ADMIN';
    status: 'ACTIVE' | 'INACTIVE';
}