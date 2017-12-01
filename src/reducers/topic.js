import * as types from '../actions/actionType';

const initialState = {};

export default function topic(state = initialState, action = {}) {
  	switch (action.type) {
	  	case types.SET_TOPIC:
	  		let jsonData = JSON.parse(action.payload);
	  		
		  	return {
		  		...state,
		  		words:jsonData.topics,
		  		location:jsonData.location,
		  		totalPoint:jsonData.totalPoint
		  	};
	    default:
			return state;
  }
}
