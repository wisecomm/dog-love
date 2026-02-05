import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { userId, userPwd } = body;

    console.log('[Mock API] Login request:', { userId, userPwd });

    // Happy Path
    if (userId === 'admin' && userPwd === '12345678') {
        return NextResponse.json({
            code: '200',
            message: 'OK',
            data: {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
                user: { id: userId, name: 'Admin User' }
            }
        });
    }

    // Error Path
    return NextResponse.json({
        code: '401',
        message: '비밀번호가 일치하지 않습니다.'
    }, { status: 200 }); // Our backend returns 200 for logical errors usually
}
