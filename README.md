# replace-Redux-with-ReactHook

지금도 정상적인 코드이지만, 번들 크기 줄이기 / 추가 라이브러리 사용 안 하기 / 리액트만으로 해결해보기 등의 이유로 리덕스 사용을 배제하고 싶을 때를 가정해 리액트 훅으로 바꿔보는 공부이다.

## createContext

`createContext`로 context 만들고, `Provider` 를 return 하면

```js
// main.jsx
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import productReducer from "./store/reducers/products";
```

얘네는 필요 없게 된다.

## useContext

`useContext`로`context`를 불러오면, `useSelector`은 필요 없게 된다.
