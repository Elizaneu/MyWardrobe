import React from "react";
import c from "./Find.module.css";

import favNotAct from "../../assets/image/Search/favNotActive.svg";
import fav from "../../assets/image/Search/fav.svg";

export const Element = ({likes, isLike, onLike, src}) => {
    return (
        <div>
            <div>
                <img className={c.gallery_img} src={src} alt={""}/>
            </div>
            <div onClick={onLike}>
                <img className={c.button_icon} src={isLike ? fav : favNotAct} alt={""}/>
                {likes} нравится
            </div>
        </div>
    )
}