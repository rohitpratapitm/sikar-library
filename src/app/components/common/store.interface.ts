
export interface UserContextSlice {
    isUserAuthorized: boolean;
}

export interface CommonAppStore {
    userContextSlice: UserContextSlice;
}
