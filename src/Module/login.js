const IDINPUT = "login/IDINPUT";
const PWINPUT = "login/PWINPUT";
//액션타입

export const idinput = id_input => ({ type: IDINPUT, id_input });
export const pwinput = pw_input => ({ type: PWINPUT, pw_input });
//액션함수

const initialstate = {
  id_input: "",
  pw_input: ""
};
//초기상태

function login(state = initialstate, action) {
  switch (action.type) {
    case IDINPUT:
      return {
        ...state,
        id_input: action.id_input
      };
    case PWINPUT:
      return {
        ...state,
        pw_input: action.pw_input
      };
    default:
      return state;
  }
}

export default login;
//리듀서
