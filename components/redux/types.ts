export type LoadingTypes = 'not-loaded' | 'loading' | 'loaded' | 'failed';

export enum LoadingStateTypes {
    NOT_LOADED = 'not-loaded',
    LOADING = 'loading',
    LOADED = 'loaded',
    FAILED = 'failed',
}

export type LoadingState =
    | { type: 'not-loaded' }
    | { type: 'loading' }
    | LoadedState
    | { type: 'failed'; errorMessage: string };

export interface LoadedState {
    type: 'loaded';
    data: any;
}

export enum SignUpMethod {
    Email = 'email',
    Phone = 'phone',
}

export const enum AuthenticationAction {
    Login = 'login',
    SignUp = 'sign-up',
    Link = 'link',
}
