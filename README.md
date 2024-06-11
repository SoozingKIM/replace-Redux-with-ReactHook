# replace-Redux-with-ReactHook

지금도 정상적인 코드이지만, 번들 크기 줄이기 / 추가 라이브러리 사용 안 하기 / 리액트만으로 해결해보기 등의 이유로 리덕스 사용을 배제하고 싶을 때를 가정해 리액트 훅으로 바꿔보는 공부이다.

## context API 이용

### createContext

`createContext`로 context 만들고, `Provider` 를 return 하면

```js
// main.jsx
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import productReducer from "./store/reducers/products";
```

얘네는 필요 없게 된다.

### useContext

`useContext`로`context`를 불러오면, `useSelector`은 필요 없게 된다.

### context의 안 좋은 점

성능 측면에 최적화가 되어있지 않다.  
context 안의 내용 하나라도 변경이 되면, 이걸 쓰는 모든 컴포넌트가 다시 빌드되고 렌더링된다.  
이래서 애초에 목적이 전역적인 state 관리로 나온게 아니라, 일부 state를 위해 나온 것이다.  
지금처럼 자주 내용이 변경되는 경우에는 context가 적절하지 않다.

## 커스텀 훅 이용

커스텀 훅에서 변수를 전역에 선언하면, 그 커스텀 훅을 이용하는 모든 곳에서 접근이 가능하다.
