import React from 'react'
import "./Options.css"
import ReplayIcon from "@material-ui/icons/Replay"
import CloseIcon from "@material-ui/icons/Close"
import StarRateIcon from "@material-ui/icons/StarRate"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FlashOnIcon from "@material-ui/icons/FlashOn"
import IconButton from "@material-ui/core/IconButton"

function Options() {
    return (
        <div className="options">
            <IconButton className="options__replay">
                <ReplayIcon fontSize="large"/>
            </IconButton>
            <IconButton className="options__close">
                <CloseIcon fontSize="large"/>
            </IconButton>
            <IconButton className="options__star">
                <StarRateIcon fontSize="large"/>
            </IconButton>
            <IconButton className="options__save">
                <FavoriteIcon fontSize="large"/>
            </IconButton>
            <IconButton className="options__light">
                <FlashOnIcon fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default Options
