import { PULLUP_MENU_LEVEL } from './actiontypes';

export function setPullUpLevel(level) {
  return {
    type: PULLUP_MENU_LEVEL,
    payload: level
  }
}
