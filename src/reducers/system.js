import * as types from '../actions/actionType';

const initialState = {
	initLoading:true
};

export default function system(state = initialState, action = {}) {
  	switch (action.type) {
	  	case types.END_INIT_LOADING:
		  	return {
		  		...state,
		  		initLoading:false
		  	};
	    default:
			return state;
  }
}
