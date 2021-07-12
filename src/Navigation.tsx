import React from 'react';

export const Navigation = () : JSX.Element => {
    const [show, handleShow] = React.useState<boolean>(false);
    const list : string[] = ['Home', 'TV Shows', 'Movies', 'Latest', 'My List']

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                handleShow(true)
            } 
            else handleShow(false)
        });
        return () => {
            window.removeEventListener('scroll', () => {})
        }
    }, [])

    return (
        <nav data-test="component-navigation" className={`${show ? 'bg-black' : null} flex fixed top-0 h-16 w-full z-10 navTransition`}>
            <div className='p-4' >
                <img src='./image/icon.png' width='100px' />
            </div>
            <div className='mx-4 mt-6 text-white flex' >
                {list.map((item: string, idx: number) => <div key={idx} className='text-xs mr-4'>{item}</div>)}
            </div>
        </nav>
    )
}