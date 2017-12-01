import * as types from './actionType';

export function setTopics(words) {
	return {
		type: types.SET_TOPIC,
		payload: words
	};
}
