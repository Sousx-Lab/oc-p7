import React from "react";

export const Heart = ({ size = 22, stroke="#6c6a6a", fill="none", strokeWidth="1.5" }) => 
    (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" 
        strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>);

export const Comment = ({ size = 22, stroke="#6c6a6a", fill="none", strokeWidth="1.5"  }) => 
    (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
        fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>)
