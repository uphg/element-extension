import { ObjectLike } from "../../types/_common"
import keys from "./keys"

function createNames(props: ObjectLike, status: number | undefined) {
  const propNames = keys(props)
  return status === 1 ? propNames.filter((item) => item !== 'value') : propNames
}

export default createNames