import './index.css'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

interface Props extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    source: string
}

export const Image = ({source, src, ...restProps}: Props) => {
    // TODO: Have to do more than just rename source to src... 
    // https://reactnative.dev/docs/image
    // https://www.w3schools.com/html/html_images.asp
    return (
        <img src={source} {...restProps} />
    )
}

export default Image

