import * as React from 'react';
import { Link} from 'react-router-dom';
import navbar from './navbar';
export default function Ala():JSX.Element {
  return (
      
      <div>
          <h1>Bookkeeper</h1>
          <nav
              style={{
                  borderBottom: "solid 1px",
                  paddingBottom: "1rem",
              }}
          >
              <Link to="/">Strona g</Link> |{" "}
              <Link to="/ala">ala</Link>
          </nav>
      </div>
  )
}