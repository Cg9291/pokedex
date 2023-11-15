import { useEffect } from "react";
import { IsModalActiveInterface } from "../../interfaces/miscInterfaces";

export function handleOutsideClicks(
    ref: any /* will update */,
    stateSetter: React.Dispatch<React.SetStateAction<IsModalActiveInterface>>
) {
    useEffect(() => {
        const detectOutsideClicks = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target)) {
                stateSetter({ isActive: false, activeImageNumber: 0 });
            }
        };

        document.addEventListener("mousedown", detectOutsideClicks);
        return () => {
            document.removeEventListener("mousedown", detectOutsideClicks);
        };
    }, [ref]);
}
