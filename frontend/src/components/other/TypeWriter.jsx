import React, { useEffect, useState } from 'react'

const TypeWriter = ({
    text="Writely.",
    typingSpeed=150
}) => {

    const [displayText, setDisplayText] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    useEffect(() => {
        if (!text) return; // Guard against undefined text

        let timer;

        if (charIndex < text.length) {
            timer = setTimeout(() => {
                setDisplayText(prevText => prevText + text.charAt(charIndex));
                setCharIndex(prevIndex => prevIndex + 1);
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [charIndex, displayText, text]);
    
    return (
        <div className="flex justify-center items-center h-screen dark:bg-[#0a0b10]">
            <span className='text-3xl font-semibold dark:text-white'>{displayText}</span>
            <span className="text-3xl font-semibold dark:text-white">|</span>
        </div>
    )
}

export default TypeWriter