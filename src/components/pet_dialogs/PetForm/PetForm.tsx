import { ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect, useState } from "react"
import styles from "./PetForm.module.css"
import DefaultFieldset from "@/components/DefaultFieldset/DefaultFieldset"
import OrangeButton from "@/components/OrangeButton/OrangeButton"
import { PetSize } from "@/interfaces/IPet"

export interface PetFormData {
    name: string;
    birthday: Date;
    city: string;
    state: string;
    size: PetSize;
    personality: string;
}

export default function PetForm({ handleForm, formRef, petFormData, setPetFormData }
    : { handleForm: (fd: FormData) => Promise<void>, formRef: RefObject<HTMLFormElement>, petFormData: PetFormData, setPetFormData: Dispatch<SetStateAction<PetFormData>> }) {


    function handleSizeChange(e: ChangeEvent<HTMLInputElement>) {
        setPetFormData({ ...petFormData, size: e.target.value as PetSize })
    }

    return (
        <form action={handleForm} ref={formRef} className={styles.form}>
            <DefaultFieldset>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="The name of the pet"
                    id="name" name="name" maxLength={100}
                    value={petFormData?.name} onChange={(e) => setPetFormData({ ...petFormData, name: e.currentTarget.value })} required />
            </DefaultFieldset>
            <DefaultFieldset>
                <label htmlFor="birthday">When was this pet born?</label>
                <input type="date" id="birthday" name="birthday"
                    value={petFormData?.birthday.toISOString().substring(0, 10)} onChange={(e) => setPetFormData({ ...petFormData, birthday: new Date(e.currentTarget.value) })} required />
            </DefaultFieldset>
            <DefaultFieldset>
                <label htmlFor="state">Current state</label>
                <input type="text" placeholder="In wich state does this pet currently lives in"
                    id="state" name="state" maxLength={50}
                    value={petFormData?.state} onChange={(e) => setPetFormData({ ...petFormData, state: e.currentTarget.value })} required />
            </DefaultFieldset>
            <DefaultFieldset>
                <label htmlFor="city">Current city</label>
                <input type="text" placeholder="In wich city does this pet currently lives in"
                    id="city" name="city" maxLength={50}
                    value={petFormData?.city} onChange={(e) => setPetFormData({ ...petFormData, city: e.currentTarget.value })} required />
            </DefaultFieldset>
            <DefaultFieldset>
                <span>How big is this pet?</span>
                <div>
                    <PetSizeRadioSet id="small" value={PetSize.Sm}
                        defaultChecked={petFormData?.size === PetSize.Sm}
                        onChange={handleSizeChange} />
                    <PetSizeRadioSet id="medium/small" value={PetSize.MdSm}
                        defaultChecked={petFormData?.size === PetSize.MdSm}
                        onChange={handleSizeChange} />
                    <PetSizeRadioSet id="medium" value={PetSize.Md}
                        defaultChecked={petFormData?.size === PetSize.Md}
                        onChange={handleSizeChange} />
                    <PetSizeRadioSet id="medium/large" value={PetSize.MdLg}
                        defaultChecked={petFormData?.size === PetSize.MdLg}
                        onChange={handleSizeChange} />
                    <PetSizeRadioSet id="large" value={PetSize.Lg}
                        defaultChecked={petFormData?.size === PetSize.Lg}
                        onChange={handleSizeChange} />
                    <PetSizeRadioSet id="very_big" value={PetSize.Xl}
                        defaultChecked={petFormData?.size === PetSize.Xl}
                        onChange={handleSizeChange} />
                </div>
            </DefaultFieldset>
            {/* <DefaultFieldset> // TODO: pet img maybe sometime
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Your email here"
                        id="email" name="email" required />
                </DefaultFieldset> */}
            <DefaultFieldset>
                <label htmlFor="personality">Personality</label>
                <input type="personality" placeholder="Describe it in one or two words"
                    id="personality" name="personality" maxLength={40}
                    value={petFormData?.personality} onChange={(e) => setPetFormData({ ...petFormData, personality: e.currentTarget.value })} required />
            </DefaultFieldset>
            <OrangeButton type="submit" className={styles.submit_button}>Confirm</OrangeButton>
        </form>
    )
}

function PetSizeRadioSet({ id, value, defaultChecked, onChange }
    : { id: string, value: string, defaultChecked?: boolean, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            <input type="radio" name="pet_size"
                id={id} value={value}
                defaultChecked={defaultChecked === undefined ? false : defaultChecked}
                onChange={onChange}
                required />
            <label htmlFor={id}>{value}</label>
        </div>
    )
}