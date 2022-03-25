import React from "react";

export const Heart = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
</svg>);

export const Comment = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
</svg>)

export const UploadMedia = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    fill={fill} stroke={stroke} strokeLinejoin="round" strokeLinecap="round" strokeWidth={strokeWidth} >
    <path stroke={stroke}
        d="m3,5c0,-1.08676 0.91324,-2 2,-2l14,0c1.08676,0 2,0.91324 2,2l0,14c0,1.08676 -0.91324,2 -2,2l-14,0c-1.08676,0 -2,-0.91324 -2,-2l0,-14z"
    />
    <path d="M7,8.5a1.5,1.5 0 1,0 3,0a1.5,1.5 0 1,0 -3,0"/>
    <path d="m20.4,14.5l-4.4,-4.5l-12,10" />
</svg>);

export const MoreVertical = ({size = 24, stroke = "#6c6a6a", strokeWidth = "1.5"}) => 
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" 
    fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0"/>
    <path d="M18,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0"/>
    <path d="M4,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0" />
</svg>);
