import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {
  const { car: carStore } = useContext(Context);
  return (
    <div className="d-flex" style={{ flexWrap: "wrap", gap: "20px" }}>
      {carStore.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer", backgroundColor: "#f1f1f1" }}
          key={brand.id}
          className="p-3"
          onClick={() => {
            if (
              carStore.selectedBrand &&
              carStore.selectedBrand.id === brand.id
            ) {
              carStore.setSelectedBrand(null);
              return;
            }
            carStore.setSelectedBrand(brand);
          }}
          border={brand.id === carStore.selectedBrand?.id ? "danger" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
