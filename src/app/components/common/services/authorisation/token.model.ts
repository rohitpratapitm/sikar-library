export interface TokenResponse {
    token: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    validTill?: number;
}
