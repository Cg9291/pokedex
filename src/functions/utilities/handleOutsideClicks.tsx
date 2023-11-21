import { useEffect } from "react";
import { IsModalActiveInterface } from "../../interfaces/miscInterfaces";

export function handleOutsideClicks(
    ref: React.RefObject<HTMLDivElement>,
    stateSetter: React.Dispatch<React.SetStateAction<IsModalActiveInterface>>
) {
    useEffect(() => {
        const detectOutsideClicks = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                stateSetter({ isActive: false, activeImageNumber: 0 });
                console.log(e.target);
            }
        };

        document.addEventListener("mousedown", detectOutsideClicks);
        return () => {
            document.removeEventListener("mousedown", detectOutsideClicks);
        };
    }, [ref]);
}
