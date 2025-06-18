import MyPage from "./myPage"

export async function generateMetadata(context) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${context.params.id}`, {
        cache: "no-store"
    })
    const jsonData = await response.json()
    const singleItem = jsonData.singleItem
    return {
        title: singleItem.title,
        description: singleItem.description
    }
}

const DeleteItem = (context) => {
    return <MyPage {...context} />
}

export default DeleteItem