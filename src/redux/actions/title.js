import { SET_TITLE } from '../actionTypes'

export const setTitle = (title) => {
  return {
    type: SET_TITLE,
    title
  }
}
