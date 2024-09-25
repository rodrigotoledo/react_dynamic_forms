import React from "react";

const RenderField = ({ type, label, attribute_name, children }) => {
  const renderField = () => {
    switch (type) {
      case "text":
      case "text_area":
      case "upload":
      case "datetime":
      case "time":
        return (
          <div className="mb-4">
            <label className="font-medium">{label}</label>
            {children}
          </div>
        );
      case "select":
        return (
          <div className="mb-4">
            <label className="font-medium">{label}</label>
            {children}
          </div>
        );
      default:
        return null;
    }
  };

  return renderField();
};

export default RenderField;