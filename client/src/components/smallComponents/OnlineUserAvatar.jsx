import styled from '@emotion/styled';
import { Avatar, Badge, Stack } from '@mui/material';
import React from 'react'

const OnlineUserAvatar = ({online,name,src}) => {

    const StyledBadgeOnline = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));
    const StyledBadgeOffline = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: 'white',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform:"scale(1.2)",
                height: '100%',
                borderRadius: '50%',
                border: '2px solid grey',
            },
        },
    }));

    return (
        <Stack direction="row" spacing={2}>
            {online ?
            <StyledBadgeOnline overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                <Avatar alt={name} src={src} />
            </StyledBadgeOnline> :
            <StyledBadgeOffline overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                <Avatar alt={name} src={src} />
            </StyledBadgeOffline>
            }
        </Stack>
    );
}

export default OnlineUserAvatar
