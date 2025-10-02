export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userName: string;
    tokenAccessExpires: string;
    refreshTokenExpires: string;
    roles: string[];
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await fetch('https://localhost:7109/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
        const errorData = await json;
        throw new Error(errorData.message || 'Login failed');
    }

    return json;
};
