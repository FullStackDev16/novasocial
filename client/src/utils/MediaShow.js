export const ImageShow = (src, className, width, height) => {
    return <img className={className ? className : ""} style={{ width: width ? width : "", height: height ? height : "" }} src={src} alt="picture" />
}

export const VideoShow = (src, className, width, height) => {
    return <video className={className ? className : ""} style={{ width: width ? width : "", height: height ? height : "" }} controls src={src} alt="video" />
}
