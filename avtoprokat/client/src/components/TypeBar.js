import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
  const { car: carStore } = useContext(Context);
  return (
    <ListGroup>
      {carStore.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === carStore.selectedType.id}
          onClick={() => carStore.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
