import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDog } from "../../redux/actions";
import TemperamentSelect from "./../Temperament/Temperaments";
import styles from "./Form.module.css";

const initialFormValues = {
  image: "",
  name: "",
  minheight: "",
  maxheight: "",
  minweight: "",
  maxweight: "",
  minlifespan: "",
  maxlifespan: "",
  temperaments: [],
};
const initialErrorsValues = {
  image: "",
  name: "",
  minheight: "",
  maxheight: "",
  minweight: "",
  maxweight: "",
  minlifespan: "",
  maxlifespan: "",
  temperaments: [],
};

const FormPage = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [rawFormValues, setRawFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrorsValues);

  const validate = (rawFormValues) => {
    const tempErrors = {};
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(rawFormValues.image)) {
      tempErrors.image = "this must be an URL";
    }

    if (!/^[a-zA-Z\s]*$/.test(rawFormValues.name)) {
      tempErrors.name = "there is an error at name";
    }
    if (rawFormValues.minheight < 1 || rawFormValues.minheight > 200) {
      tempErrors.minheight =
        "Min height can't be lower than 1 or higher than 200 inches";
    }
    if (rawFormValues.minweight < 1 || rawFormValues.minweight > 200) {
      tempErrors.minweight =
        "Min weight can't be lower than 1 or higher than 200 pounds";
    }
    if (rawFormValues.lifespan < 0 || rawFormValues.lifespan > 30) {
      tempErrors.lifespan =
        "Life span cant be lower than 0 or higher than 30 years";
    }

    if (rawFormValues.minheight > rawFormValues.maxheight) {
      tempErrors.minheight = "Min height can't be higher than max height";
      tempErrors.maxheight = "Max height can't be lower than min height";
    }

    if (rawFormValues.minweight > rawFormValues.maxweight) {
      tempErrors.minweight = "Min weight can't be higher than max weight";
      tempErrors.maxweight = "Max weight can't be lower than min weight";
    }

    if (rawFormValues.minlifespan > rawFormValues.maxlifespan) {
      tempErrors.minlifespan = "Min lifespan can't be higher than max lifespan";
      tempErrors.maxlifespan = "Max lifespan can't be lower than min lifespan";
    }

    setErrors(tempErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    validate({
      ...rawFormValues,
      [name]: value,
    });

    setRawFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setFormValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [name]: value,
      };

      if (["minheight", "maxheight"].includes(name)) {
        updatedValues.height = `${updatedValues.minheight} - ${updatedValues.maxheight}`;
      }
      if (["minweight", "maxweight"].includes(name)) {
        updatedValues.weight = `${updatedValues.minweight} - ${updatedValues.maxweight}`;
      }
      if (["minlifespan", "maxlifespan"].includes(name)) {
        updatedValues.lifespan = `${updatedValues.minlifespan} - ${updatedValues.maxlifespan}`;
      }

      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formValues.image ||
      !formValues.name ||
      !formValues.height ||
      !formValues.weight ||
      !formValues.lifespan ||
      errors.name ||
      errors.minheight ||
      errors.maxheight ||
      errors.minweight ||
      errors.maxweight ||
      errors.minlifespan ||
      errors.maxlifespan
    ) {
      alert("Missing or wrong information");
    } else {
      dispatch(createDog(formValues));
      setRawFormValues(initialFormValues);
      setErrors(initialErrorsValues);
      alert("New dog has been created");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles["form-container"]}>
        <h2>Create new dog</h2>

        <div className={styles["form-input"]}>
          <label>Image: </label>
          <input
            type="text"
            name="image"
            value={rawFormValues.image}
            onChange={handleInputChange}
            required
          />
          {errors.image && <span>{errors.image}</span>}
        </div>

        <div className={styles["form-input"]}>
          <label>Name: </label>
          <input
            placeholder="name your dog"
            type="text"
            name="name"
            value={rawFormValues.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className={styles["form-input"]}>
          <label>Height (inches): </label>
          <input
            placeholder="min"
            type="number"
            name="minheight"
            value={rawFormValues.minheight}
            onChange={handleInputChange}
          />
          {errors.minheight && <span>{errors.minheight}</span>}
          <input
            placeholder="max"
            type="number"
            name="maxheight"
            value={rawFormValues.maxheight}
            onChange={handleInputChange}
          />
          {errors.maxheight && <span>{errors.maxheight}</span>}
        </div>

        <div className={styles["form-input"]}>
          <label>Weight (Pounds): </label>
          <input
            placeholder="min"
            type="number"
            name="minweight"
            value={rawFormValues.minweight}
            onChange={handleInputChange}
          />
          {errors.minweight && <span>{errors.minweight}</span>}
          <input
            placeholder="max"
            type="number"
            name="maxweight"
            value={rawFormValues.maxweight}
            onChange={handleInputChange}
          />
          {errors.maxweight && <span>{errors.maxweight}</span>}
        </div>

        <div className={styles["form-input"]}>
          <label>Lifespan (years): </label>
          <input
            placeholder="min"
            type="number"
            name="minlifespan"
            value={rawFormValues.minlifespan}
            onChange={handleInputChange}
          />
          {errors.minlifespan && <span>{errors.minlifespan}</span>}
          <input
            placeholder="max"
            type="number"
            name="maxlifespan"
            value={rawFormValues.maxlifespan}
            onChange={handleInputChange}
          />
          {errors.maxlifespan && <span>{errors.maxlifespan}</span>}
        </div>

        <div className={styles["form-select"]}>
          <label>Temperaments: </label>
          <TemperamentSelect
            setFormValues={setFormValues}
            formValues={formValues}
          />
        </div>

        <button type="submit" className={styles["form-button"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
