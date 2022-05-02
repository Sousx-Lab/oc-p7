import { useEffect, useState } from "react";
import { EmojiSvg } from "../IconsSvg";
import { EmojiButton } from '@joeattardi/emoji-button';

const EmojiPicker = ({ insertInto, TriggerElem}) => {

    const [picker, setPicker] = useState('');
    const [trigger, setTrigger] = useState('');


    const handleTogglePicker = () => {
        picker.togglePicker(trigger);
    }

    const InsertEmoji = (emoji) => {
        const target = document.querySelector(`[data-context=${insertInto}]`);
        const [start, end] = [target.selectionStart, target.selectionEnd];
        target.setRangeText(emoji, start, end, 'end');
        const event = new Event('change', { bubbles: true });
        target.dispatchEvent(event);
    };

    useEffect(() => {
        if (false === picker instanceof EmojiButton) {
            setPicker(new EmojiButton({ 
                position: 'bottom-start', 
                emojiSize: "22px", 
                zIndex: "2000", 
                recentsCount: "10",
                autoHide: false,
            }));
            setTrigger(document.querySelector(`[data-trigger=${TriggerElem}]`));
        }
        if (picker instanceof EmojiButton) {
            picker.on('emoji', ({ emoji }) => {
                InsertEmoji(emoji);
            })
        }
    }, [picker, insertInto, TriggerElem]);
    return (
        <div className="d-flex icon-info" role="button" onClick={handleTogglePicker} tabIndex="0" data-trigger={TriggerElem}>
            <div className="rounded-circle icon-info--bg p-2 text-center" title="Emoji">
                <EmojiSvg size={26} strokeWidth={"1.5"} stroke={"#74bae9"} />
            </div>
        </div>
    )
}

export default EmojiPicker;