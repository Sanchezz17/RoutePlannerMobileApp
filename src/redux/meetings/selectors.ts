import { RootState } from '../store';
import { Meeting } from './types';

export const selectMeetings = (state: RootState): Meeting[] =>
    Object.values(state.meetingsSlice.meetings);

export const selectLoadingMeetings = (state: RootState): boolean =>
    state.meetingsSlice.loadingMeetings;
