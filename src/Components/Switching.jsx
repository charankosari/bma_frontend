import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div id="services" className="w-full relative bg-white">
      <style>
        {`
          .main-buttons {
            display: flex;
            width: 380px;
            gap: 10px;
            --b: 5px; /* the border thickness */
            --h: 1.8em; /* the height */
          }

          .main-buttons button {
            --_c: #88c100;
            flex: calc(1.25 + var(--_s, 0));
            min-width: 0;
            font-size: 40px;
            font-weight: bold;
            height: var(--h);
            cursor: pointer;
            color: var(--_c);
            border: var(--b) solid var(--_c);
            background: conic-gradient(
                at calc(100% - 1.3 * var(--b)) 0,
                var(--_c) 209deg,
                #0000 211deg
              )
              border-box;
            clip-path: polygon(0 0, 100% 0, calc(100% - 0.577 * var(--h)) 100%, 0 100%);
            padding: 0 calc(0.288 * var(--h)) 0 0;
            margin: 0 calc(-0.288 * var(--h)) 0 0;
            box-sizing: border-box;
            transition: flex 0.4s;
          }

          .main-buttons button + button {
            --_c: #ff003c;
            flex: calc(0.75 + var(--_s, 0));
            background: conic-gradient(
                from -90deg at calc(1.3 * var(--b)) 100%,
                var(--_c) 119deg,
                #0000 121deg
              )
              border-box;
            clip-path: polygon(calc(0.577 * var(--h)) 0, 100% 0, 100% 100%, 0 100%);
            margin: 0 0 0 calc(-0.288 * var(--h));
            padding: 0 0 0 calc(0.288 * var(--h));
          }

          .main-buttons button:focus-visible {
            outline-offset: calc(-2 * var(--b));
            outline: calc(var(--b) / 2) solid #000;
            background: none;
            clip-path: none;
            margin: 0;
            padding: 0;
          }

          .main-buttons button:focus-visible + button {
            background: none;
            clip-path: none;
            margin: 0;
            padding: 0;
          }

          .main-buttons button:has(+ button:focus-visible) {
            background: none;
            clip-path: none;
            margin: 0;
            padding: 0;
          }

          .main-buttons button:hover,
          .main-buttons button:active:not(:focus-visible) {
            --_s: 0.75;
          }

          .main-buttons button:active {
            box-shadow: inset 0 0 0 100vmax var(--_c);
            color: #fff;
          }

          body {
            display: grid;
            place-content: center;
            margin: 0;
            height: 100vh;
            font-family: system-ui, sans-serif;
          }
        `}
      </style>
      <div className="main-buttons">
        <ul>
          <li>
            <Link to="/hospital">Hospitals</Link>
          </li>
          <li>
            <Link to="/lab">Labs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
