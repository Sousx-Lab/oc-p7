import React from "react";

export const HeartSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
</svg>
);

export const CommentSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
</svg>
);

export const ShareSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
</svg>
);

export const MediasSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    fill={fill} stroke={stroke} strokeLinejoin="round" strokeLinecap="round" strokeWidth={strokeWidth} >
    <path stroke={stroke}
        d="m3,5c0,-1.08676 0.91324,-2 2,-2l14,0c1.08676,0 2,0.91324 2,2l0,14c0,1.08676 -0.91324,2 -2,2l-14,0c-1.08676,0 -2,-0.91324 -2,-2l0,-14z"
    />
    <path d="M7,8.5a1.5,1.5 0 1,0 3,0a1.5,1.5 0 1,0 -3,0" />
    <path d="m20.4,14.5l-4.4,-4.5l-12,10" />
</svg>
);

export const MoreVerticalSvg = ({ size = 24, stroke = "#6c6a6a", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0" />
    <path d="M18,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0" />
    <path d="M4,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0" />
</svg>
);


export const ArrowOutSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
</svg>
);

export const TrashSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
</svg>
);

export const EditSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
    <line x1="3" y1="22" x2="21" y2="22"></line>
</svg>
);

export const UserCircleSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
    <circle cx="12" cy="10" r="3" />
    <circle cx="12" cy="12" r="10" />
</svg>
);

export const MailSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
</svg>
);

export const CopySvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>
);

export const EmojiSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 26 26"
    
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 
        4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-.045 17.51h-.015c-2.285 0-4.469-1.189-6.153-3.349l.789-.614c1.489 
            1.911 3.394 2.963 5.364 2.963h.013c1.987-.004 3.907-1.078 5.408-3.021l.791.611c-1.693 2.194-3.894 3.405-6.197 
                3.41zm-3.468-10.01c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm7.013 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/>
</svg>
);

export const GifSvg = ({ size = 22, stroke = "#6c6a6a", fill = "none", strokeWidth = "1.5" }) =>
(<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z" />
    <path d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z" />
</svg>
)