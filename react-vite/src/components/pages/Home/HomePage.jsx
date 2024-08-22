import { useDispatch } from 'react-redux'
import './HomePage.css'
import { useSelector } from 'react-redux'

function Home() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    return (
        <main id='landing-page'>
            {user? (
                <div>

                </div>
            ) : (
                <div>
                    <h1 className="title-font">Welcome to Luna</h1>
                    <p>Here to help you be mindful of your life.</p>
                    <p>Chart how you feel. Track what you do.</p>
                    <h2 className="title-font">No matter what phase I am in, I always remain whole</h2>
                </div>
            )}
        </main>
    )
}

export default Home
