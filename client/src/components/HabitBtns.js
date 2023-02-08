import { useState } from "react";
import { Container, Button } from 'semantic-ui-react'

function HabitButtons() {
  const [buttonTitle1, setButtonTitle1] = useState("Walk");
  const [buttonTitle2, setButtonTitle2] = useState("Food");
  const [buttonTitle3, setButtonTitle3] = useState("Water");
  const [buttonTitle4, setButtonTitle4] = useState("Meds");

  const [isDisabled, setIsDisabled] = useState(false);

  function buttonOnClick1() {
    setButtonTitle1("💙");
    setIsDisabled(true);
    setTimeout(() => {
      setButtonTitle1('Walk');
    }, 1000000);
  };
   
  function buttonOnClick2() {
    setButtonTitle2("💙");
    setTimeout(() => {
      setButtonTitle2('Food');
    }, 1000000);

  };

  function buttonOnClick3() {
    setButtonTitle3("💙");
    setTimeout(() => {
      setButtonTitle3("Water");
    }, 1000000);
  };

  function buttonOnClick4() {
    setButtonTitle4("💙");
     setTimeout(() => {
      setButtonTitle4("Meds");
    }, 1000000);
  
  };

     return (
      <Container className="single-btn-group">
      <div className="buttons">
        <Button compact className="" onClick={buttonOnClick1}>{buttonTitle1}</Button>
      </div>

       <div className="buttons">
       <Button compact  onClick={buttonOnClick2}>{buttonTitle2}</Button>
     </div>

      <div className="buttons">
      <Button compact onClick={buttonOnClick3}>{buttonTitle3}</Button>
    </div>

     <div className="buttons">
     <Button compact onClick={buttonOnClick4}>{buttonTitle4}</Button>
   </div>
   </Container>
    
  )
}

export default HabitButtons;