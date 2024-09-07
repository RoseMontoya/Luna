import { useNav } from "../../../context/navContext";

function Loading() {
    const { navOpen } = useNav();

    return (
        <main className={`${navOpen ? "nav-open" : ""} side-nav`}>
            <h1>Loading</h1>
        </main>
    )
}

export default Loading
