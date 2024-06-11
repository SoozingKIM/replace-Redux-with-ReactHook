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

리덕스 작동하는 방식을 커스텀 훅으로 만든 것이다.

커스텀 훅에서 변수를 전역에 선언하면, 그 커스텀 훅을 이용하는 모든 곳에서 접근이 가능하다.  
따라서 전역에 state, actions, listener을 선언해서 모든 컴포넌트가 같은 정보를 공유할 수 있게 하는 것이다.

dispatch를 호출하면 globalState가 업데이트되고 listeners를 호출한다.
listeners는 setState를 호출하며 state의 변경 사항에 관심이 있고, state의 변화는 actions에 의해 일어난다.  
useEffect를 이용해 한 컴포넌트 당 하나의 listeners를 등록했다. 그리고 클린업 함수를 이용해 컴포넌트가 없어지면 등록도 삭제 시킨다.

initStore은 store를 초기화하는 작업을 해주었다.

여러번 호출 할 수 있도록 했고,

globalState를 대체하고 actions를 대체하는 것이 아니라 항상 현재의 globalState와 현재의 actions에 새 데이터를 합쳐준다.  
이렇게 해주는 것은 리덕스에서 여러개의 Reducers로 하는 것과 동일하게 store의 슬라이스를 생성할 수 있도록 하기 위해서이다.  
이렇게 하면 이 프로젝트의 아무 곳에서나 이 store를 사용할 수 있습니다

여기까지가 리덕스 작동하는 방식을 완전 리덕스 없이 만든 것이다.  
추가적인 의존성은 피하면서 리액트와 훅만을 사용해서!
