import { RefObject, useEffect } from "react";

//IN Progess
export function detectOutsideClicks(ref: React.RefObject<React.ReactHTMLElement>) {
    useEffect(() => {
        (e: React.MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target)) {
                alert("outside click");
            }
        };
    });
}
