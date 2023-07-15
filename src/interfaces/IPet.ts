export interface IPet {
    id: number;
    owner_id: number | null;
    name: string;
    birthday: BigInt;
    city: string;
    state: string;
    size: PetSize;
    personality: string | null;
    photo_url: string | null;
    available: boolean;
    created: Date | null;
  }
  
export enum PetSize {
    Sm = 'small',
    MdSm = "medium/small",
    Md = 'medium',
    MdLg = 'medium/large',
    Lg = 'large',
    Xl = 'very big'
  }