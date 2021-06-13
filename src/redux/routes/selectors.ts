import { RootState } from '../store';
import { Route } from './types';

export const selectLoadingRoute = (state: RootState): boolean =>
    state.routesSlice.loadingRoute;

export const selectRoute = (
    state: RootState,
    managerId: number,
): Route | undefined => state.routesSlice.routes[managerId];
