var accessToken = '';

export const setAccessToken = (token: string) => {
    accessToken = token;
};

export const getAccessToken = (): string => accessToken;
