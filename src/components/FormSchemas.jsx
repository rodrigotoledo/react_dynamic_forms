import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

const FormSchemas = () => {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      form_schema_attributes: [{ label: "", field_name: "", field_type: "", field_definitions: "", values: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "form_schema_attributes"
  });

  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    setFormData(data); // Save form data to state
    console.log(data); // Output the data as JSON
  };

  const renderField = (field) => {
    switch (field.field_type) {
      case "text":
      case "email":
      case "file":
      case "date":
      case "time":
        return (
          <div className="mb-4">
            <label className="font-medium">{field.label}</label>
            <input
              type={field.field_type}
              className="w-full border rounded px-2 py-1 mt-1"
              placeholder={field.label}
            />
          </div>
        );
      case "datetime":
        return (
          <div className="mb-4">
            <label className="font-medium">{field.label}</label>
            <input
              type="datetime-local"
              className="w-full border rounded px-2 py-1 mt-1"
              placeholder={field.label}
            />
          </div>
        );
      case "textarea":
        return (
          <div className="mb-4">
            <label className="font-medium">{field.label}</label>
            <textarea
              className="w-full border rounded px-2 py-1 mt-1"
              placeholder={field.label}
            />
          </div>
        );
      case "select":
        return (
          <div className="mb-4">
            <label className="font-medium">{field.label}</label>
            <select className="w-full border rounded px-2 py-1 mt-1">
              {field.values.split(",").map((value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-xl font-bold mb-4">Form Schema</div>
        <div className="flex flex-col">
          <input
            {...register("name", { required: "Name of FormSchema is required" })}
            className={`w-full border rounded px-2 py-1 ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Form Name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        {fields.map((item, index) => (
          <div key={item.id} className="border p-4 rounded-md space-y-2">
            <div className="flex space-x-2">
              <div className="flex flex-col text-nowrap">
                <input
                  {...register(`form_schema_attributes.${index}.label`, {
                    required: "Label is required",
                  })}
                  className={`w-full border rounded px-2 py-1 h-10 ${
                  errors.form_schema_attributes?.[index]?.label
                    ? "border-red-500"
                    : ""
                  }`}
                placeholder="Label"
                />
                {errors.form_schema_attributes?.[index]?.label && (
                  <span className="text-red-500 text-sm">
                    {errors.form_schema_attributes[index].label.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-nowrap">
                <input
                  {...register(`form_schema_attributes.${index}.field_name`, {
                    required: "Attribute Name is required",
                  })}
                  className={`w-full border rounded px-2 py-1 h-10 ${
                  errors.form_schema_attributes?.[index]?.field_name
                    ? "border-red-500"
                    : ""
                  }`}
                  placeholder="Attribute name"
                />
                {errors.form_schema_attributes?.[index]?.field_name && (
                  <span className="text-red-500 text-sm">
                    {errors.form_schema_attributes[index].field_name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-nowrap w-[12rem]">
                <select
                  {...register(`form_schema_attributes.${index}.field_type`, {
                    required: "Attribute Name is required",
                  })}
                  className={`w-full border rounded px-2 py-1 h-10 ${
                  errors.form_schema_attributes?.[index]?.field_type
                    ? "border-red-500"
                    : ""
                  }`}
                >
                  <option value="">Select Field Type</option>
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="text_area">Text Area</option>
                  <option value="select">Select</option>
                  <option value="file">Upload</option>
                  <option value="date">Date</option>
                  <option value="datetime">Date Time</option>
                  <option value="time">Time</option>
                </select>
                {errors.form_schema_attributes?.[index]?.field_type && (
                  <span className="text-red-500 text-sm">
                    {errors.form_schema_attributes[index].field_type.message}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-white h-10 bg-red-400 p-2 rounded-md"
              >
                Remove
              </button>
            </div>
            <input
              {...register(`form_schema_attributes.${index}.field_definitions`)}
              className="w-full border rounded px-2 py-1"
              placeholder="...min:200,max:300"
            />

            {watch(`form_schema_attributes.${index}.field_type`) === "select" && (
              <input
                {...register(`form_schema_attributes.${index}.values`)}
                className="w-full border rounded px-2 py-1"
                placeholder="Values (comma separated)"
              />
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ label: "", field_type: "", field_name: "", field_definitions: "", values: "" })
          }
          className="w-full bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Add Field
        </button>

        <button
          type="submit"
          className="w-full bg-green-500 text-white rounded-md px-4 py-2"
        >
          Save
        </button>
      </form>

      {/* Render Form Preview based on JSON */}
      {formData && (
        <div className="mt-8 p-4 border rounded-md">
          <div className="text-2xl font-bold">Form Preview</div>
          <hr className="my-2" />
          <div className="text-lg font-bold mb-4">{formData.name}</div>
          <div className="flex flex-col space-y-4">
            {formData.form_schema_attributes.map((field, index) => (
              <div key={index}>{renderField(field)}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSchemas;
