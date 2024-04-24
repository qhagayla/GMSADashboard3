// store.js
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import videoReducer from "../features/videos/videoSlice"
import remarkReducer from "../features/remarks/remarkSlice"
import clientReducer from "../features/client/clientSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        video: videoReducer,
        remark: remarkReducer,  // Add remark reducer
        client: clientReducer,
    },
})
