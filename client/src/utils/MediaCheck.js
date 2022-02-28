export const IsImage = (url) => {
    return url.match(/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/g)
}

export const IsVideo = (url) => {
    return url.match(/video/i)
}



