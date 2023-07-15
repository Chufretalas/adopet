import { IPet, PetSize } from "@/interfaces/IPet";

export const mockPet1: IPet = {
    id: 1,
    owner_id: 2,
    name: "Bob",
    birthday: 160,
    city: "Cityland",
    state: "Stateburg",
    size: PetSize.Md,
    personality: "energetic loyal",
    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzQuG6SbfCTtBc2UqzaTvumyD_cEip51kupMitZ2kkiAGpehU2EYks6elpNy7D4XqY_U&usqp=CAU",
    available: true,
    created: new Date()
}
export const mockPet2: IPet = {
    id: 2,
    owner_id: 3,
    name: "Grumpus",
    birthday: 700,
    city: "Cityland",
    state: "Stateburg",
    size: PetSize.MdSm,
    personality: "lazy",
    available: true,
    created: new Date()
}