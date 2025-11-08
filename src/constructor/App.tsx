import {Provider, rootStore} from "@/constructor/models/Root.ts";

function App() {

    return (
        <Provider value={rootStore}>
           App
        </Provider>
    )
}

export default App;