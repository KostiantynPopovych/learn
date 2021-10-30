import {WhereFilterOp} from "firebase/firestore";

const getQueryStaticParts = (fieldName: string, type: string) => ({
  fieldName,
  type: type as WhereFilterOp
});

export default getQueryStaticParts;