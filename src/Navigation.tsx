import React from 'react';

export const Navigation = () => {
    const [show, handleShow] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                handleShow(true)
            } else handleShow(false)
        });
        return () => {
            window.removeEventListener('scroll', () => {})
        }
    }, [])

    return (
            <nav data-test="component-navigation" className={`${show ? 'bg-black' : null} fixed top-0 h-16 w-full z-10 navTransition`}>
                <div className='p-4' >
                    <img src='./image/icon.png' width='100px' />
                </div>
            </nav>

    )
}