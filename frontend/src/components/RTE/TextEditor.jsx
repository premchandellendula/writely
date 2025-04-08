import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TextEditor = ({content, setContent}) => {
    const editorRef = useRef(null);
    const [editorKey, setEditorKey] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark") // Check initial theme
    );

    useEffect(() => {
        setEditorKey(prevKey => prevKey + 1);
    }, [isDarkMode])

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);
    return (
        <div>
            <Editor
                key={editorKey}
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={content}
                onEditorChange={(content) => setContent(content)}
                init={{
                    height:500,
                    width: '100%',
                    menubar: true,
                    skin: isDarkMode ? 'oxide-dark' : 'oxide',
                    content_css: isDarkMode ? 'dark' : 'default',
                    content_style: isDarkMode 
                    ? "body { background-color: #111827; color: #ffffff; }"
                    : "body { background-color: #ffffff; color: #000000; }",
                    plugins:[
                    'a11ychecker',
                        'advlist',
                        'advcode',
                        'advtable',
                        'autolink',
                        'checklist',
                        'export',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'powerpaste',
                        'fullscreen',
                        'formatpainter',
                        'insertdatetime',
                        'media',
                        'table',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | image | preview | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    placeholder: "Start typing here...",
                }}
            />
        </div>
    )
}

export default TextEditor