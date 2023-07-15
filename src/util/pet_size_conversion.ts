import { PetSize } from "@/interfaces/IPet";
import { pet_size } from "@prisma/client";

export function toPrismaSize(petSize: PetSize): pet_size {
    if (petSize === PetSize.Sm) { return pet_size.small }
    if (petSize === PetSize.MdSm) { return pet_size.medium_small }
    if (petSize === PetSize.Md) { return pet_size.medium }
    if (petSize === PetSize.MdLg) { return pet_size.medium_large }
    if (petSize === PetSize.Lg) { return pet_size.large }
    if (petSize === PetSize.Xl) { return pet_size.very_big }
    return pet_size.medium
}

export function fromPrismaSize(petSize: pet_size): PetSize {
    if (petSize === pet_size.small) { return PetSize.Sm }
    if (petSize === pet_size.medium_small) { return PetSize.MdSm }
    if (petSize === pet_size.medium) { return PetSize.Md }
    if (petSize === pet_size.medium_large) { return PetSize.MdLg }
    if (petSize === pet_size.large) { return PetSize.Lg }
    if (petSize === pet_size.very_big) { return PetSize.Xl }
    return PetSize.Md
}

