import {
	getTrialsComplete,
	getAttempts
} from './selectors';
import {
	ATTEMPTS_PER_TRIALBLOCK
} from '../constants';

import {
	goToNextTaskState,
	regenerateBlocks,
	restartBlock
} from './taskactions';
export const SHOW_ITI = 'trial/showITI';
export const SHOW_STIMULUS = 'trial/showStimulus';
export const SHOW_FEEDBACK = 'trial/showFeeback';
export const NEXT_TRIAL = 'trial/nextTrial';
export const SET_TRIAL_STIMULI = 'trial/setTrialStimuli';
export const REGISTER_INPUT = 'trial/registerInput';
export const END_TRIAL = 'trial/end';
export const INCREASE_ATTEMPTS = 'trial/attempts';

export const showITI = ()=> ({
	type: SHOW_ITI
});

export const showStimulus = ()=> ({
	type: SHOW_STIMULUS
});

export const showFeedback = () => ({
	type: SHOW_FEEDBACK
});

export const endCurrentTrials = () => ({
	type: END_TRIAL
});

export const goToNextTrial = () => {
	return (dispatch, getState) => {
		if (getTrialsComplete(getState())) {
			dispatch(goToNextTaskState());
			return;
		}
		dispatch({
			type: NEXT_TRIAL
		});
	};
};

export const setTrialStimuli = (stimuli, rule) => ({
	type: SET_TRIAL_STIMULI,
	stimuli,
	rule
});

export const registerInput = (optionSelected) => ({
	type: REGISTER_INPUT,
	time: Date.now(),
	optionSelected,
});

export const increaseAttempts = (id) => ({
	type: INCREASE_ATTEMPTS,
	id
});

export const restartTrialOrGiveUp = () => {
	return (dispatch, getState) => {
		if (getAttempts(getState()) >= ATTEMPTS_PER_TRIALBLOCK) {
			dispatch(endCurrentTrials());
    		dispatch(goToNextTaskState());
			return;
		}
		dispatch(regenerateBlocks());
		dispatch(restartBlock());
	};
};