import validateId from "./params/validateId.js";
import validateBody from "./body/validateSongBody.js";

const validatorArray = [validateId, validateBody];

export default validatorArray;
