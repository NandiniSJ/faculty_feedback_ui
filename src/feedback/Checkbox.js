import {useEffect, useState} from "react";

export const Checkbox = ({ points, qNumber, savePoints }) => {

    const[isChecked, setIsChecked] = useState(false);
    useEffect(() => {
       savePoints(points, qNumber)
    }, [isChecked])
    return(
        <div>
            <label>
                <input className="checkbox" type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
            </label>
        </div>
    );
}