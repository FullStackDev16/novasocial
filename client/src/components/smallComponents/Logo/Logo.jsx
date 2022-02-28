import React from "react"
import { useTheme } from '@mui/material/styles'

const Logo = (props) => {
    const theme = useTheme()
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={640}
            height={112}
            viewBox="0 0 480 84"
            {...props}
        >
            <g fill={theme.palette.primary.main}>
                <path d="M371.5 8.1c-7.7 4.4-5.1 14.9 3.7 14.9 4.1 0 7.8-3.6 7.8-7.6 0-5.1-7.2-9.7-11.5-7.3zM446 41.5V71h14V12h-14v29.5zM232.1 15.3c-8.2 2.6-13.5 12.1-11.1 20 1.7 5.6 5.2 8.4 14.4 11.3 10.9 3.4 12.8 4.7 12.4 8.7-.4 4.4-4.3 6.6-8.7 4.8-1.8-.8-3.4-2.3-3.7-3.7-.6-2.3-1.1-2.4-8.1-2.4-7.3 0-7.5.1-6.9 2.2.3 1.3.6 2.9.6 3.5 0 2.4 7.1 9.2 10.8 10.4 9.2 3.1 22.4.3 27.2-5.8 5-6.4 4.5-16-1.1-20.7-1.7-1.4-6.8-3.7-11.3-5.1-8.9-2.7-11.6-4.7-11.6-8.6 0-3.4 1.8-4.9 5.7-4.9 2.7 0 3.7.6 5.1 3 1.6 2.9 1.9 3 9 3h7.4l-.7-3.3c-1.2-5.4-3.7-8.6-8.9-11.2-5.5-2.7-14.1-3.2-20.5-1.2zM15 48.5V71h12.9l.3-14.6c.3-13.9.4-14.7 2.7-16.5 3.2-2.6 9.5-2.5 12.1.1 1.8 1.8 2 3.3 2 16.5V71h14V55.2c0-13.1-.3-16.4-1.9-19.8-2.4-5.3-7.1-8.6-13.2-9.2-6.1-.6-9 .2-12.8 3.4L28 32.2V26H15v22.5zM79 27.6c-8.4 3.6-13 11-13 20.9 0 4.5.6 7.7 1.9 10.3 8.9 17.3 35.2 16.6 42.5-1 2.2-5.1 2-14.3-.3-19.4-2.2-4.8-8.2-10.1-13.1-11.4-5.1-1.4-14-1.1-18 .6zm17.3 13.5c1.1 1.4 1.7 3.9 1.7 7.5 0 7.3-3 10.9-9 10.9-5.9 0-9-3.7-9-10.6 0-6.2 1.3-8.7 5.2-10.4 3.8-1.6 8.5-.5 11.1 2.6zM114 26.7c0 .4 3.5 10.5 7.7 22.5l7.8 21.9 9-.3 9-.3 7.7-21.5c4.2-11.8 7.7-21.9 7.7-22.3.1-.4-3.2-.7-7.1-.5l-7.3.3-5 16.2c-2.7 8.9-5 16.1-5.2 16-.1-.2-2.5-7.5-5.2-16.3l-4.9-15.9-7.1-.3c-3.9-.2-7.1.1-7.1.5zM176.5 27.5c-14 7.6-16.7 27.7-5.1 38.3 2.5 2.3 5.7 4.4 7.3 4.7 1.5.4 3.4.9 4.2 1.1 2.3.7 8.9-1.6 12.1-4.2l3-2.6V71h14l-.2-22.3-.3-22.2-6.7-.3c-6.7-.3-6.8-.3-6.8 2.3 0 3.1-.7 3.1-3.7.3-3.1-2.9-13.4-3.7-17.8-1.3zm18 12.9c9.5 9.6-3.4 25.6-13.2 16.4-4.4-4.1-3.8-13.9 1-17.3 3.4-2.4 9.4-1.9 12.2.9z" />
                <path d="M279.9 28.8c-18.7 9.7-14.2 38.3 6.6 42.1 10.5 2 20.7-2.4 25.5-10.9 2-3.6 2.5-5.9 2.5-11.6 0-6.1-.4-7.7-3-11.9-6.3-10.2-20.3-13.6-31.6-7.7zM298 40.5c4.6 4.9 3.1 15.8-2.6 18.4-3.9 1.7-6.1 1.3-9.6-1.8-3-2.6-3.3-3.5-3.3-8.4 0-4.5.5-6 2.4-8.1 3.8-4 9.4-4.1 13.1-.1zM330.2 28.1c-7.6 3.8-11.3 10.5-11.3 20.5 0 14 8.2 22.6 21.6 22.7 8.4.1 14.7-3 18.6-9.1 1.6-2.5 2.9-5 2.9-5.4 0-.4-3.3-.8-7.3-.8-6.1 0-7.7.3-9.2 2-2.2 2.5-6.6 2.6-9.4.3-3.9-3.2-4.6-12.9-1.3-18 2.1-3.2 9.7-3.5 11.7-.4.7 1.2 15.5 1.5 15.5.3 0-1.5-4.6-8.1-7-10-6.2-4.7-17.6-5.7-24.8-2.1zM368 48.5V71h14V26h-14v22.5zM399.8 28c-4.1 2.2-8 6.9-9.8 11.5-1.6 4.3-1.4 14.7.5 19.1 5.2 12.4 20 17 28.6 8.8l2.9-2.8V71h14V26h-7c-6.8 0-7 .1-7 2.6v2.5l-3.2-2.2c-4.5-3.3-13.9-3.7-19-.9zm18.9 12.4c2.4 2.1 2.8 3.1 2.8 8 0 4.6-.4 6-2.5 8.1-7.4 7.3-17.9.8-16.2-10.3 1.1-7.6 10-10.8 15.9-5.8z" />
            </g>
        </svg>
        
    )
}
export default Logo
