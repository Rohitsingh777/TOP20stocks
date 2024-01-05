import WebSocketComponent from "./card"

const  Maindiv = (props) => {
    return(
        <div style={{display: "flex" ,flexWrap: "wrap", justifyContent: "space-between" ,gap:'5vh' ,paddingTop:'20px',background:'ffd890',paddingLeft:'5px'}}>
          {(() => {
        const components = [];
        for (let i = 0; i < props.value ; i++) {
          components.push(<WebSocketComponent key={i} />);
        }
        return components;
      })()}
        </div>
    )
}

export default Maindiv ;