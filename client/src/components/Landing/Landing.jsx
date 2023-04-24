import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

// const WelcomePage = () => {
//   return (
//     <div className={style.container}>
//       <div className={style.background}></div>
//       <div className={style.content}>
//         <h1>Welcome to Dog SPA</h1>

//         <Link to="/home">
//           <button className={style.button}>Woof!</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

class WelcomePage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className={style.container}>
        <div className={style.background}></div>
        <div className={style.content}>
          <h1>Welcome to Dog SPA</h1>

          <Link to="/home">
            <button className={style.button}>Woof!</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
