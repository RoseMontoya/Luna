import { GiPolarStar } from "react-icons/gi";
import { GiDiamonds } from "react-icons/gi";
import { BsDot } from "react-icons/bs";
import './FrontPageAnimation.css'

function FrontPageAnimation() {

    return (
        <div id='moon-cycle'>
            <img src="../../public/images/moon/full-moon.png" id="full" />
            <img src="../../public/images/moon/waning-sliver.png" id='waning-sliver'/>
            <img src="../../public/images/moon/waning-gibbous.png" id='waning-gibbous'/>
            <img src="../../public/images/moon/waning-half.png" id='waning-half'/>
            <img src="../../public/images/moon/waning-cres.png" id="waning-cres"/>
            <img src="../../public/images/moon/new-moon.png" id="new"/>
            <img src="../../public/images/moon/waxing-sliver.png" id="waxing-sliver" />
            <img src="../../public/images/moon/waxing-cres.png" id="waxing-cres" />
            <img src="../../public/images/moon/waxing-half.png" id="waxing-half"/>
            <img src="../../public/images/moon/waxing-gibbous.png" id="waxing-gibbous"/>
            <div id="polar-star">
                <GiPolarStar />
            </div>
            <div id='diamonds'>
                <GiDiamonds id="d-1"/><GiDiamonds id="d-2"/><GiDiamonds id="d-3" /><GiDiamonds id="d-4"/><GiDiamonds id="d-5"/><GiDiamonds id="d-6"/><GiDiamonds id="d-7"/><GiDiamonds id="d-8"/><GiDiamonds id="d-9"/><GiDiamonds id="d-10"/>
            </div>
            <div id="inner-circle">
                <div id="stars">
                    <GiDiamonds id="s-1"/>
                    <GiDiamonds id='s-2'/>
                    <GiDiamonds id='s-3'/>
                    <GiDiamonds id='s-4'/>
                    <GiDiamonds id='s-5'/>
                    <GiDiamonds id='s-6'/>
                    <GiDiamonds id='s-7'/>
                    <GiDiamonds id='s-8'/>
                    <GiDiamonds id='s-9'/>
                    <GiDiamonds id='s-10'/>
                </div>

                <div id="dots">
                    <BsDot id="dot-1"/>
                    <BsDot id="dot-2"/>
                    <BsDot id="dot-3"/>
                    <BsDot id="dot-4"/>
                    <BsDot id="dot-5"/>
                    <BsDot id="dot-6"/>
                    <BsDot id="dot-7"/>
                    <BsDot id="dot-8"/>
                    <BsDot id="dot-9"/>
                    <BsDot id="dot-10"/>
                </div>
            </div>
        </div>
    )

}

export default FrontPageAnimation
