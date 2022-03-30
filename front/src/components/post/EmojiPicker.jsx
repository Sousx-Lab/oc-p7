import React, { useEffect, useState } from "react";
import { EmojiSvg } from "../IconsSvg";
import { EmojiButton } from '@joeattardi/emoji-button';

const EmojiPicker = ({ insertInto = ".content" }) => {

    const [picker, setPicker] = useState('');
    const [trigger, setTrigger] = useState('');


    const handleTogglePicker = () => {
        picker.togglePicker(trigger);
    }

    const InsertEmoji = (emoji) => {
        const target = document.querySelector(insertInto);
        const [start, end] = [target.selectionStart, target.selectionEnd];
        target.setRangeText(emoji, start, end, 'end');
    };

    useEffect(() => {
        if (!picker) {
            setPicker(new EmojiButton({ position: 'bottom-start' }))
            setTrigger(document.querySelector("[data-picker='emoji']"));
        }
        if (picker) {
            picker.on('emoji', ({ emoji }) => {
                InsertEmoji(emoji);
            })
        }
    }, [picker, insertInto])
    return (
        <div role="button" className="icon-info" onClick={handleTogglePicker} data-picker="emoji">
            <div className="rounded-circle icon-info--bg p-2 text-center" title="Emoji">
                <EmojiSvg size={22} strokeWidth={"0.6"} />
            </div>
        </div>
    )
}

export default EmojiPicker;