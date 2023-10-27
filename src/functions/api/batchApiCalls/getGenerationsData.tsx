import axios from "axios";
import { GenerationsInterface } from "../../../interfaces/generationsInterface";
import { NumOrString } from "../../../interfaces/miscTypes";
import { endpointsUrls } from "../../../objects/endpointsUrls";

export const getGenerationsData = async (generation: NumOrString): Promise<GenerationsInterface> => {
    try {
        const response = await axios.get(endpointsUrls.generations(generation));
        const generationData: GenerationsInterface = response.data;
        return generationData;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
