import React, { useState, useEffect, useRef } from 'react'
import DOTS from 'vanta/dist/vanta.dots.min'
import * as THREE from 'three'
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

const Vanta = (props) => {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(DOTS({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return <div ref={myRef} className="vanta">
        Foreground content goes here
    </div>
}
export default Vanta    