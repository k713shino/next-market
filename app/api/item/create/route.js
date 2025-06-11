import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"

export async function POST(request){
    const reqBody = await request.json()

    try{
        await connectDB() 
        // reqBodyの中身をちゃんと渡す
        await ItemModel.create(reqBody) 
        return NextResponse.json({message: "アイテム作成成功"})
    }catch(error){
        console.log("エラー詳細:", error)
        return NextResponse.json({message: "アイテム作成失敗"}) 
    }
}