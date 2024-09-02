import './FrontPageAnimation.css'

function FrontPageAnimation() {

    return (
        <div id='moon-cycle'>
            <img src="../../public/images/moon/full.png" id="full" />
            <img src="../../public/images/moon/waning-half.png" id='waning-half'/>
            <img src="../../public/images/moon/waning-cres.png" id="waning-cres"/>
            <img src="../../public/images/moon/waning-sliver.png" id='waning-sliver'/>
            {/* <img src="../../public/images/moon/full.png" id="new"/> */}
            <div id='new'></div>
            <img src="../../public/images/moon/waxing-sliver.png" id="waxing-sliver" />
            <img src="../../public/images/moon/waxing-cres.png" id="waxing-cres" />
            <img src="../../public/images/moon/waxing-half.png" id="waxing-half"/>
        </div>
    )

}

export default FrontPageAnimation
