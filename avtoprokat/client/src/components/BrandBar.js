import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div className="d-flex" style={{ flexWrap: "wrap", gap: "20px" }}>
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer", backgroundColor: "#f1f1f1" }}
          key={brand.id}
          className="p-3"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? "danger" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
