import { RefObject, useEffect, useRef } from "react"

export default function NewPetDialog({ isOpened, onClose }: { isOpened: boolean, onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }, [isOpened])

    return (
        <dialog ref={ref}>
            My Awesome Dialog
            <button onClick={() => {
                onClose()
                ref.current?.close()
            }}>Close</button>
        </dialog>
    )
}