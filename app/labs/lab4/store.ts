import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./redux/hello/helloReducer";
import counterReducer from "./redux/counterRedux/counterReducer";
import addReducer     from "./redux/addRedux/addReducer";
import todosReducer from "./redux/todos/todosReducer";

const store = configureStore({
  reducer: { helloReducer,
             counterReducer,
             addReducer,
             todosReducer,
   },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;