export interface IPet {
    id: number;
    owner_id: number | null;
    name: string;
    days_old: number;
    city: string;
    state: string;
    size: PetSize;
    personality: string;
    photo_url?: string;
    available: boolean;
    created: Date;
  }
  
export enum PetSize {
    Sm = 'small',
    MdSm = "medium/small",
    Md = 'medium',
    MdLg = 'medium/large',
    Lg = 'large',
    Xl = 'very big'
  }