// import chai from "chai";
// import chaiEnzyme from "chai-enzyme";
// import React from 'react'
// import {mount, render, shallow} from 'enzyme'
// chai.use(chaiEnzyme());

// import App from '../src/components/app/App'

// describe("▒▒▒ Frontend tests ▒▒▒", function () {
//   describe("Landing", () => {
//     describe("Contenido Visual", () => {
//         let  appWrapper;
//         beforeEach('Crea un wrapper para <Message /> ', () => {

//             // crea el wrapper testeable del componente
//             appWrapper = shallow(<App />);
//         });

//     });

//   });
// });

//https://testing-library.com/docs/example-react-router

import React from "react";
import { render, screen } from "@testing-library/react";
import Details from "./Details";

describe("Details", () => {
  it("renders title Pokemon Details", () => {
    render(<Details />);
    expect(screen.getByText("Pokemon Details")).toBeInTheDocument();
  });

  it("button must have test 'Return'", () => {
    render(<Details />);   
    expect(screen.getByText("Return")).toBeInTheDocument();
  });

  
});
