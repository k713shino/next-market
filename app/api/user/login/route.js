import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import connectDB from '../../../utils/database';
import { UserModel } from '../../../utils/schemaModels';

export async function POST(request) {
    const reqBody = await request.json();
    try{
        await connectDB();
        const saveUserData = await UserModel.findOne({ email: reqBody.email });
        if(saveUserData){
            // ユーザーデータが存在する場合
            if(reqBody.password === saveUserData.password){
                // パスワードが一致する場合
                const secretKey = new TextEncoder().encode("next-market-app-book")
                
                const payload = {
                    email: reqBody.email
                }

                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: "HS256" })
                    .setExpirationTime("1d")
                    .sign(secretKey);
                console.log(token);
                return NextResponse.json({ message: "ログイン成功", token: token });
            }else{
                // パスワードが一致しない場合
                return NextResponse.json({ message: "ログイン失敗:パスワードが間違っています" });
            }
        }else{
            // ユーザーデータが存在しない場合
            return NextResponse.json({ message: "ログイン失敗:ユーザー登録をしてください" });
        }
        
    }catch{
        return NextResponse.json({ message: "ログイン失敗" });
    }
}