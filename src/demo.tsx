import { useState } from "react";

export function CheckAsync(){
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setTimeout(() => {
      setVisible(true);
    }, 200);
  }

  return <div>
    <button onClick={onClick} data-testid="show-button">show</button>
    {visible && <div data-testid="content">content</div>}
  </div>
}
