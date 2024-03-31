'use client'

import { Avatar as MuiAvatar } from "@mui/material";
import Image from "next/image";
import { TAvatarFC } from "./index.type";
import { useEffect, useState } from "react";
import { VerifiedUser } from "@mui/icons-material";


const Avatar: TAvatarFC = ({ avatarStyle, src }) => {
    const [error, setError] = useState<boolean>(false);

    const handleError = () => {
        setError(true)
    }

    useEffect(() => {
        return () => {
            setError(false)
        }
    }, [])

    return (
        <MuiAvatar sx={avatarStyle}>
            {!error && <Image onError={handleError} fill alt="avatar-img" src={src} />}
            {error && <VerifiedUser fontSize="large" htmlColor="white" />}
        </MuiAvatar>
    )
}

export default Avatar;