import { useEffect } from "react";

export function handleOutsideClicks(
    ref: any /* will update */,
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
    useEffect(() => {
        const detectOutsideClicks = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target)) {
                stateSetter(false);
            }
        };

        document.addEventListener("mousedown", detectOutsideClicks);
        return () => {
            document.removeEventListener("mousedown", detectOutsideClicks);
        };
    }, [ref]);
}
