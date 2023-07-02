import { PetSize } from "@/interfaces/IPet";
import { pet_size } from "@prisma/client";

export default function(petSize: PetSize): pet_size {
    if (petSize === PetSize.Sm) { return pet_size.small }
    if (petSize === PetSize.MdSm) { return pet_size.medium_small }
    if (petSize === PetSize.Md) { return pet_size.medium }
    if (petSize === PetSize.MdLg) { return pet_size.medium_large }
    if (petSize === PetSize.Lg) { return pet_size.large }
    if (petSize === PetSize.Xl) { return pet_size.very_big }
    return pet_size.medium
}