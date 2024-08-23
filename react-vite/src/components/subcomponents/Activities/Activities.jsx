import { Icon } from '../'
import { BsDot } from "react-icons/bs";


function Activities({activities, icons}) {
    return (
        <>
            {activities.map((activity, idx) => (
                <div key={activity.id}>
                    <div className={`${idx === 0 ? 'hidden': ""}`}>
                        <BsDot />
                    </div>
                    <div>
                        <Icon icons={icons} id={activity.iconId} />
                    </div>
                    <p>{activity.name}</p>
                </div>
            ))}
        </>
    )
}

export default Activities
