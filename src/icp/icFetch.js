import { responseFormat } from '../utils/dataFormat'
import {createActor} from '../spark_caiops'


export const fetchICApi = async (
  { id, agent },
  actorType,
  method,
  params = [],
) => {
  let actor = null
  let result = null
  try {
    switch (actorType) {
      case 'ops':
        actor = createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
          agent,
        })
        break
      default:
        break
    }
  } catch (err) {
    console.error(`${actorType}.${method} error:::`, err.message)
  }
  try {
    result = await actor[method](...params)
    console.log(result)
  } catch (err) {
    console.error(`${actorType}.${method} error:::`, err.message)
  }

  let formatedResult
  if (!result) {
    formatedResult = {
      msg: 'Server error',
      code: 500,
      data: null,
    }
  } else {
    formatedResult = responseFormat(result)
  }
  console.log(`${actorType}.${method} result:::`, formatedResult)
  return formatedResult
}
